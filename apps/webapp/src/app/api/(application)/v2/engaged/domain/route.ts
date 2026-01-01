import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/database/drizzle";
import { wedding } from "@/database/schema";
import { eq, and, sql } from "drizzle-orm";
import { getCurrentWedding } from "@/lib/wedding/getCurrentWedding";
import { invalidateWeddingCache } from "@/lib/wedding/cache";
import { subdomainSchema } from "@/lib/utils/site";
import * as Sentry from "@sentry/nextjs";
import {
  addSubdomainToVercel,
  getDomainConfig,
  removeSubdomainFromVercel,
} from "@/lib/infrastructure/vercel/domainService";
import {
  createCnameRecord,
  deleteCnameRecord,
} from "@/lib/infrastructure/porkbun/dnsService";

const SLOW_REQUEST_THRESHOLD_MS = 3000;

const domainSettingsSchema = z
  .object({
    subdomain: subdomainSchema.optional(),
    customDomain: z
      .string()
      .min(1, "Custom domain cannot be empty")
      .refine(
        (domain) =>
          !domain.startsWith("http://") && !domain.startsWith("https://"),
        "Domain should not include http:// or https://"
      )
      .refine(
        (domain) => !domain.endsWith("/"),
        "Domain should not include trailing slashes"
      )
      .optional()
      .nullable(),
  })
  .strict();

export async function PATCH(req: NextRequest) {
  const startTime = performance.now();

  try {
    const [user, currentWedding] = await Promise.all([
      currentUser(),
      getCurrentWedding(),
    ]);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!currentWedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const body = await req.json();
    const validatedData = domainSettingsSchema.parse(body);

    const updateData: Record<string, unknown> = {};

    const isSubdomainChanging =
      validatedData.subdomain !== undefined &&
      validatedData.subdomain !== currentWedding.subdomain;

    if (validatedData.subdomain !== undefined) {
      if (isSubdomainChanging) {
        const [existingSubdomain] = await db
          .select({ id: wedding.id })
          .from(wedding)
          .where(
            and(
              eq(wedding.subdomain, validatedData.subdomain),
              sql`${wedding.id} != ${currentWedding.id}`
            )
          )
          .limit(1);

        if (existingSubdomain) {
          return NextResponse.json(
            { error: "This subdomain is already taken" },
            { status: 409 }
          );
        }

        const vercelResult = await addSubdomainToVercel(
          validatedData.subdomain
        );
        if (!vercelResult.success) {
          Sentry.captureMessage("Subdomain rename failed - Vercel add error", {
            level: "warning",
            extra: {
              newSubdomain: validatedData.subdomain,
              oldSubdomain: currentWedding.subdomain,
              userId: user.id,
              vercelError: vercelResult.error,
            },
          });
          return NextResponse.json(
            { error: "Failed to register new subdomain. Please try again." },
            { status: 500 }
          );
        }

        const configResult = await getDomainConfig(vercelResult.domain!);
        const cnameValue =
          (configResult?.recommendedCNAME?.[0]?.value as string) || "";
        const porkbunResult = await createCnameRecord(
          validatedData.subdomain,
          cnameValue
        );

        if (!porkbunResult.success) {
          await removeSubdomainFromVercel(validatedData.subdomain);
          Sentry.captureMessage("Subdomain rename failed - Porkbun add error", {
            level: "warning",
            extra: {
              newSubdomain: validatedData.subdomain,
              oldSubdomain: currentWedding.subdomain,
              userId: user.id,
              porkbunError: porkbunResult.error,
            },
          });
          return NextResponse.json(
            { error: "Failed to configure DNS. Please try again." },
            { status: 500 }
          );
        }
      }
      updateData.subdomain = validatedData.subdomain;
    }

    if (validatedData.customDomain !== undefined) {
      const customDomainValue =
        validatedData.customDomain === null || validatedData.customDomain === ""
          ? null
          : validatedData.customDomain.trim();

      if (
        customDomainValue &&
        customDomainValue !== currentWedding.customDomain
      ) {
        const [existingCustomDomain] = await db
          .select({ id: wedding.id })
          .from(wedding)
          .where(
            and(
              eq(wedding.customDomain, customDomainValue),
              sql`${wedding.id} != ${currentWedding.id}`
            )
          )
          .limit(1);

        if (existingCustomDomain) {
          return NextResponse.json(
            { error: "This custom domain is already in use" },
            { status: 409 }
          );
        }
      }

      updateData.customDomain = customDomainValue;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    updateData.updatedAt = new Date().toISOString();

    const oldSubdomain = currentWedding.subdomain;
    const oldCustomDomain = currentWedding.customDomain;

    const [updatedWedding] = await db
      .update(wedding)
      .set(updateData)
      .where(eq(wedding.id, currentWedding.id))
      .returning();

    if (!updatedWedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    await invalidateWeddingCache({
      subdomain: oldSubdomain,
      customDomain: oldCustomDomain,
    });

    if (
      oldSubdomain !== updatedWedding.subdomain ||
      oldCustomDomain !== updatedWedding.customDomain
    ) {
      await invalidateWeddingCache({
        subdomain: updatedWedding.subdomain,
        customDomain: updatedWedding.customDomain,
      });
    }

    if (isSubdomainChanging && oldSubdomain) {
      const [vercelRemoval, porkbunRemoval] = await Promise.allSettled([
        removeSubdomainFromVercel(oldSubdomain),
        deleteCnameRecord(oldSubdomain),
      ]);

      if (
        vercelRemoval.status === "rejected" ||
        porkbunRemoval.status === "rejected"
      ) {
        Sentry.captureMessage("Old subdomain cleanup partially failed", {
          level: "warning",
          extra: {
            oldSubdomain,
            newSubdomain: updatedWedding.subdomain,
            vercelStatus:
              vercelRemoval.status === "fulfilled"
                ? vercelRemoval.value
                : vercelRemoval.reason,
            porkbunStatus:
              porkbunRemoval.status === "fulfilled"
                ? porkbunRemoval.value
                : porkbunRemoval.reason,
          },
        });
      }
    }

    const hasCustomDomainUpgrade = !!updatedWedding.customDomain;
    const domainVerified = !!updatedWedding.customDomain;

    const duration = performance.now() - startTime;
    if (duration > SLOW_REQUEST_THRESHOLD_MS) {
      Sentry.captureMessage("Domain API route took too long", {
        level: "warning",
        tags: {
          service: "engaged-domain",
        },
        extra: {
          durationMs: Math.round(duration),
          thresholdMs: SLOW_REQUEST_THRESHOLD_MS,
          weddingId: currentWedding.id,
          updatedFields: Object.keys(updateData),
        },
      });
    }

    return NextResponse.json({
      success: true,
      domainSettings: {
        subdomain: updatedWedding.subdomain || "",
        customDomain: updatedWedding.customDomain || null,
        hasCustomDomainUpgrade,
        domainVerified,
      },
    });
  } catch (error) {
    const duration = performance.now() - startTime;

    if (error instanceof z.ZodError) {
      Sentry.captureException(error, {
        level: "warning",
        tags: {
          service: "engaged-domain",
          errorType: "validation",
        },
        extra: {
          durationMs: Math.round(duration),
          issues: error.issues,
        },
      });
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    Sentry.captureException(error, {
      tags: {
        service: "engaged-domain",
        errorType: "server",
      },
      extra: {
        durationMs: Math.round(duration),
      },
    });
    return NextResponse.json(
      { error: "Failed to update domain settings" },
      { status: 500 }
    );
  }
}
