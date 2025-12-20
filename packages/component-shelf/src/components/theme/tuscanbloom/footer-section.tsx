"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Instagram, Mail, Heart } from "lucide-react";
import type { ApplicationLinkComponent } from "../../application/link-types";

interface FooterSectionProps {
  partner1: string;
  partner2: string;
  Link?: ApplicationLinkComponent;
}

export function FooterSection({
  partner1,
  partner2,
  Link: LinkComponent = "a",
}: FooterSectionProps) {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the large logo
      gsap.fromTo(
        logoRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-32 lg:py-48 bg-foreground text-primary-foreground overflow-hidden"
    >
      {/* Large Background Logo */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-serif text-[20vw] lg:text-[25vw] text-primary-foreground/5 leading-none whitespace-nowrap">
          {partner1[0]}&{partner2[0]}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Main Content */}
        <div className="text-center mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/50 mb-6">
            We can't wait to celebrate with you
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl">
            {partner1} & {partner2}
          </h2>
          <p className="mt-4 text-primary-foreground/60">
            September 20, 2025 • Fiesole, Italy
          </p>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-24">
          <a
            href="mailto:hello@elenaandmarco.com"
            className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <Mail size={18} />
            hello@elenaandmarco.com
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <Instagram size={18} />
            @elenaandmarco
          </a>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 mb-24 border-t border-primary-foreground/10 pt-12">
          {[
            { label: "Our Story", href: "#our-story" },
            { label: "Details", href: "#details" },
            { label: "Gallery", href: "#gallery" },
            { label: "RSVP", href: "#rsvp" },
            { label: "FAQ", href: "#faq" },
            { label: "Registry", href: "#registry" },
          ].map((item) => (
            <LinkComponent
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            >
              {item.label}
            </LinkComponent>
          ))}
        </div>

        {/* Bottom */}
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-xs text-primary-foreground/40">
            Made with <Heart size={12} className="text-secondary" /> for our
            favorite people
          </p>
        </div>
      </div>
    </footer>
  );
}
