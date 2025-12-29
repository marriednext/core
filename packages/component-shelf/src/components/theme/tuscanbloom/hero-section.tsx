"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { ApplicationImageComponent } from "../../../types/image-types";
import heroImage from "../../../assets/romantic-tuscan-vineyard-landscape-golden-hour-oli.jpg";

interface HeroSectionProps {
  partner1: string;
  partner2: string;
  date: Date;
  location: {
    fieldPreferredLocationCity: string;
    fieldPreferredLocationCountry: string;
  };
  Image?: ApplicationImageComponent;
}

export function HeroSection({
  partner1,
  partner2,
  date,
  location,
  Image: ImageComponent = "img",
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state
      gsap.set(
        [
          titleRef.current,
          dateRef.current,
          locationRef.current,
          scrollRef.current,
        ],
        {
          opacity: 0,
          y: 40,
        }
      );
      gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });

      // Animation sequence
      tl.to(imageRef.current, { scale: 1, opacity: 1, duration: 1.5 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1")
        .to(dateRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(locationRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <ImageComponent
          src={typeof heroImage === "string" ? heroImage : (heroImage as unknown as { src: string }).src}
          alt="Tuscan landscape"
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <p
          ref={dateRef}
          className="text-primary-foreground/90 text-sm uppercase tracking-[0.3em] mb-6"
        >
          {formattedDate}
        </p>

        <h1
          ref={titleRef}
          className="font-serif text-[clamp(3rem,12vw,12rem)] leading-[0.9] text-primary-foreground tracking-tight"
        >
          <span className="block">{partner1}</span>
          <span className="block text-[0.4em] tracking-[0.3em] my-4 opacity-70">
            &
          </span>
          <span className="block">{partner2}</span>
        </h1>

        <p
          ref={locationRef}
          className="text-primary-foreground/80 text-sm uppercase tracking-[0.2em] mt-8"
        >
          {location.fieldPreferredLocationCity},{" "}
          {location.fieldPreferredLocationCountry}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-primary-foreground/60 text-xs uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/60 to-transparent" />
      </div>
    </section>
  );
}
