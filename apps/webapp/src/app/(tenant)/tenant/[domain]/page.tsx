"use client";

import { ThemeRenderer } from "@/components/theme/ThemeRenderer";
import { useWeddingData } from "@/contexts/WeddingDataContext";

export default function Home() {
  const weddingData = useWeddingData();
  const themeId = "lisastheme";

  return <ThemeRenderer themeId={themeId} weddingData={weddingData} />;
}
