import type { WeddingData } from "@/lib/wedding/types";

const THEME_ID = "lisastheme";

export function mapWeddingDataToLisasThemeProps(weddingData: WeddingData) {
  const heroPhoto = weddingData.photos?.find(
    (p) => p.photoType === "hero" && p.themeId === THEME_ID
  );
  const storyPhoto = weddingData.photos?.find(
    (p) => p.photoType === "story" && p.themeId === THEME_ID
  );
  const galleryPhotos =
    weddingData.photos
      ?.filter((p) => p.photoType === "gallery" && p.themeId === THEME_ID)
      .sort((a, b) => a.displayOrder - b.displayOrder) || [];

  return {
    fieldNameA: weddingData.fieldNameA,
    fieldNameB: weddingData.fieldNameB,
    fieldLocationName: weddingData.fieldLocationName,
    fieldLocationAddress: weddingData.fieldLocationAddress,
    fieldEventDate: weddingData.fieldEventDate,
    fieldEventTime: weddingData.fieldEventTime,
    fieldMapsShareUrl: weddingData.fieldMapsShareUrl,
    heroImageUrl: heroPhoto?.blobUrl,
    ourStoryImageUrl: storyPhoto?.blobUrl,
    galleryImages:
      galleryPhotos.length > 0
        ? galleryPhotos.map((p) => p.blobUrl)
        : undefined,
    websiteSections: weddingData.websiteSections,
    websiteLabels: weddingData.websiteLabels,
    websiteTokens: weddingData.websiteTokens,
  };
}
