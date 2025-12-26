import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/database/drizzle";
import { getShellWeddingData, type ShellApiResponse } from "orm-shelf/queries";
import { getInitials } from "@/lib/utils/site";
import * as Sentry from "@sentry/nextjs";

export async function GET(): Promise<
  NextResponse<ShellApiResponse | { error: string }>
> {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const weddingData = await getShellWeddingData(db, { clerkUserId: user.id });

    if (!weddingData) {
      Sentry.captureMessage("Wedding not found for authenticated user", {
        level: "warning",
        tags: {
          service: "engaged-shell",
        },
        extra: {
          clerkUserId: user.id,
        },
      });
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const subscriptionPlan = "Free";

    const response: ShellApiResponse = {
      user: {
        fullName:
          user.fullName ||
          user.firstName ||
          user.emailAddresses[0]?.emailAddress ||
          "User",
        email: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl || null,
        initials: getInitials(user.fullName, user.firstName, user.lastName),
      },
      wedding: weddingData,
      subscriptionPlan,
    };

    return NextResponse.json(response);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        service: "engaged-shell",
      },
    });
    return NextResponse.json(
      { error: "Failed to load shell data" },
      { status: 500 }
    );
  }
}
