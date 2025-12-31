"use client";

import dynamic from "next/dynamic";
import type { ThemeProps, ThemeId } from "./types";
import type { ComponentType } from "react";

const THEMES: Record<ThemeId, ComponentType<ThemeProps>> = {
  lisastheme: dynamic(() => import("./themes/lisastheme"), { ssr: false }),
  tuscanbloom: dynamic(() => import("./themes/tuscanbloom"), { ssr: false }),
  basic: dynamic(() => import("./themes/basic"), { ssr: false }),
};

export function ThemeRenderer({
  themeId,
  ...props
}: ThemeProps & { themeId: ThemeId }) {
  const Theme = THEMES[themeId];
  if (!Theme) return null;
  return <Theme {...props} />;
}

