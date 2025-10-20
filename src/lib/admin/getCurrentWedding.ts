import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/drizzle";
import { wedding } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getCurrentWedding() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [weddingData] = await db
    .select()
    .from(wedding)
    .where(eq(wedding.clerkUserId, userId))
    .limit(1);

  return weddingData || null;
}
