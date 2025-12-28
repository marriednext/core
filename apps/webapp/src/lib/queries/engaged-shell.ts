import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { wedding, weddingUsers } from "@/database/schema";

export type ShellQueryInput = {
  clerkUserId: string;
};

export type ShellWeddingData = {
  id: string;
  displayName: string;
  nameA: string;
  nameB: string;
  eventDate: string | null;
};

export type ShellUserData = {
  fullName: string;
  email: string;
  imageUrl: string | null;
  initials: string;
};

export type ShellApiResponse = {
  user: ShellUserData;
  wedding: ShellWeddingData;
  subscriptionPlan: string;
};

export async function getShellWeddingData(
  db: PostgresJsDatabase<Record<string, unknown>>,
  input: ShellQueryInput
): Promise<ShellWeddingData | null> {
  const [result] = await db
    .select({
      id: wedding.id,
      displayName: wedding.fieldDisplayName,
      nameA: wedding.fieldNameA,
      nameB: wedding.fieldNameB,
      eventDate: wedding.fieldEventDate,
    })
    .from(weddingUsers)
    .innerJoin(wedding, eq(weddingUsers.weddingId, wedding.id))
    .where(eq(weddingUsers.clerkUserId, input.clerkUserId))
    .limit(1);

  if (!result) {
    return null;
  }

  return {
    id: result.id,
    displayName: result.displayName || "",
    nameA: result.nameA || "",
    nameB: result.nameB || "",
    eventDate: result.eventDate || null,
  };
}
