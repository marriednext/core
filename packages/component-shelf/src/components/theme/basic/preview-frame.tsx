"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  CalendarDays,
  Plus,
  Minus,
  ExternalLink,
  Camera,
} from "lucide-react";

import defaultGallery1 from "../../../assets/basic/romantic-couple-portrait-black-and-white.jpg";
import defaultGallery2 from "../../../assets/basic/couple-walking-beach-holding-hands.jpg";
import defaultGallery3 from "../../../assets/basic/couple-laughing-candid-moment.jpg";
import defaultGallery4 from "../../../assets/basic/couple-engagement-garden-photo.jpg";
import defaultGallery5 from "../../../assets/basic/couple-sunset-silhouette-romantic.jpg";
import defaultGallery6 from "../../../assets/basic/couple-intimate-portrait-close-up.jpg";

type FaqItem = {
  question: string;
  answer: string;
};

type RegistryItem = {
  name: string;
  description: string;
  link?: string;
};

type TokenValues = {
  primary: string;
  primaryForeground: string;
  background: string;
  headingColor: string;
  bodyColor: string;
  headingFont: string;
  bodyFont: string;
  heroImage: string | null;
  coupleImage: string | null;
  galleryImages: string[];
  faqs: FaqItem[];
  registries: RegistryItem[];
};

const navLinks = [
  { href: "#story", label: "OUR STORY" },
  { href: "#event", label: "EVENT" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
  { href: "#registry", label: "REGISTRY" },
];

const timeline = [
  {
    date: "SEPTEMBER 2018",
    title: "First Meeting",
    description:
      "We met at a mutual friend's art exhibition in Brooklyn. Emma spilled red wine on James's white shirt.",
  },
  {
    date: "DECEMBER 2018",
    title: "First Date",
    description:
      "After weeks of texting, we finally met for coffee that turned into dinner that turned into watching the sunrise.",
  },
  {
    date: "MARCH 2021",
    title: "Moving In",
    description:
      "We found a small apartment with a fire escape perfect for morning coffee. It was perfect.",
  },
  {
    date: "OCTOBER 2024",
    title: "The Proposal",
    description:
      "On a hike through the mountains, James nervously dropped the ring twice. She said yes before he finished asking.",
  },
];

const defaultGalleryImages = [
  defaultGallery1,
  defaultGallery2,
  defaultGallery3,
  defaultGallery4,
  defaultGallery5,
  defaultGallery6,
];

export function PreviewFrame({ tokens }: { tokens: TokenValues }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2025-06-15T16:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const galleryImages =
    tokens.galleryImages.length > 0
      ? tokens.galleryImages
      : defaultGalleryImages;

  // Muted color for secondary text
  const mutedColor = tokens.bodyColor + "cc";

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        backgroundColor: tokens.background,
        fontFamily: tokens.bodyFont,
      }}
    >
      {/* ... existing code for Navigation through RSVP Section ... */}
      {/* Navigation */}
      <nav
        className="sticky top-0 z-10 border-b-2 px-4 sm:px-6"
        style={{
          borderColor: tokens.headingColor,
          backgroundColor: tokens.background,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          <span
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
            className="text-lg"
          >
            E & J
          </span>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <span
                key={link.href}
                className="text-[9px] tracking-[0.2em] hover:opacity-50 cursor-pointer transition-opacity"
                style={{ color: tokens.headingColor }}
              >
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-[80vh] flex flex-col justify-center items-center px-4 pt-16 border-b-2 relative"
        style={{ borderColor: tokens.headingColor }}
      >
        {tokens.heroImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${tokens.heroImage})` }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: tokens.background, opacity: 0.88 }}
            />
          </>
        )}
        <div className="text-center max-w-4xl relative z-10">
          <p
            className="text-[9px] tracking-[0.3em] mb-6"
            style={{ color: tokens.bodyColor }}
          >
            WE ARE GETTING MARRIED
          </p>
          <h1
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
            className="text-5xl sm:text-6xl md:text-7xl leading-[0.85] tracking-tight mb-6"
          >
            <span className="block">Emma</span>
            <span
              className="block text-xl sm:text-2xl tracking-[0.5em] my-3"
              style={{ fontFamily: tokens.bodyFont, color: tokens.bodyColor }}
            >
              &
            </span>
            <span className="block">James</span>
          </h1>
          <div
            className="border-t-2 border-b-2 py-3 px-6 inline-block"
            style={{ borderColor: tokens.headingColor }}
          >
            <p
              className="text-[9px] tracking-[0.2em]"
              style={{ color: tokens.bodyColor }}
            >
              JUNE 15, 2025 — THE GROVE ESTATE
            </p>
          </div>
          <div className="mt-10">
            <button
              className="inline-block px-8 py-3 text-[9px] tracking-[0.2em] hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: tokens.primary,
                color: tokens.primaryForeground,
              }}
            >
              RSVP NOW
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div
            className="w-px h-12 animate-pulse"
            style={{ backgroundColor: tokens.headingColor }}
          />
        </div>
      </section>

      {/* Countdown Section */}
      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] mb-10 text-center"
            style={{ color: tokens.bodyColor }}
          >
            COUNTING DOWN
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ backgroundColor: tokens.headingColor }}
          >
            {[
              { value: countdown.days, label: "DAYS" },
              { value: countdown.hours, label: "HOURS" },
              { value: countdown.minutes, label: "MINUTES" },
              { value: countdown.seconds, label: "SECONDS" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 text-center"
                style={{ backgroundColor: tokens.background }}
              >
                <span
                  className="text-4xl md:text-5xl block"
                  style={{
                    fontFamily: tokens.headingFont,
                    color: tokens.headingColor,
                  }}
                >
                  {item.value.toString().padStart(2, "0")}
                </span>
                <span
                  className="text-[8px] tracking-[0.2em] mt-3 block"
                  style={{ color: mutedColor }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] mb-3"
            style={{ color: tokens.bodyColor }}
          >
            01
          </p>
          <h2
            className="text-4xl md:text-5xl mb-12"
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
          >
            Our Story
          </h2>
          <div className="space-y-0">
            {timeline.map((event, index) => (
              <div
                key={index}
                className="grid md:grid-cols-[160px_1fr] gap-3 md:gap-8 py-8 border-t-2 first:border-t-0"
                style={{ borderColor: tokens.headingColor }}
              >
                <p
                  className="text-[9px] tracking-[0.2em]"
                  style={{ color: mutedColor }}
                >
                  {event.date}
                </p>
                <div>
                  <h3
                    className="text-xl mb-3"
                    style={{
                      fontFamily: tokens.headingFont,
                      color: tokens.headingColor,
                    }}
                  >
                    {event.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-lg"
                    style={{ color: mutedColor }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] mb-3"
            style={{ color: tokens.bodyColor }}
          >
            02
          </p>
          <h2
            className="text-4xl md:text-5xl mb-12"
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
          >
            Event Details
          </h2>
          <div
            className="grid md:grid-cols-2 gap-px"
            style={{ backgroundColor: tokens.headingColor }}
          >
            {/* Ceremony */}
            <div className="p-6" style={{ backgroundColor: tokens.background }}>
              <p
                className="text-[9px] tracking-[0.3em] mb-5"
                style={{ color: mutedColor }}
              >
                THE CEREMONY
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={16}
                    style={{ color: tokens.headingColor }}
                    className="mt-0.5"
                  />
                  <div>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: tokens.headingFont,
                        color: tokens.headingColor,
                      }}
                    >
                      June 15, 2025
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      Saturday
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    size={16}
                    style={{ color: tokens.headingColor }}
                    className="mt-0.5"
                  />
                  <div>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: tokens.headingFont,
                        color: tokens.headingColor,
                      }}
                    >
                      4:00 PM
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      Doors open at 3:30 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    style={{ color: tokens.headingColor }}
                    className="mt-0.5"
                  />
                  <div>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: tokens.headingFont,
                        color: tokens.headingColor,
                      }}
                    >
                      The Grove Estate
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      4521 Magnolia Drive
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      Charleston, SC 29401
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Reception */}
            <div className="p-6" style={{ backgroundColor: tokens.background }}>
              <p
                className="text-[9px] tracking-[0.3em] mb-5"
                style={{ color: mutedColor }}
              >
                THE RECEPTION
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock
                    size={16}
                    style={{ color: tokens.headingColor }}
                    className="mt-0.5"
                  />
                  <div>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: tokens.headingFont,
                        color: tokens.headingColor,
                      }}
                    >
                      6:00 PM — Late
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      Dinner, drinks & dancing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    style={{ color: tokens.headingColor }}
                    className="mt-0.5"
                  />
                  <div>
                    <p
                      className="text-base"
                      style={{
                        fontFamily: tokens.headingFont,
                        color: tokens.headingColor,
                      }}
                    >
                      Grand Ballroom
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      Same venue
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="mt-6 px-5 py-2 text-[9px] tracking-[0.2em] hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: tokens.primary,
                  color: tokens.primaryForeground,
                }}
              >
                VIEW ON MAP →
              </button>
            </div>
          </div>
          {/* Dress Code */}
          <div
            className="mt-px"
            style={{ backgroundColor: tokens.headingColor }}
          >
            <div className="p-6" style={{ backgroundColor: tokens.background }}>
              <p
                className="text-[9px] tracking-[0.3em] mb-3"
                style={{ color: mutedColor }}
              >
                DRESS CODE
              </p>
              <p
                className="text-xl"
                style={{
                  fontFamily: tokens.headingFont,
                  color: tokens.headingColor,
                }}
              >
                Black Tie Optional
              </p>
              <p className="text-sm mt-1" style={{ color: mutedColor }}>
                Formal attire encouraged. Dark colors welcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] mb-3"
            style={{ color: tokens.bodyColor }}
          >
            03
          </p>
          <h2
            className="text-4xl md:text-5xl mb-12"
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
          >
            Gallery
          </h2>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-px"
            style={{ backgroundColor: tokens.headingColor }}
          >
            {galleryImages.slice(0, 6).map((img, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden"
                style={{ backgroundColor: tokens.background }}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        className="py-16 px-4 border-b-2"
        style={{ backgroundColor: tokens.primary, borderColor: tokens.primary }}
      >
        <div
          className="max-w-xl mx-auto"
          style={{ color: tokens.primaryForeground }}
        >
          <p className="text-[9px] tracking-[0.3em] mb-3 opacity-60">04</p>
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: tokens.headingFont }}
          >
            RSVP
          </h2>
          <p className="text-base mb-10 opacity-80">
            Please respond by May 1st, 2025
          </p>
          <div
            className="border-2 p-6"
            style={{ borderColor: tokens.primaryForeground }}
          >
            <p className="text-[9px] tracking-[0.3em] mb-6 opacity-60">
              YOUR RESPONSE
            </p>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] mb-2 opacity-60">
                    FULL NAME
                  </label>
                  <div
                    className="border-b-2 py-2 opacity-40"
                    style={{ borderColor: tokens.primaryForeground }}
                  >
                    Your name
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] mb-2 opacity-60">
                    EMAIL
                  </label>
                  <div
                    className="border-b-2 py-2 opacity-40"
                    style={{ borderColor: tokens.primaryForeground }}
                  >
                    your@email.com
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] mb-3 opacity-60">
                  WILL YOU ATTEND?
                </label>
                <div className="flex gap-6 text-sm">
                  <span className="opacity-80">○ Joyfully Accept</span>
                  <span className="opacity-80">○ Regretfully Decline</span>
                </div>
              </div>
              <button
                className="w-full py-3 text-[9px] tracking-[0.2em] hover:opacity-80 transition-opacity mt-4"
                style={{
                  backgroundColor: tokens.primaryForeground,
                  color: tokens.primary,
                }}
              >
                SUBMIT RSVP
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] mb-3"
            style={{ color: tokens.bodyColor }}
          >
            05
          </p>
          <h2
            className="text-4xl md:text-5xl mb-12"
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
          >
            FAQ
          </h2>
          <div
            className="divide-y-2 border-t-2"
            style={{ borderColor: tokens.headingColor }}
          >
            {tokens.faqs.map((faq, index) => (
              <div key={index} style={{ borderColor: tokens.headingColor }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-4 flex items-center justify-between text-left"
                >
                  <span
                    className="text-base pr-4"
                    style={{
                      fontFamily: tokens.headingFont,
                      color: tokens.headingColor,
                    }}
                  >
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <Minus size={16} style={{ color: tokens.headingColor }} />
                  ) : (
                    <Plus size={16} style={{ color: tokens.headingColor }} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="pb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: mutedColor }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] mb-3"
            style={{ color: tokens.bodyColor }}
          >
            06
          </p>
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: tokens.headingFont,
              color: tokens.headingColor,
            }}
          >
            Registry
          </h2>
          <p className="text-sm mb-12 max-w-lg" style={{ color: mutedColor }}>
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we have registered at the
            following places.
          </p>
          <div className="space-y-0">
            {tokens.registries.map((registry, index) => {
              const hasLink = registry.link && registry.link.trim() !== "";
              const Wrapper = hasLink ? "a" : "div";
              const wrapperProps = hasLink
                ? {
                    href: registry.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <Wrapper
                  key={index}
                  {...wrapperProps}
                  className={`border-t-2 py-6 flex items-center justify-between group ${
                    hasLink ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{ borderColor: tokens.headingColor }}
                >
                  <div>
                    <h3
                      className="text-[10px] tracking-[0.2em] mb-1"
                      style={{ color: tokens.headingColor }}
                    >
                      {registry.name}
                    </h3>
                    <p className="text-sm" style={{ color: mutedColor }}>
                      {registry.description}
                    </p>
                  </div>
                  {hasLink && (
                    <ExternalLink
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: tokens.headingColor }}
                    />
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Upload Section */}
      <section
        className="py-16 px-4 border-b-2"
        style={{ borderColor: tokens.headingColor }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p
                className="text-[9px] tracking-[0.3em] opacity-50 mb-3"
                style={{ color: tokens.bodyColor }}
              >
                09
              </p>
              <h2
                className="text-4xl md:text-5xl mb-6"
                style={{
                  fontFamily: tokens.headingFont,
                  color: tokens.headingColor,
                }}
              >
                SHARE YOUR
                <br />
                MOMENTS
              </h2>
              <p
                className="text-sm leading-relaxed max-w-md"
                style={{ color: mutedColor }}
              >
                Capture the day through your eyes. Upload the photos you take at
                our wedding—candid moments, dance floor chaos, tearful speeches.
              </p>
              <p className="text-sm mt-3" style={{ color: mutedColor }}>
                No account needed. Just point, shoot, and share.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div
                className="border-2 p-10 flex flex-col items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ borderColor: tokens.headingColor }}
              >
                <Camera
                  size={36}
                  strokeWidth={1}
                  style={{ color: tokens.headingColor }}
                />
                <span
                  className="text-[9px] tracking-[0.3em]"
                  style={{ color: tokens.headingColor }}
                >
                  VIEW & UPLOAD PHOTOS
                </span>
              </div>
              <p
                className="text-[9px] tracking-[0.2em] mt-4 text-center md:text-right"
                style={{ color: mutedColor }}
              >
                SCAN THE QR CODE
                <br />
                AT YOUR TABLE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className="py-16 px-4"
        style={{
          backgroundColor: tokens.primary,
          color: tokens.primaryForeground,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: tokens.headingFont }}
          >
            See you there
          </h2>
          <p className="text-[9px] tracking-[0.3em] opacity-60 mb-12">
            JUNE 15, 2025
          </p>
          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderColor: tokens.primaryForeground + "33" }}
          >
            <p className="text-[9px] tracking-[0.2em] opacity-60">
              EMMA & JAMES
            </p>
            <p className="text-[9px] tracking-[0.2em] opacity-60">
              #EMMAJAMES2025
            </p>
            <p className="text-[9px] tracking-[0.2em] opacity-60">WITH LOVE</p>
          </div>
          <div
            className="border-t mt-6 pt-6"
            style={{ borderColor: tokens.primaryForeground + "33" }}
          >
            <div className="inline-flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <p className="text-[8px] tracking-[0.3em] uppercase">
                Made for free with
              </p>
              <span className="text-xs tracking-[0.15em] font-medium">
                MARRIEDNEXT.COM
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
