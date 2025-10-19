import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/database/drizzle";
import { wedding } from "@/drizzle/schema";

const qaItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

const storyItemSchema = z.object({
  id: z.string(),
  heading: z.string(),
  text: z.string(),
  photoUrl: z.string(),
});

const weddingSettingsSchema = z
  .object({
    displayName: z.string().nullable(),
    locationName: z.string().nullable(),
    locationAddress: z.string().nullable(),
    eventDate: z.string().nullable(),
    eventTime: z.string().nullable(),
    mapsEmbedUrl: z.string().nullable(),
    mapsShareUrl: z.string().nullable(),
    questionsAndAnswers: z.array(qaItemSchema).nullable(),
    ourStory: z.array(storyItemSchema).nullable(),
  })
  .strict();

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = weddingSettingsSchema.parse(body);

    const updateData: Record<string, unknown> = {};

    if (validatedData.displayName !== undefined) {
      updateData.fieldDisplayName = validatedData.displayName;
    }
    if (validatedData.locationName !== undefined) {
      updateData.fieldLocationName = validatedData.locationName;
    }
    if (validatedData.locationAddress !== undefined) {
      updateData.fieldLocationAddress = validatedData.locationAddress;
    }
    if (validatedData.eventDate !== undefined) {
      updateData.fieldEventDate = validatedData.eventDate;
    }
    if (validatedData.eventTime !== undefined) {
      updateData.fieldEventTime = validatedData.eventTime;
    }
    if (validatedData.mapsEmbedUrl !== undefined) {
      updateData.fieldMapsEmbedUrl = validatedData.mapsEmbedUrl;
    }
    if (validatedData.mapsShareUrl !== undefined) {
      updateData.fieldMapsShareUrl = validatedData.mapsShareUrl;
    }
    if (validatedData.questionsAndAnswers !== undefined) {
      updateData.fieldQuestionsAndAnswers = validatedData.questionsAndAnswers;
    }
    if (validatedData.ourStory !== undefined) {
      updateData.fieldOurStory = validatedData.ourStory;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    updateData.updatedAt = new Date().toISOString();

    const [updatedWedding] = await db
      .update(wedding)
      .set(updateData)
      .returning();

    if (!updatedWedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedWedding,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error updating wedding settings:", error);
    return NextResponse.json(
      { error: "Failed to update wedding settings" },
      { status: 500 }
    );
  }
}
