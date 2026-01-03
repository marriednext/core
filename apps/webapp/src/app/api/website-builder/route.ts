import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentWedding } from "@/lib/wedding/getCurrentWedding";
import { getInitials } from "@/lib/utils/site";
import { db } from "@/database/drizzle";
import { wedding, weddingPhotos } from "@/database/schema";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { invalidateWeddingCache } from "@/lib/wedding/cache";
import type { LisasThemeTokens } from "@/database/types";

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

    const themeId = wedding.websiteTemplate || "lisastheme";

    const photos = await db
      .select({
        id: weddingPhotos.id,
        themeId: weddingPhotos.themeId,
        photoType: weddingPhotos.photoType,
        blobUrl: weddingPhotos.blobUrl,
        displayOrder: weddingPhotos.displayOrder,
      })
      .from(weddingPhotos)
      .where(
        and(
          eq(weddingPhotos.weddingId, wedding.id),
          eq(weddingPhotos.themeId, themeId)
        )
      )
      .orderBy(asc(weddingPhotos.displayOrder), asc(weddingPhotos.createdAt));

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
      customDomain: wedding.customDomain || null,
      photos,
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
      websiteSections: wedding.websiteSections,
      websiteLabels: wedding.websiteLabels,
      websiteTokens: wedding.websiteTokens,
      websiteTemplate: wedding.websiteTemplate || "lisastheme",
    });
  } catch (error) {
    console.error("Error fetching website builder data:", error);
    return NextResponse.json(
      { error: "Failed to fetch website builder data" },
      { status: 500 }
    );
  }
}

const websiteSectionsSchema = z.array(
  z.object({
    id: z.string(),
    enabled: z.boolean(),
    order: z.number(),
  })
);

const websiteLabelsSchema = z.record(
  z.string(),
  z.record(z.string(), z.string())
);

const websiteTemplateSchema = z.enum(["lisastheme", "tuscanbloom", "basic"]);

const websiteTokensSchema = z.object({
  primary: z.string(),
  primaryForeground: z.string(),
  background: z.string(),
  headingColor: z.string(),
  bodyColor: z.string(),
  headingFont: z.string(),
  bodyFont: z.string(),
});

const patchBodySchema = z
  .object({
    websiteSections: websiteSectionsSchema.optional(),
    websiteLabels: websiteLabelsSchema.optional(),
    websiteTemplate: websiteTemplateSchema.optional(),
    websiteTokens: websiteTokensSchema.optional(),
  })
  .refine(
    (data) =>
      data.websiteSections !== undefined ||
      data.websiteLabels !== undefined ||
      data.websiteTemplate !== undefined ||
      data.websiteTokens !== undefined,
    {
      message:
        "At least one of websiteSections, websiteLabels, websiteTemplate, or websiteTokens is required",
    }
  );

export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const weddingData = await getCurrentWedding();

    if (!weddingData) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const body = await req.json();
    const validated = patchBodySchema.parse(body);

    const updateData: {
      websiteSections?: typeof validated.websiteSections;
      websiteLabels?: typeof validated.websiteLabels;
      websiteTemplate?: typeof validated.websiteTemplate;
      websiteTokens?: LisasThemeTokens;
      updatedAt: string;
    } = {
      updatedAt: new Date().toISOString(),
    };

    if (validated.websiteSections) {
      updateData.websiteSections = validated.websiteSections;
    }

    if (validated.websiteLabels) {
      const existingLabels = weddingData.websiteLabels || {};
      const mergedLabels = { ...existingLabels };

      for (const [sectionId, labels] of Object.entries(
        validated.websiteLabels
      )) {
        mergedLabels[sectionId] = {
          ...(mergedLabels[sectionId] || {}),
          ...labels,
        };
      }

      updateData.websiteLabels = mergedLabels;
    }

    if (validated.websiteTemplate) {
      updateData.websiteTemplate = validated.websiteTemplate;
    }

    if (validated.websiteTokens) {
      updateData.websiteTokens = validated.websiteTokens;
    }

    await db
      .update(wedding)
      .set(updateData)
      .where(eq(wedding.id, weddingData.id));

    await invalidateWeddingCache({
      subdomain: weddingData.subdomain,
      customDomain: weddingData.customDomain,
    });

    return NextResponse.json({
      success: true,
      websiteSections: validated.websiteSections,
      websiteLabels: updateData.websiteLabels,
      websiteTemplate: updateData.websiteTemplate,
      websiteTokens: updateData.websiteTokens,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating website builder data:", error);
    return NextResponse.json(
      { error: "Failed to update website builder data" },
      { status: 500 }
    );
  }
}
