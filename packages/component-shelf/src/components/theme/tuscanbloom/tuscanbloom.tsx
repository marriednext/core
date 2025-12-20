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

// Wedding data - customize these fields
const weddingData = {
  couple: {
    partner1: "Elena",
    partner2: "Marco",
  },
  date: new Date("2025-09-20T16:00:00"),
  location: {
    fieldLocationName: "Villa di Maiano",
    fieldPreferredLocationAddressLine1: "Via Benedetto da Maiano, 11",
    fieldPreferredLocationAddressLine2: "",
    fieldPreferredLocationCity: "Fiesole",
    fieldPreferredLocationState: "Tuscany",
    fieldPreferredLocationZipCode: "50014",
    fieldPreferredLocationCountry: "Italy",
  },
  ceremony: {
    time: "4:00 PM",
    venue: "The Olive Grove",
  },
  reception: {
    time: "6:30 PM",
    venue: "The Terrace Gardens",
  },
};

export default function WeddingPage() {
  return (
    <ScrollAnimationProvider>
      <main className="relative">
        <StickyNav />
        <HeroSection
          partner1={weddingData.couple.partner1}
          partner2={weddingData.couple.partner2}
          date={weddingData.date}
          location={weddingData.location}
        />
        <CountdownSection targetDate={weddingData.date} />
        <OurStorySection
          partner1={weddingData.couple.partner1}
          partner2={weddingData.couple.partner2}
        />
        <EventDetailsSection
          location={weddingData.location}
          ceremony={weddingData.ceremony}
          reception={weddingData.reception}
          date={weddingData.date}
        />
        <GallerySection />
        <RsvpSection />
        <FaqSection />
        <RegistrySection />
        <FooterSection
          partner1={weddingData.couple.partner1}
          partner2={weddingData.couple.partner2}
        />
      </main>
    </ScrollAnimationProvider>
  );
}
