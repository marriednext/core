import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { invitation } from "@/drizzle/schema";
import { or, ilike, asc, desc, sql } from "drizzle-orm";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().min(1),
});

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy") || "alpha-asc";

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const validatedData = searchSchema.parse({ query });
    const searchPattern = `%${validatedData.query}%`;

    const results = await db.query.invitation.findMany({
      where: or(
        ilike(invitation.guestA, searchPattern),
        ilike(invitation.guestB, searchPattern),
        ilike(invitation.inviteGroupName, searchPattern)
      ),
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
      orderBy: () => {
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
    });

    const resultsWithAttendance = results.map((inv) => {
      let attending = 0;
      let total = 0;

      const allGuests = [
        inv.invitation_guestA,
        inv.invitation_guestB,
        inv.invitation_guestC,
        inv.invitation_guestD,
        inv.invitation_guestE,
        inv.invitation_guestF,
        inv.invitation_guestG,
        inv.invitation_guestH,
      ];

      allGuests.forEach((g) => {
        if (g) {
          total++;
          if (g.isAttending) attending++;
          if (g.hasPlusOne) {
            total++;
            if (g.isAttending) attending++;
          }
        }
      });

      return {
        ...inv,
        attending,
        total,
      };
    });

    return NextResponse.json({
      results: resultsWithAttendance,
      count: resultsWithAttendance.length,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error searching invitations:", error);
    return NextResponse.json(
      { error: "Failed to search invitations" },
      { status: 500 }
    );
  }
}
