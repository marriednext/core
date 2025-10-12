import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/database/drizzle";
import { guest, invitation } from "@/drizzle/schema";
import { inArray } from "drizzle-orm";

const addGuestSchema = z.object({
  guests: z
    .array(z.string().min(1, "Guest name cannot be empty"))
    .min(1, "At least one guest is required")
    .max(8, "Maximum of 8 guests per invitation"),
  hasPlusOne: z.boolean().default(false),
  inviteGroupName: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = addGuestSchema.parse(body);

    const { guests, hasPlusOne, inviteGroupName } = validatedData;

    const existingGuests = await db
      .select()
      .from(guest)
      .where(inArray(guest.nameOnInvitation, guests));

    if (existingGuests.length > 0) {
      const duplicateNames = existingGuests
        .map((g) => g.nameOnInvitation)
        .join(", ");
      return NextResponse.json(
        {
          error: `Guest name(s) already exist: ${duplicateNames}`,
        },
        { status: 409 }
      );
    }

    const result = await db.transaction(async (tx) => {
      const createdGuests = [];
      for (const guestName of guests) {
        const [createdGuest] = await tx
          .insert(guest)
          .values({
            nameOnInvitation: guestName,
            hasPlusOne: guests.length === 1 ? hasPlusOne : false,
            isAttending: null,
          })
          .returning();
        createdGuests.push(createdGuest);
      }

      const guestFields: {
        guestA: string;
        guestB?: string;
        guestC?: string;
        guestD?: string;
        guestE?: string;
        guestF?: string;
        guestG?: string;
        guestH?: string;
      } = {
        guestA: guests[0],
      };

      const guestKeys: Array<
        | "guestB"
        | "guestC"
        | "guestD"
        | "guestE"
        | "guestF"
        | "guestG"
        | "guestH"
      > = [
        "guestB",
        "guestC",
        "guestD",
        "guestE",
        "guestF",
        "guestG",
        "guestH",
      ];

      guests.slice(1).forEach((guestName, index) => {
        if (index < guestKeys.length) {
          guestFields[guestKeys[index]] = guestName;
        }
      });

      const [createdInvitation] = await tx
        .insert(invitation)
        .values({
          ...guestFields,
          inviteGroupName: inviteGroupName || null,
        })
        .returning();

      return {
        invitation: createdInvitation,
        guests: createdGuests,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error processing add guest request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
