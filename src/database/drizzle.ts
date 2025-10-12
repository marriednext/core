import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import queryClient from "./neon";
import { invitation, guest } from "@/drizzle/schema";
import * as schema from "@/drizzle/schema";
import * as relations from "@/drizzle/relations";
import type { InferSelectModel } from "drizzle-orm";

export const db = drizzle(queryClient, { schema: { ...schema, ...relations } });

export type DbGuest = InferSelectModel<typeof guest>;
export type DbInvitation = InferSelectModel<typeof invitation>;

export type DbInvitationWithGuests = DbInvitation & {
  invitation_guestA: DbGuest | null;
  invitation_guestB: DbGuest | null;
  invitation_guestC: DbGuest | null;
  invitation_guestD: DbGuest | null;
  invitation_guestE: DbGuest | null;
  invitation_guestF: DbGuest | null;
  invitation_guestG: DbGuest | null;
  invitation_guestH: DbGuest | null;
  attending?: number;
  total?: number;
};

export const getGuestList = async (): Promise<DbGuest[]> => {
  const guestList = await db.select().from(guest);
  return guestList;
};

export const getInvitationsWithGuests = async (
  sortBy?: string,
  limit?: number,
  offset?: number
) => {
  try {
    const result = await db.query.invitation.findMany({
      with: {
        invitation_guestA: true,
        invitation_guestB: true,
        invitation_guestC: true,
        invitation_guestD: true,
        invitation_guestE: true,
        invitation_guestF: true,
        invitation_guestG: true,
        invitation_guestH: true,
      },
      orderBy: (invitation, { asc, desc, sql }) => {
        switch (sortBy) {
          case "alpha-desc":
            return [
              desc(
                sql`COALESCE(${invitation.inviteGroupName}, ${invitation.guestA})`
              ),
            ];
          case "date-newest":
            return [desc(invitation.createdAt)];
          case "date-oldest":
            return [asc(invitation.createdAt)];
          case "updated-newest":
            return [desc(invitation.lastUpdatedAt)];
          case "alpha-asc":
          default:
            return [
              asc(
                sql`COALESCE(${invitation.inviteGroupName}, ${invitation.guestA})`
              ),
            ];
        }
      },
      limit: limit,
      offset: offset,
    });
    return result;
  } catch (error) {
    console.error("Error getting invitations with guests", error);
    return [];
  }
};

export const getInvitationsCount = async () => {
  try {
    const result = await db.select().from(invitation);
    return result.length;
  } catch (error) {
    console.error("Error getting invitations count", error);
    return 0;
  }
};

export default db;

export const upsertGuest = async ({
  nameOnInvitation,
  isAttending,
  hasPlusOne,
}: {
  nameOnInvitation: string;
  isAttending: boolean;
  hasPlusOne: boolean | null | undefined;
}): Promise<void> => {
  const guestData = {
    nameOnInvitation,
    isAttending,
    hasPlusOne: hasPlusOne ?? null,
  };
  await db
    .update(guest)
    .set(guestData)
    .where(eq(guest.nameOnInvitation, nameOnInvitation));
};
