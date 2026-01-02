"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ApplicationLinkComponent } from "../../../types/link-types";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Our Story", href: "#our-story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
  { label: "FAQ", href: "#faq" },
  { label: "Registry", href: "#registry" },
];

interface StickyNavProps {
  Link?: ApplicationLinkComponent;
}

export function StickyNav({ Link: LinkComponent = "a" }: StickyNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`@md:block hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <LinkComponent
            href="#"
            className="font-serif text-2xl tracking-wider text-foreground hover:text-primary transition-colors"
          >
            E & M
          </LinkComponent>

          <div className="flex items-center gap-12">
            {navItems.map((item) => (
              <LinkComponent
                key={item.href}
                href={item.href}
                className="relative text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </LinkComponent>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
