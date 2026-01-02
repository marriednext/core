"use client";

import { BasicTheme, defaultWebsiteTokens } from "component-shelf";
import type { ApplicationImageComponent } from "component-shelf";
import { mapWeddingDataToBasicThemeProps } from "./mapper";
import type { ThemeProps } from "../../types";
import RsvpFormContainer from "@/components/RsvpFormContainer";
import type { RsvpFormTokens, RsvpFormStyles } from "@/components/RsvpForm";
import Link from "next/link";
import Image from "next/image";

const basicThemeStyles: RsvpFormStyles = {
  container: "max-w-xl w-full",
  title: "font-serif text-5xl md:text-6xl mb-4",
  subtitle: "text-lg md:text-xl opacity-80",
  input:
    "px-4 w-full h-14 text-lg bg-transparent border-0 border-b-2 border-background rounded-none focus:ring-0 placeholder:opacity-40",
  button:
    "h-14 px-12 tracking-[0.2em] uppercase text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  buttonBack: "underline text-base transition-colors",
  guestItem: "flex items-center justify-between p-4 border-y transition-colors",
  guestLabel: "font-serif text-xl cursor-pointer flex-1 text-left",
  checkbox: "h-5 w-5",
  successMessage: "mt-6 md:mt-10 text-lg md:text-xl",
  errorMessage: "mt-6 md:mt-10 text-lg md:text-xl",
};

export default function BasicThemeEntry({
  weddingData,
  editable,
  onCustomizationChange,
  onSectionClick,
}: ThemeProps) {
  const props = mapWeddingDataToBasicThemeProps(weddingData);
  const tokens = weddingData.websiteTokens || defaultWebsiteTokens;

  const rsvpTokens: RsvpFormTokens = {
    primary: tokens.primary,
    primaryForeground: tokens.primaryForeground,
    background: tokens.background,
    headingColor: tokens.headingColor,
    bodyColor: tokens.bodyColor,
    headingFont: `'${tokens.headingFont}', serif`,
    bodyFont: `'${tokens.bodyFont}', sans-serif`,
  };

  return (
    <BasicTheme
      {...props}
      websiteTokens={tokens}
      rsvpFormComponent={
        <RsvpFormContainer
          tokens={rsvpTokens}
          styles={basicThemeStyles}
          showTitle={false}
        />
      }
      editable={editable}
      onCustomizationChange={onCustomizationChange}
      onSectionClick={onSectionClick}
      LinkComponent={Link}
      ImageComponent={Image as ApplicationImageComponent}
    />
  );
}


