"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("a"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <LinkComponent
            href="#"
            className="font-serif text-2xl tracking-wider text-foreground hover:text-primary transition-colors"
          >
            E & M
          </LinkComponent>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <LinkComponent
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </LinkComponent>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
