import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { guest, invitation } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

const deleteInvitationSchema = z.object({
  invitationId: z.string().uuid(),
});

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = deleteInvitationSchema.parse(body);

    const existingInvitation = await db.query.invitation.findFirst({
      where: eq(invitation.id, validatedData.invitationId),
    });

    if (!existingInvitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

    await db.transaction(async (tx) => {
      const guestNames: string[] = [
        existingInvitation.guestA,
        existingInvitation.guestB,
        existingInvitation.guestC,
        existingInvitation.guestD,
        existingInvitation.guestE,
        existingInvitation.guestF,
        existingInvitation.guestG,
        existingInvitation.guestH,
      ].filter((name): name is string => name !== null);

      if (guestNames.length > 0) {
        await tx
          .delete(guest)
          .where(inArray(guest.nameOnInvitation, guestNames));
      }

      await tx
        .delete(invitation)
        .where(eq(invitation.id, validatedData.invitationId));
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error deleting invitation:", error);
    return NextResponse.json(
      { error: "Failed to delete invitation" },
      { status: 500 }
    );
  }
}
