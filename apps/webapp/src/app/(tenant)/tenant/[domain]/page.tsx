"use client";

import { ThemeRenderer } from "@/components/theme/ThemeRenderer";
import { useWeddingData } from "@/contexts/WeddingDataContext";
import type { ThemeId } from "@/components/theme/types";

export default function Home() {
  const weddingData = useWeddingData();
  const themeId = (weddingData.websiteTemplate ?? "lisastheme") as ThemeId;

  return <ThemeRenderer themeId={themeId} weddingData={weddingData} />;
}
