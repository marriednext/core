"use client";

import { LisasTheme } from "component-shelf";
import { mapWeddingDataToLisasThemeProps } from "./mapper";
import type { ThemeProps } from "../../types";

export default function LisasThemeEntry({
  weddingData,
  editable,
  contained,
  onCustomizationChange,
  onSectionClick,
}: ThemeProps) {
  const props = mapWeddingDataToLisasThemeProps(weddingData);
  return (
    <LisasTheme
      {...props}
      editable={editable}
      contained={contained}
      onCustomizationChange={onCustomizationChange}
      onSectionClick={onSectionClick}
    />
  );
}

