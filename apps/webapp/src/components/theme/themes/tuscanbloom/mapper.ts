import type { WeddingData } from "@/lib/wedding/types";
import type {
  TuscanBloomProps,
  TuscanBloomLocation,
  TuscanBloomCeremony,
  TuscanBloomReception,
} from "component-shelf";

const THEME_ID = "tuscanbloom";

export function mapWeddingDataToTuscanBloomProps(
  weddingData: WeddingData
): Omit<TuscanBloomProps, "Image" | "Link"> {
  const heroPhoto = weddingData.photos?.find(
    (p) => p.photoType === "hero" && p.themeId === THEME_ID
  );

  const location: TuscanBloomLocation = {
    fieldLocationName: weddingData.fieldLocationName ?? "",
    fieldPreferredLocationAddressLine1: weddingData.fieldLocationAddress ?? "",
    fieldPreferredLocationAddressLine2: "",
    fieldPreferredLocationCity: "",
    fieldPreferredLocationState: "",
    fieldPreferredLocationZipCode: "",
    fieldPreferredLocationCountry: "",
  };

  const ceremony: TuscanBloomCeremony = {
    time: weddingData.fieldEventTime ?? "",
    venue: weddingData.fieldLocationName ?? "",
  };

  const reception: TuscanBloomReception = {
    time: weddingData.fieldEventTime ?? "",
    venue: weddingData.fieldLocationName ?? "",
  };

  const eventDate = weddingData.fieldEventDate
    ? new Date(weddingData.fieldEventDate)
    : new Date();

  return {
    partner1: weddingData.fieldNameA ?? "",
    partner2: weddingData.fieldNameB ?? "",
    date: eventDate,
    location,
    ceremony,
    reception,
  };
}

