"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ApplicationImageComponent } from "../../application/image-types";
import artGalleryImage from "../../../assets/couple-meeting-at-art-gallery-vintage-romantic.jpg";
import amalfiImage from "../../../assets/couple-on-italian-coastline-amalfi-romantic.jpg";
import proposalImage from "../../../assets/romantic-proposal-olive-grove-lanterns-evening.jpg";
import villaImage from "../../../assets/tuscan-villa-wedding-celebration-romantic.jpg";

gsap.registerPlugin(ScrollTrigger);

interface OurStorySectionProps {
  partner1: string;
  partner2: string;
  Image?: ApplicationImageComponent;
}

const storyMilestones = [
  {
    year: "2018",
    title: "The First Glance",
    description:
      "At a sun-drenched art gallery opening in Florence, their eyes met across a room filled with Renaissance masterpieces. Little did they know, they were about to create their own masterpiece.",
    image: artGalleryImage,
  },
  {
    year: "2019",
    title: "The First Adventure",
    description:
      "A spontaneous trip to the Amalfi Coast turned into a summer of exploration, laughter, and falling deeper in love with each passing sunset.",
    image: amalfiImage,
  },
  {
    year: "2022",
    title: "The Question",
    description:
      "Under a canopy of stars in their favorite olive grove, surrounded by the soft glow of lanterns, he asked the question that would change everything.",
    image: proposalImage,
  },
  {
    year: "2025",
    title: "Forever Begins",
    description:
      "And now, we invite you to witness the beginning of our forever, in the same beautiful Tuscan hills where our story began.",
    image: villaImage,
  },
];

export function OurStorySection({
  partner1,
  partner2,
  Image: ImageComponent = "img",
}: OurStorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontal = horizontalRef.current;
      if (!horizontal) return;

      const scrollWidth = horizontal.scrollWidth - window.innerWidth;

      gsap.to(horizontal, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate each milestone as it comes into view
      const milestones = horizontal.querySelectorAll(".milestone");
      milestones.forEach((milestone) => {
        gsap.fromTo(
          milestone.querySelector(".milestone-image"),
          { scale: 1.2, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: milestone,
              containerAnimation: gsap.getById("horizontal-scroll"),
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative overflow-hidden bg-background"
    >
      {/* Section Header - pinned */}
      <div className="absolute top-0 left-0 right-0 z-10 py-8 lg:py-12 px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-4xl lg:text-6xl text-foreground">
            Our Story
          </h2>
          <p className="hidden lg:block text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {partner1} & {partner2}
          </p>
        </div>
        <div
          className="mt-4 h-px bg-border w-full"
          data-animate="line-reveal"
        />
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={horizontalRef} className="flex h-screen pt-32 lg:pt-40">
        {storyMilestones.map((milestone, index) => (
          <div
            key={milestone.year}
            className="milestone flex-shrink-0 w-screen lg:w-[80vw] h-full flex items-center px-6 lg:px-24"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full max-w-7xl mx-auto">
              {/* Image */}
              <div
                className={`milestone-image overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <ImageComponent
                  src={milestone.image}
                  alt={milestone.title}
                  width={800}
                  height={600}
                  className="w-full h-[50vh] lg:h-[60vh] object-cover"
                />
              </div>

              {/* Content */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:order-1 lg:text-right" : ""
                }`}
              >
                <span className="font-serif text-8xl lg:text-[10rem] text-primary/20 leading-none">
                  {milestone.year}
                </span>
                <h3 className="font-serif text-3xl lg:text-5xl text-foreground mt-4 mb-6">
                  {milestone.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
