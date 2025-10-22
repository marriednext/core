import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/database/drizzle";
import { guest, invitation } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getWeddingFromRequest } from "@/lib/tenant/getWeddingFromRequest";
import * as Sentry from "@sentry/nextjs";

const guestSelectionSchema = z.object({
  name: z.string(),
  isAttending: z.boolean(),
});

const schema = z.object({
  invitationId: z.string().uuid(),
  email: z.string().email("Valid email is required"),
  guests: z
    .array(guestSelectionSchema)
    .min(1, "At least one guest is required"),
});

export async function POST(request: Request) {
  try {
    const wedding = await getWeddingFromRequest(request);

    if (!wedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const body = await request.json();
    const parse = schema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parse.error.issues },
        { status: 400 }
      );
    }

    const { invitationId, email, guests: guestSelections } = parse.data;

    const invitationRecord = await db.query.invitation.findFirst({
      where: eq(invitation.id, invitationId),
      with: {
        guest_guestA: true,
        guest_guestB: true,
        guest_guestC: true,
        guest_guestD: true,
        guest_guestE: true,
        guest_guestF: true,
        guest_guestG: true,
        guest_guestH: true,
      },
    });

    if (!invitationRecord) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

    if (invitationRecord.weddingId !== wedding.id) {
      return NextResponse.json(
        { error: "Invitation does not belong to this wedding" },
        { status: 403 }
      );
    }

    await db.transaction(async (tx) => {
      await tx
        .update(invitation)
        .set({
          email,
          lastUpdatedAt: new Date().toISOString(),
        })
        .where(eq(invitation.id, invitationId));

      for (const guestSelection of guestSelections) {
        await tx
          .update(guest)
          .set({
            isAttending: guestSelection.isAttending,
            dateEntrySubmitted: new Date().toISOString(),
          })
          .where(eq(guest.nameOnInvitation, guestSelection.name));
      }
    });

    Sentry.captureMessage("RSVP submitted (v3)", {
      extra: {
        invitationId,
        email,
        guestCount: guestSelections.length,
        attendingCount: guestSelections.filter((g) => g.isAttending).length,
      },
    });

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    Sentry.captureException(error, {
      tags: { route: "rsvp-submit" },
    });
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
