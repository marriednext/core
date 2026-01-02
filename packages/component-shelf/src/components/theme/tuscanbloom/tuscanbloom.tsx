"use client";

import "style-shelf/tailwind";
import { StickyNav } from "./sticky-nav";
import { HeroSection } from "./hero-section";
import { CountdownSection } from "./countdown-section";
import { OurStorySection } from "./our-story-section";
import { EventDetailsSection } from "./event-details-section";
import { GallerySection } from "./gallery-section";
import { RsvpSection } from "./rsvp-section";
import { FaqSection } from "./faq-section";
import { RegistrySection } from "./registry-section";
import { FooterSection } from "./footer-section";
import { ScrollAnimationProvider } from "./scroll-animation-provider";
import SideNavigation from "../defaults/SideNavigation";
import type { TuscanBloomProps } from "./types";

const defaultSections = [
  { id: "hero", enabled: true, order: 0 },
  { id: "countdown", enabled: true, order: 1 },
  { id: "ourStory", enabled: true, order: 2 },
  { id: "eventDetails", enabled: true, order: 3 },
  { id: "gallery", enabled: true, order: 4 },
  { id: "rsvp", enabled: true, order: 5 },
  { id: "faq", enabled: true, order: 6 },
  { id: "registry", enabled: true, order: 7 },
];

export function TuscanBloom({
  partner1,
  partner2,
  date,
  location,
  ceremony,
  reception,
  websiteSections,
  Image,
  Link,
}: TuscanBloomProps) {
  const sections = websiteSections || defaultSections;
  const sectionsMap = new Map(sections.map((s) => [s.id, s]));

  const isSectionEnabled = (sectionId: string) => {
    return sectionsMap.get(sectionId)?.enabled ?? true;
  };

  const allNavLinks = [
    { label: "Our Story", href: "#our-story", sectionId: "ourStory" },
    { label: "Details", href: "#details", sectionId: "eventDetails" },
    { label: "Gallery", href: "#gallery", sectionId: "gallery" },
    { label: "RSVP", href: "#rsvp", sectionId: "rsvp" },
    { label: "FAQ", href: "#faq", sectionId: "faq" },
    { label: "Registry", href: "#registry", sectionId: "registry" },
  ];

  const navLinks = allNavLinks
    .filter((link) => isSectionEnabled(link.sectionId))
    .map(({ label, href }) => ({ label, href }));

  return (
    <ScrollAnimationProvider>
      <main className="relative">
        <StickyNav Link={Link} />
        <SideNavigation
          navLinks={navLinks}
          getNavItemClass={() =>
            "text-foreground/80 hover:text-primary transition-colors"
          }
          ariaLabel="Main navigation"
          Link={Link}
        />
        {isSectionEnabled("hero") && (
          <HeroSection
            partner1={partner1}
            partner2={partner2}
            date={date}
            location={location}
            Image={Image}
          />
        )}
        {isSectionEnabled("countdown") && (
          <CountdownSection targetDate={date} />
        )}
        {isSectionEnabled("ourStory") && (
          <OurStorySection
            partner1={partner1}
            partner2={partner2}
            Image={Image}
          />
        )}
        {isSectionEnabled("eventDetails") && (
          <EventDetailsSection
            location={location}
            ceremony={ceremony}
            reception={reception}
            date={date}
          />
        )}
        {isSectionEnabled("gallery") && <GallerySection Image={Image} />}
        {isSectionEnabled("rsvp") && <RsvpSection />}
        {isSectionEnabled("faq") && <FaqSection />}
        {isSectionEnabled("registry") && <RegistrySection />}
        <FooterSection partner1={partner1} partner2={partner2} Link={Link} />
      </main>
    </ScrollAnimationProvider>
  );
}
