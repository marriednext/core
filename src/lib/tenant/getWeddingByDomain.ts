import { unstable_cache } from "next/cache";
import { db } from "@/database/drizzle";
import { wedding } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";

async function getWeddingByDomainUncached(domain: string) {
  const [result] = await db
    .select({
      id: wedding.id,
      subdomain: wedding.subdomain,
      customDomain: wedding.customDomain,
      createdAt: wedding.createdAt,
      updatedAt: wedding.updatedAt,
      fieldDisplayName: wedding.fieldDisplayName,
      fieldLocationName: wedding.fieldLocationName,
      fieldLocationAddress: wedding.fieldLocationAddress,
      fieldEventDate: wedding.fieldEventDate,
      fieldEventTime: wedding.fieldEventTime,
      fieldMapsEmbedUrl: wedding.fieldMapsEmbedUrl,
      fieldMapsShareUrl: wedding.fieldMapsShareUrl,
      fieldQuestionsAndAnswers: wedding.fieldQuestionsAndAnswers,
      fieldOurStory: wedding.fieldOurStory,
      fieldNameA: wedding.fieldNameA,
      fieldNameB: wedding.fieldNameB,
      controlRsvpNameFormat: wedding.controlRsvpNameFormat,
    })
    .from(wedding)
    .where(or(eq(wedding.subdomain, domain), eq(wedding.customDomain, domain)))
    .limit(1);

  return result || null;
}

export const getWeddingByDomain = unstable_cache(
  getWeddingByDomainUncached,
  ["wedding-by-domain"],
  {
    tags: ["wedding"],
    revalidate: 3600,
  }
);
