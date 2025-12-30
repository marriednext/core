"use client";

import { LisasTheme } from "component-shelf";
import { mapWeddingDataToLisasThemeProps } from "./mapper";
import type { ThemeProps } from "../../types";
import RsvpFormContainer from "@/components/RsvpFormContainer";
import type { RsvpFormTokens, RsvpFormStyles } from "@/components/RsvpForm";

const lisasThemeTokens: RsvpFormTokens = {
  primary: "#745656",
  primaryForeground: "#ffffff",
  background: "#faf9f6",
  headingColor: "#2c2c2c",
  bodyColor: "#2c2c2c",
  headingFont: "'Cormorant Infant', serif",
  bodyFont: "'Cormorant Infant', serif",
};

const lisasThemeStyles: RsvpFormStyles = {
  container: "max-w-xl w-full text-center",
  title: "font-serif text-5xl md:text-6xl font-light italic mb-4",
  subtitle: "text-lg md:text-xl",
  input:
    "w-full h-14 text-lg text-center bg-transparent border-0 border-b-2 rounded-none focus:ring-0 placeholder:opacity-40",
  button:
    "h-14 px-12 tracking-[0.2em] uppercase text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  buttonBack: "underline text-base md:text-lg transition-colors",
  guestItem: "flex items-center justify-between p-4 border-y transition-colors",
  guestLabel: "font-serif text-xl italic cursor-pointer flex-1 text-left",
  checkbox: "h-5 w-5",
  successMessage: "mt-6 md:mt-10 text-lg md:text-xl",
  errorMessage: "mt-6 md:mt-10 text-lg md:text-xl",
};

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
      rsvpFormComponent={
        <RsvpFormContainer tokens={lisasThemeTokens} styles={lisasThemeStyles} />
      }
      editable={editable}
      contained={contained}
      onCustomizationChange={onCustomizationChange}
      onSectionClick={onSectionClick}
    />
  );
}
