import { db } from "@/database/drizzle";
import { wedding } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getWeddingFromRequest(
  request: Request
): Promise<{
  id: string;
  controlRsvpNameFormat: "FIRST_NAME_ONLY" | "FULL_NAME";
} | null> {
  const hostHeader = request.headers.get("host") || "";
  const hostWithoutPort = hostHeader.split(":")[0];
  const hostParts = hostWithoutPort.split(".");
  const firstLabel = hostParts[0] || "";

  const hasSubdomain =
    hostParts.length > 2 ||
    (hostParts.length > 1 && hostParts[hostParts.length - 1] === "localhost");
  const isTenantHost =
    hasSubdomain && firstLabel !== "www" && firstLabel !== "admin";

  if (isTenantHost) {
    const subdomain = firstLabel;
    const [weddingData] = await db
      .select({
        id: wedding.id,
        controlRsvpNameFormat: wedding.controlRsvpNameFormat,
      })
      .from(wedding)
      .where(eq(wedding.subdomain, subdomain))
      .limit(1);

    if (weddingData) {
      return weddingData;
    }
  } else {
    let apexDomain = "";
    if (firstLabel === "www") {
      apexDomain = hostParts.slice(1).join(".");
    } else {
      apexDomain = hostWithoutPort;
    }

    const [weddingData] = await db
      .select({
        id: wedding.id,
        controlRsvpNameFormat: wedding.controlRsvpNameFormat,
      })
      .from(wedding)
      .where(eq(wedding.customDomain, apexDomain))
      .limit(1);

    if (weddingData) {
      return weddingData;
    }
  }

  return null;
}
