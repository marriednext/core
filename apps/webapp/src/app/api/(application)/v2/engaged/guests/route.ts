import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db, getInvitationsWithGuests } from "@/database/drizzle";
import { getCurrentWedding } from "@/lib/admin/getCurrentWedding";
import { buildSiteUrl, getInitials } from "@/lib/siteUtils";

type GuestResponse = {
  id: string;
  name: string;
  isAttending: boolean | null;
  hasPlusOne: boolean;
};

type InvitationResponse = {
  id: string;
  groupName: string;
  email: string | null;
  guests: GuestResponse[];
};

export async function GET() {
  try {
    const [user, weddingData] = await Promise.all([
      currentUser(),
      getCurrentWedding(),
    ]);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!weddingData) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const invitationsWithGuests = await getInvitationsWithGuests(
      weddingData.id,
      "alpha-asc"
    );

    const invitations: InvitationResponse[] = invitationsWithGuests.map(
      (inv) => ({
        id: inv.id,
        groupName: inv.inviteGroupName || inv.guests[0]?.nameOnInvitation || "Unnamed",
        email: inv.email,
        guests: inv.guests.map((g) => ({
          id: g.id,
          name: g.nameOnInvitation,
          isAttending: g.isAttending,
          hasPlusOne: g.hasPlusOne ?? false,
        })),
      })
    );

    const subscriptionPlan = "Free";
    const rsvpLink = weddingData.subdomain
      ? `${weddingData.subdomain}.marriednext.com/rsvp`
      : "";

    return NextResponse.json({
      invitations,
      rsvpLink,
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
      wedding: {
        displayName: weddingData.fieldDisplayName || "",
        nameA: weddingData.fieldNameA || "",
        nameB: weddingData.fieldNameB || "",
        eventDate: weddingData.fieldEventDate || null,
      },
      subscriptionPlan,
    });
  } catch (error) {
    console.error("Error fetching guest list:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest list" },
      { status: 500 }
    );
  }
}

