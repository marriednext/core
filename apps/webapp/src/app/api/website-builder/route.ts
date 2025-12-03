import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentWedding } from "@/lib/admin/getCurrentWedding";
import { getInitials } from "@/lib/siteUtils";

export async function GET() {
  try {
    const [user, wedding] = await Promise.all([
      currentUser(),
      getCurrentWedding(),
    ]);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!wedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const subscriptionPlan = "Free";

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
      user: {
        fullName:
          user.fullName ||
          user.firstName ||
          user.emailAddresses[0]?.emailAddress ||
          "User",
        imageUrl: user.imageUrl || null,
        initials: getInitials(user.fullName, user.firstName, user.lastName),
        email: user.emailAddresses[0]?.emailAddress || "",
      },
      subscriptionPlan,
    });
  } catch (error) {
    console.error("Error fetching website builder data:", error);
    return NextResponse.json(
      { error: "Failed to fetch website builder data" },
      { status: 500 }
    );
  }
}
