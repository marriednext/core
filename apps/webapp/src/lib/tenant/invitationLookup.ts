import { db } from "@/database/drizzle";
import { invitation } from "orm-shelf/schema";
import type { DbInvitationWithGuests } from "orm-shelf/types";
import { eq } from "drizzle-orm";
import { matchGuestName } from "./nameMatching";
import { RsvpNameFormat } from "@/types/rsvp";

export async function findInvitationByGuestName(
  name: string,
  weddingId: string,
  nameFormat: RsvpNameFormat
): Promise<DbInvitationWithGuests | null> {
  const invitations = await db.query.invitation.findMany({
    where: eq(invitation.weddingId, weddingId),
    with: {
      guests: true,
    },
  });

  for (const inv of invitations) {
    for (const guest of inv.guests) {
      if (guest && matchGuestName(name, guest.nameOnInvitation, nameFormat)) {
        return inv;
      }
    }
  }

  return null;
}
