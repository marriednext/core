"use client";

import "style-shelf/tailwind";
import type { BasicThemeProps } from "./types";
import { defaultWebsiteTokens } from "./types";
import { Navigation } from "./navigation";
import { HeroSection } from "./hero-section";
import { CountdownSection } from "./countdown-section";
import { OurStorySection } from "./our-story-section";
import { EventDetailsSection } from "./event-details-section";
import { GallerySection } from "./gallery-section";
import { FaqSection } from "./faq-section";
import { RsvpSection } from "./rsvp-section";
import { RegistrySection } from "./registry-section";
import { PhotoUploadSection } from "./photo-upload-section";
import { FooterSection } from "./footer-section";
import SideNavigation from "../defaults/SideNavigation";

const defaultSections = [
  { id: "hero", enabled: true, order: 0 },
  { id: "countdown", enabled: true, order: 1 },
  { id: "ourStory", enabled: true, order: 2 },
  { id: "eventDetails", enabled: true, order: 3 },
  { id: "gallery", enabled: true, order: 4 },
  { id: "rsvp", enabled: true, order: 5 },
  { id: "faq", enabled: true, order: 6 },
  { id: "registry", enabled: true, order: 7 },
  { id: "photos", enabled: true, order: 8 },
];

export function BasicTheme({
  fieldNameA,
  fieldNameB,
  fieldLocationName,
  fieldLocationAddress,
  fieldEventDate,
  fieldEventTime,
  fieldMapsShareUrl,
  heroImageUrl,
  rsvpFormComponent,
  galleryImages,
  websiteSections,
  websiteLabels,
  websiteTokens,
  editable = false,
  onCustomizationChange,
  onSectionClick,
  LinkComponent = "a",
  ImageComponent = "img",
}: BasicThemeProps) {
  const tokens = websiteTokens || defaultWebsiteTokens;
  const handleSectionChange =
    (section: string) => (key: string, value: string) => {
      onCustomizationChange?.(section, key, value);
    };

  const getSectionLabels = (sectionId: string) => {
    return websiteLabels?.[sectionId] || {};
  };

  const sections = websiteSections || defaultSections;
  const sectionsMap = new Map(sections.map((s) => [s.id, s]));

  const isSectionEnabled = (sectionId: string) => {
    return sectionsMap.get(sectionId)?.enabled ?? true;
  };

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (editable && onSectionClick) {
      e.stopPropagation();
      onSectionClick(sectionId);
    }
  };

  const sectionWrapperClass = editable
    ? "cursor-pointer hover:outline hover:outline-2 hover:outline-primary/50 hover:outline-offset-2 transition-all"
    : "";

  const logoLabel =
    fieldNameA && fieldNameB
      ? `${fieldNameA.charAt(0)} & ${fieldNameB.charAt(0)}`
      : "E & J";

  const allNavLinks = [
    { label: "OUR STORY", href: "#story", sectionId: "ourStory" },
    { label: "EVENT", href: "#event", sectionId: "eventDetails" },
    { label: "GALLERY", href: "#gallery", sectionId: "gallery" },
    { label: "RSVP", href: "#rsvp", sectionId: "rsvp" },
    { label: "FAQ", href: "#faq", sectionId: "faq" },
    { label: "REGISTRY", href: "#registry", sectionId: "registry" },
    { label: "PHOTOS", href: "#photos", sectionId: "photos" },
  ];

  const navLinks = allNavLinks
    .filter((link) => isSectionEnabled(link.sectionId))
    .map(({ label, href }) => ({ label, href }));

  const cssVars = {
    "--basic-primary": tokens.primary,
    "--basic-primary-foreground": tokens.primaryForeground,
    "--basic-background": tokens.background,
    "--basic-heading-color": tokens.headingColor,
    "--basic-body-color": tokens.bodyColor,
    "--basic-heading-font": tokens.headingFont,
    "--basic-body-font": tokens.bodyFont,
    "--foreground": tokens.headingColor,
    "--background": tokens.background,
    "--muted-foreground": tokens.bodyColor,
    "--primary": tokens.primary,
    "--primary-foreground": tokens.primaryForeground,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen @container"
      style={{
        ...cssVars,
        backgroundColor: tokens.background,
        color: tokens.bodyColor,
        fontFamily: tokens.bodyFont,
      }}
    >
      <Navigation
        customization={{
          logoLabel,
          ...getSectionLabels("navigation"),
        }}
        editable={editable}
        onCustomizationChange={handleSectionChange("navigation")}
      />
      <SideNavigation
        navLinks={navLinks}
        getNavItemClass={() =>
          "text-foreground hover:opacity-50 transition-opacity"
        }
        ariaLabel="Main navigation"
        Link={LinkComponent}
      />

      {isSectionEnabled("hero") && (
        <div
          onClick={handleSectionClick("hero")}
          className={sectionWrapperClass}
        >
          <HeroSection
            data={{
              nameA: fieldNameA,
              nameB: fieldNameB,
              eventDate: fieldEventDate,
              locationName: fieldLocationName,
              imageUrl: heroImageUrl,
            }}
            customization={getSectionLabels("hero")}
            editable={editable}
            onCustomizationChange={handleSectionChange("hero")}
            LinkComponent={LinkComponent}
          />
        </div>
      )}

      {isSectionEnabled("countdown") && (
        <div
          onClick={handleSectionClick("countdown")}
          className={sectionWrapperClass}
          suppressHydrationWarning
        >
          <CountdownSection
            data={{ eventDate: fieldEventDate }}
            customization={getSectionLabels("countdown")}
            editable={editable}
            onCustomizationChange={handleSectionChange("countdown")}
          />
        </div>
      )}

      {isSectionEnabled("ourStory") && (
        <div
          onClick={handleSectionClick("ourStory")}
          className={sectionWrapperClass}
        >
          <OurStorySection
            data={{}}
            customization={getSectionLabels("ourStory")}
            editable={editable}
            onCustomizationChange={handleSectionChange("ourStory")}
          />
        </div>
      )}

      {isSectionEnabled("eventDetails") && (
        <div
          onClick={handleSectionClick("eventDetails")}
          className={sectionWrapperClass}
        >
          <EventDetailsSection
            data={{
              locationName: fieldLocationName,
              locationAddressLine1: fieldLocationAddress,
              eventDate: fieldEventDate,
              eventTime: fieldEventTime,
              mapsShareUrl: fieldMapsShareUrl,
            }}
            customization={getSectionLabels("eventDetails")}
            editable={editable}
            onCustomizationChange={handleSectionChange("eventDetails")}
            LinkComponent={LinkComponent}
          />
        </div>
      )}

      {isSectionEnabled("gallery") && (
        <div
          onClick={handleSectionClick("gallery")}
          className={sectionWrapperClass}
        >
          <GallerySection
            data={{
              images:
                galleryImages && galleryImages.length > 0
                  ? galleryImages.map((url) => ({ src: url }))
                  : undefined,
            }}
            customization={getSectionLabels("gallery")}
            editable={editable}
            onCustomizationChange={handleSectionChange("gallery")}
            ImageComponent={ImageComponent}
          />
        </div>
      )}

      {isSectionEnabled("rsvp") && (
        <div
          onClick={handleSectionClick("rsvp")}
          className={sectionWrapperClass}
        >
          <RsvpSection
            data={{ rsvpFormComponent }}
            customization={getSectionLabels("rsvp")}
            editable={editable}
            onCustomizationChange={handleSectionChange("rsvp")}
          />
        </div>
      )}

      {isSectionEnabled("faq") && (
        <div
          onClick={handleSectionClick("faq")}
          className={sectionWrapperClass}
        >
          <FaqSection
            data={{}}
            customization={getSectionLabels("faq")}
            editable={editable}
            onCustomizationChange={handleSectionChange("faq")}
          />
        </div>
      )}

      {isSectionEnabled("registry") && (
        <div
          onClick={handleSectionClick("registry")}
          className={sectionWrapperClass}
        >
          <RegistrySection
            data={{}}
            customization={getSectionLabels("registry")}
            editable={editable}
            onCustomizationChange={handleSectionChange("registry")}
            LinkComponent={LinkComponent}
          />
        </div>
      )}

      {isSectionEnabled("photos") && (
        <div
          onClick={handleSectionClick("photos")}
          className={sectionWrapperClass}
        >
          <PhotoUploadSection
            data={{}}
            customization={getSectionLabels("photos")}
            editable={editable}
            onCustomizationChange={handleSectionChange("photos")}
            LinkComponent={LinkComponent}
          />
        </div>
      )}

      <div
        onClick={handleSectionClick("footer")}
        className={sectionWrapperClass}
      >
        <FooterSection
          data={{
            nameA: fieldNameA,
            nameB: fieldNameB,
            eventDate: fieldEventDate,
          }}
          customization={getSectionLabels("footer")}
          editable={editable}
          onCustomizationChange={handleSectionChange("footer")}
          LinkComponent={LinkComponent}
          ImageComponent={ImageComponent}
        />
      </div>
    </div>
  );
}
