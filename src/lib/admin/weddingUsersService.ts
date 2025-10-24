import { db } from "@/database/drizzle";
import { weddingUsers } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function addUserToWedding(weddingId: string, clerkUserId: string) {
  const [newWeddingUser] = await db
    .insert(weddingUsers)
    .values({
      weddingId,
      clerkUserId,
    })
    .returning();

  return newWeddingUser;
}

export async function removeUserFromWedding(
  weddingId: string,
  clerkUserId: string
) {
  await db
    .delete(weddingUsers)
    .where(
      and(
        eq(weddingUsers.weddingId, weddingId),
        eq(weddingUsers.clerkUserId, clerkUserId)
      )
    );
}

export async function getWeddingUsers(weddingId: string) {
  const users = await db
    .select()
    .from(weddingUsers)
    .where(eq(weddingUsers.weddingId, weddingId));

  return users;
}

export async function getUserWeddings(clerkUserId: string) {
  const weddings = await db
    .select()
    .from(weddingUsers)
    .where(eq(weddingUsers.clerkUserId, clerkUserId));

  return weddings;
}

export async function isUserAuthorizedForWedding(
  weddingId: string,
  clerkUserId: string
): Promise<boolean> {
  const [result] = await db
    .select()
    .from(weddingUsers)
    .where(
      and(
        eq(weddingUsers.weddingId, weddingId),
        eq(weddingUsers.clerkUserId, clerkUserId)
      )
    )
    .limit(1);

  return !!result;
}
