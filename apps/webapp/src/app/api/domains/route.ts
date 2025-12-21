import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/drizzle";
import { wedding } from "orm-shelf/schema";
import { eq } from "drizzle-orm";
import { RESERVED_SUBDOMAINS } from "@/lib/routing/multitenancy";
import * as Sentry from "@sentry/nextjs";
import {
  addSubdomainToVercel,
  getDomainConfig,
} from "@/lib/infrastructure/vercel/domainService";

const SUBDOMAIN_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const domainSchema = z.object({
  subdomain: z
    .string()
    .min(3, "Subdomain must be at least 3 characters")
    .max(63, "Subdomain must be at most 63 characters")
    .regex(
      SUBDOMAIN_REGEX,
      "Subdomain can only contain lowercase letters, numbers, and hyphens"
    )
    .refine(
      (subdomain) => !RESERVED_SUBDOMAINS.includes(subdomain),
      "This subdomain is reserved and cannot be used"
    ),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = domainSchema.parse(body);
    const { subdomain } = validatedData;
    const existingBySubdomain = await db
      .select({ id: wedding.id })
      .from(wedding)
      .where(eq(wedding.subdomain, subdomain))
      .limit(1);

    if (existingBySubdomain[0]) {
      return NextResponse.json(
        { error: "This subdomain is already taken", success: false },
        { status: 409 }
      );
    }

    const vercelResult = await addSubdomainToVercel(subdomain);
    if (!vercelResult.success) {
      Sentry.captureMessage("Domain registration failed due to Vercel error", {
        level: "warning",
        extra: {
          subdomain,
          userId,
          vercelError: vercelResult.error,
        },
      });

      return NextResponse.json(
        {
          error:
            "Failed to register subdomain. Please try a different subdomain or contact support.",
          success: false,
        },
        { status: 500 }
      );
    }

    const configResult = await getDomainConfig(vercelResult.domain!);

    const cnameRecord = {
      type: "CNAME",
      name: subdomain,
      value: (configResult?.recommendedCNAME?.[0]?.value as string) || "",
    };
    // TODO: add cname to Porkbun

    return NextResponse.json(
      {
        success: true,
        domain: vercelResult.domain,
        config: configResult.success
          ? {
              configuredBy: configResult.configuredBy,
              acceptedChallenges: configResult.acceptedChallenges,
              misconfigured: configResult.misconfigured,
            }
          : null,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.issues,
          success: false,
        },
        { status: 400 }
      );
    }

    console.error("Error registering domain:", error);
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to register domain", success: false },
      { status: 500 }
    );
  }
}
