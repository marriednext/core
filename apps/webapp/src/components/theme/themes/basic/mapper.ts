import type { WeddingData } from "@/lib/wedding/types";

const THEME_ID = "basic";

export function mapWeddingDataToBasicThemeProps(weddingData: WeddingData) {
  const heroPhoto = weddingData.photos?.find(
    (p) => p.photoType === "hero" && p.themeId === THEME_ID
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
    galleryImages:
      galleryPhotos.length > 0
        ? galleryPhotos.map((p) => p.blobUrl)
        : undefined,
    websiteSections: weddingData.websiteSections,
    websiteLabels: weddingData.websiteLabels,
  };
}



