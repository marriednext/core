import { db } from "@/database/drizzle";
import { guest, invitation } from "@/database/schema";
import { eq, and, ilike, or } from "drizzle-orm";

type NameFormat = "FIRST_NAME_ONLY" | "FULL_NAME" | "EMAIL";

export async function findInvitationByGuestName(
  searchName: string,
  weddingId: string,
  nameFormat: NameFormat
) {
  if (nameFormat === "EMAIL") {
    const [result] = await db
      .select({
        id: invitation.id,
        inviteGroupName: invitation.inviteGroupName,
        email: invitation.email,
        weddingId: invitation.weddingId,
      })
      .from(invitation)
      .where(
        and(
          eq(invitation.weddingId, weddingId),
          ilike(invitation.email, searchName)
        )
      )
      .limit(1);

    if (!result) return null;

    const guests = await db
      .select()
      .from(guest)
      .where(eq(guest.invitationId, result.id));

    return { ...result, guests };
  }

  const searchPattern =
    nameFormat === "FIRST_NAME_ONLY" ? `${searchName}%` : searchName;

  const [matchingGuest] = await db
    .select()
    .from(guest)
    .where(
      and(
        eq(guest.weddingId, weddingId),
        nameFormat === "FIRST_NAME_ONLY"
          ? ilike(guest.nameOnInvitation, searchPattern)
          : ilike(guest.nameOnInvitation, searchName)
      )
    )
    .limit(1);

  if (!matchingGuest) return null;

  if (!matchingGuest.invitationId) {
    return null;
  }

  const [invitationResult] = await db
    .select({
      id: invitation.id,
      inviteGroupName: invitation.inviteGroupName,
      email: invitation.email,
      weddingId: invitation.weddingId,
    })
    .from(invitation)
    .where(eq(invitation.id, matchingGuest.invitationId))
    .limit(1);

  if (!invitationResult) return null;

  const guests = await db
    .select()
    .from(guest)
    .where(eq(guest.invitationId, invitationResult.id));

  return { ...invitationResult, guests };
}
