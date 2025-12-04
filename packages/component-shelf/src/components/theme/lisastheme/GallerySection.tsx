"use client";

import "style-shelf/tailwind";
import labels from "label-shelf/lisastheme";
import type {
  GalleryImage,
  GallerySectionCustomization,
  GallerySectionProps,
} from "./types";
import { EditableLabel } from "../../ui/editable-label";

const defaultImages: GalleryImage[] = [
  { src: "/romantic-couple-portrait-engagement.jpg", span: "row-span-2" },
  { src: "/couple-laughing-candid-moment.jpg", span: "" },
  { src: "/couple-holding-hands-closeup.jpg", span: "" },
  { src: "/couple-sunset-silhouette-romantic.jpg", span: "col-span-2" },
  { src: "/couple-adventure-hiking-together.jpg", span: "" },
  { src: "/engagement-ring-proposal-moment.jpg", span: "row-span-2" },
  { src: "/couple-cooking-kitchen.png", span: "" },
  { src: "/romantic-dance.png", span: "" },
];

const defaultGalleryLabels = {
  pretitleLabel: labels["lisastheme.moments.pretitle.label"],
  titleLabel: labels["lisastheme.moments.title.label"],
  imageAltLabel: labels["lisastheme.moments.image.alt.label"],
};

export function GallerySection({
  data,
  customization,
  editable = false,
  onCustomizationChange,
}: GallerySectionProps) {
  const mergedCustomization = {
    ...defaultGalleryLabels,
    ...customization,
  };
  const images = data?.images ?? defaultImages;

  const handleChange = (
    key: keyof GallerySectionCustomization,
    value: string
  ) => {
    onCustomizationChange?.(key, value);
  };

  return (
    <section id="gallery" className="py-32 bg-[#f5f3eb]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {mergedCustomization.pretitleLabel && (
            <EditableLabel
              as="p"
              value={mergedCustomization.pretitleLabel}
              editable={editable}
              onChange={(v) => handleChange("pretitleLabel", v)}
              className="text-[#745656] tracking-[0.4em] uppercase text-sm mb-4"
            />
          )}
          {mergedCustomization.titleLabel && (
            <EditableLabel
              as="h2"
              value={mergedCustomization.titleLabel}
              editable={editable}
              onChange={(v) => handleChange("titleLabel", v)}
              className="font-serif text-5xl md:text-6xl text-[#2c2c2c] font-light italic"
            />
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`overflow-hidden group cursor-pointer ${
                image?.span ?? ""
              }`}
            >
              <img
                src={image?.src || "/placeholder.svg"}
                alt={`${mergedCustomization.imageAltLabel} ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
