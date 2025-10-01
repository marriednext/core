import { NextResponse } from "next/server";
import {
  getGuestList,
  getGuestListWithGroups,
  type DbInvitation,
} from "@/database/drizzle";

export async function GET(): Promise<
  NextResponse<{ guestList: DbInvitation[] }>
> {
  const guestList = await getGuestList();

  const guestListWithGroups = await getGuestListWithGroups();

  const displayGuestListWithGroups = guestListWithGroups.map((group) => ({
    guestA: group.guestA,
    guestB: group.guestB
      ? "& " + group.guestB
      : guestList.find((guest) => guest.nameOnInvitation === group.guestA)
          ?.hasPlusOne
      ? "+ One"
      : null,
  }));

  const plusOneCount = guestList.filter((guest) => guest.hasPlusOne).length;

  return NextResponse.json({
    guestListWithGroups,
    guestList,
    guestListCount: guestList.length + plusOneCount,
    guestListWithGroupsCount: guestListWithGroups.length,
    displayGuestListWithGroups,
    plusOneCount,
  });
}
