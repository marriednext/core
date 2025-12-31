"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { NavigationProps, NavLink } from "./types";

const defaultNavLinks: NavLink[] = [
  { href: "#story", label: "OUR STORY" },
  { href: "#event", label: "EVENT" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
  { href: "#registry", label: "REGISTRY" },
  { href: "#photos", label: "PHOTOS" },
];

const defaultCustomization = {
  logoLabel: "E & J",
  navLinks: defaultNavLinks,
};

export function Navigation({
  customization = defaultCustomization,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const labels = { ...defaultCustomization, ...customization };
  const navLinks = labels.navLinks || defaultNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background border-b-2 border-foreground"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-serif text-xl md:text-2xl tracking-tight">
            {labels.logoLabel}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] hover:opacity-50 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b-2 border-foreground">
          <div className="px-4 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xs tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
