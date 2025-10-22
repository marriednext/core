import { db, DbInvitationWithGuests } from "@/database/drizzle";
import { invitation } from "@/drizzle/schema";
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

  for (const inv of invitations) {
    const guestSlots = [
      inv.guestA,
      inv.guestB,
      inv.guestC,
      inv.guestD,
      inv.guestE,
      inv.guestF,
      inv.guestG,
      inv.guestH,
    ];

    for (const guestName of guestSlots) {
      if (guestName && matchGuestName(name, guestName, nameFormat)) {
        return inv;
      }
    }
  }

  return null;
}
