import {
  DbInvitationGroupWithGuests,
  DbInvitationGroup,
  DbGuest,
} from "@/database/drizzle";

export function extractGuestNames(
  entry: DbInvitationGroup | DbInvitationGroupWithGuests
): string[] {
  if ("guests" in entry && Array.isArray(entry.guests)) {
    return entry.guests.map((g: DbGuest) => g.nameOnInvitation).filter(Boolean);
  }
  return [];
}

export function getDefaultDisplayName(
  entry: DbInvitationGroup | DbInvitationGroupWithGuests
): string {
  const guestNames = extractGuestNames(entry);

  if (guestNames.length === 0) {
    return "";
  }

  if (guestNames.length === 1) {
    return guestNames[0];
  }

  if (guestNames.length === 2) {
    return `${guestNames[0]} & ${guestNames[1]}`;
  }

  return `${guestNames[0]} & ${guestNames.length - 1} others`;
}

export function getDisplayName(
  entry: DbInvitationGroup | DbInvitationGroupWithGuests
): string {
  if (entry.inviteGroupName) {
    return entry.inviteGroupName;
  }

  return getDefaultDisplayName(entry);
}
