import { put, del } from "@vercel/blob";

export type PhotoType = "hero" | "story" | "gallery" | "memory";

export function getBlobPathname(
  weddingId: string,
  photoType: PhotoType,
  filename: string
): string {
  return `engaged/${weddingId}/website/${photoType}/${filename}`;
}

export async function uploadPhoto(
  file: File | Buffer,
  weddingId: string,
  photoType: PhotoType,
  filename: string
): Promise<{ url: string; pathname: string }> {
  const pathname = getBlobPathname(weddingId, photoType, filename);

  const blob = await put(pathname, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
  };
}

export async function deletePhoto(pathname: string): Promise<void> {
  await del(pathname, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}


