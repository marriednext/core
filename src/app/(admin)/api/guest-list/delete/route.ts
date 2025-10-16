import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/database/drizzle";
import { guest, invitation } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const deleteInvitationSchema = z.object({
  entryId: z.string().uuid(),
});

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = deleteInvitationSchema.parse(body);

    const existingInvitation = await db.query.invitation.findFirst({
      where: eq(invitation.id, validatedData.entryId),
    });

    if (!existingInvitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

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
      await db.delete(guest).where(eq(guest.nameOnInvitation, guestNames[0]));

      for (let i = 1; i < guestNames.length; i++) {
        await db.delete(guest).where(eq(guest.nameOnInvitation, guestNames[i]));
      }
    }

    await db.delete(invitation).where(eq(invitation.id, validatedData.entryId));

    revalidatePath("/guest-list");

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
