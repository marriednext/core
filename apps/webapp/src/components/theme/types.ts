import type { WeddingData } from "@/lib/wedding/types";

export type ThemeProps = {
  weddingData: WeddingData;
  editable?: boolean;
  contained?: boolean;
  onCustomizationChange?: (section: string, key: string, value: string) => void;
  onSectionClick?: (sectionId: string) => void;
};

export type ThemeId = "lisastheme" | "tuscanbloom" | "basic";
