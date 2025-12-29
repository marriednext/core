"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ApplicationImageComponent } from "../../../types/image-types";
import laughingImage from "../../../assets/couple-laughing-together-romantic-portrait.jpg";
import vineyardImage from "../../../assets/couple-walking-through-vineyard-sunset.jpg";
import ringImage from "../../../assets/couple-hands-holding-engagement-ring-detail.jpg";
import picnicImage from "../../../assets/couple-picnic-olive-grove-romantic.jpg";
import dancingImage from "../../../assets/couple-dancing-together-candid-romantic.jpg";
import foreheadKissImage from "../../../assets/couple-forehead-kiss-intimate-romantic.jpg";
import sunsetImage from "../../../assets/couple-watching-sunset-italian-countryside.jpg";
import silhouetteImage from "../../../assets/couple-embrace-silhouette-golden-hour.jpg";

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  Image?: ApplicationImageComponent;
}

const galleryImages = [
  {
    src: laughingImage,
    alt: "Couple portrait",
    aspect: "portrait",
  },
  {
    src: vineyardImage,
    alt: "Walking through vineyard",
    aspect: "landscape",
  },
  {
    src: ringImage,
    alt: "Ring detail",
    aspect: "square",
  },
  {
    src: picnicImage,
    alt: "Picnic together",
    aspect: "landscape",
  },
  {
    src: dancingImage,
    alt: "Dancing together",
    aspect: "portrait",
  },
  {
    src: foreheadKissImage,
    alt: "Intimate moment",
    aspect: "square",
  },
  {
    src: sunsetImage,
    alt: "Sunset view",
    aspect: "landscape",
  },
  {
    src: silhouetteImage,
    alt: "Silhouette embrace",
    aspect: "portrait",
  },
];

export function GallerySection({
  Image: ImageComponent = "img",
}: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = galleryRef.current?.querySelectorAll(".gallery-item");

      images?.forEach((image, index) => {
        gsap.fromTo(
          image,
          {
            y: index % 2 === 0 ? 100 : 150,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Parallax effect on scroll
        gsap.to(image.querySelector("img"), {
          yPercent: index % 2 === 0 ? -10 : -15,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-32 lg:py-48 bg-muted overflow-hidden"
    >
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div data-animate="fade-up">
            <h2 className="font-serif text-5xl lg:text-7xl text-foreground">
              Moments We
              <br />
              Treasure
            </h2>
          </div>
          <p
            className="text-muted-foreground max-w-md lg:text-right"
            data-animate="fade-up"
          >
            A collection of cherished memories from our journey together. Each
            photograph tells a story of love, adventure, and the life we're
            building.
          </p>
        </div>

        {/* Masonry Gallery */}
        <div
          ref={galleryRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-6"
        >
          {galleryImages.map((image, index) => {
            const src = image.src as unknown;
            const imageSrc = typeof src === "string" ? src : (src as { src: string }).src;
            return (
              <div
                key={index}
                className={`gallery-item break-inside-avoid mb-4 lg:mb-6 overflow-hidden ${
                  image.aspect === "portrait"
                    ? "aspect-[2/3]"
                    : image.aspect === "landscape"
                    ? "aspect-[3/2]"
                    : "aspect-square"
                }`}
              >
                <ImageComponent
                  src={imageSrc}
                  alt={image.alt}
                  width={900}
                  height={900}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
