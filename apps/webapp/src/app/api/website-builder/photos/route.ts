import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/database/drizzle";
import { weddingPhotos } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentWedding } from "@/lib/wedding/getCurrentWedding";
import { uploadPhoto, deletePhoto, type PhotoType } from "@/lib/infrastructure/blob/upload";
import { randomUUID } from "crypto";
import { invalidateWeddingCache } from "@/lib/wedding/cache";

const uploadSchema = z.object({
  photoType: z.enum(["hero", "story", "gallery"]),
  themeId: z.string().min(1),
  displayOrder: z.number().optional(),
});

const deleteSchema = z.object({
  photoId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wedding = await getCurrentWedding();
    if (!wedding) {
      return NextResponse.json(
        { error: "Wedding not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const photoType = formData.get("photoType") as string;
    const themeId = formData.get("themeId") as string;
    const displayOrderStr = formData.get("displayOrder") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    const validatedData = uploadSchema.parse({
      photoType,
      themeId,
      displayOrder: displayOrderStr ? parseInt(displayOrderStr, 10) : undefined,
    });

    if (validatedData.photoType === "hero" || validatedData.photoType === "story") {
      const existingPhoto = await db.query.weddingPhotos.findFirst({
        where: and(
          eq(weddingPhotos.weddingId, wedding.id),
          eq(weddingPhotos.themeId, validatedData.themeId),
          eq(weddingPhotos.photoType, validatedData.photoType)
        ),
      });

      if (existingPhoto) {
        await deletePhoto(existingPhoto.blobPathname);
        await db
          .delete(weddingPhotos)
          .where(eq(weddingPhotos.id, existingPhoto.id));
      }
    }

    const filename = `${randomUUID()}-${file.name}`;
    const { url, pathname } = await uploadPhoto(
      file,
      wedding.id,
      validatedData.photoType,
      filename
    );

    const [newPhoto] = await db
      .insert(weddingPhotos)
      .values({
        weddingId: wedding.id,
        themeId: validatedData.themeId,
        photoType: validatedData.photoType,
        blobUrl: url,
        blobPathname: pathname,
        displayOrder: validatedData.displayOrder ?? 0,
      })
      .returning({
        id: weddingPhotos.id,
        themeId: weddingPhotos.themeId,
        photoType: weddingPhotos.photoType,
        blobUrl: weddingPhotos.blobUrl,
        displayOrder: weddingPhotos.displayOrder,
      });

    await invalidateWeddingCache({
      subdomain: wedding.subdomain,
      customDomain: wedding.customDomain,
    });

    return NextResponse.json({ photo: newPhoto }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wedding = await getCurrentWedding();
    if (!wedding) {
      return NextResponse.json(
        { error: "Wedding not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { photoId } = deleteSchema.parse(body);

    const photo = await db.query.weddingPhotos.findFirst({
      where: and(
        eq(weddingPhotos.id, photoId),
        eq(weddingPhotos.weddingId, wedding.id)
      ),
    });

    if (!photo) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      );
    }

    await deletePhoto(photo.blobPathname);
    await db.delete(weddingPhotos).where(eq(weddingPhotos.id, photoId));

    await invalidateWeddingCache({
      subdomain: wedding.subdomain,
      customDomain: wedding.customDomain,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}

