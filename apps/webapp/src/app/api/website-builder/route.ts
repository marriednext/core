import { NextResponse } from "next/server";
import { getWeddingByDomain } from "@/lib/tenant/getWeddingByDomain";
import { getCurrentWedding } from "@/lib/admin/getCurrentWedding";

export async function GET() {
  const wedding = await getCurrentWedding();

  if (!wedding) {
    return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
  }

  console.log("wedding", wedding);
  return NextResponse.json({
    displayName: wedding.fieldDisplayName || "",
    locationName: wedding.fieldLocationName || "",
    locationAddress: wedding.fieldLocationAddress || "",
    eventDate: wedding.fieldEventDate || null,
    eventTime: wedding.fieldEventTime || "",
    mapsShareUrl: wedding.fieldMapsShareUrl || "",
    nameA: wedding.fieldNameA || "",
    nameB: wedding.fieldNameB || "",
    subdomain: wedding.subdomain || "",
  });
}
