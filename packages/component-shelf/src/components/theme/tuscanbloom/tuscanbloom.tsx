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
import type { TuscanBloomProps } from "./types";

export function TuscanBloom({
  partner1,
  partner2,
  date,
  location,
  ceremony,
  reception,
  Image,
  Link,
}: TuscanBloomProps) {
  return (
    <ScrollAnimationProvider>
      <main className="relative">
        <StickyNav />
        <HeroSection
          partner1={partner1}
          partner2={partner2}
          date={date}
          location={location}
          Image={Image}
        />
        <CountdownSection targetDate={date} />
        <OurStorySection
          partner1={partner1}
          partner2={partner2}
          Image={Image}
        />
        <EventDetailsSection
          location={location}
          ceremony={ceremony}
          reception={reception}
          date={date}
        />
        <GallerySection Image={Image} />
        <RsvpSection />
        <FaqSection />
        <RegistrySection />
        <FooterSection partner1={partner1} partner2={partner2} Link={Link} />
      </main>
    </ScrollAnimationProvider>
  );
}
