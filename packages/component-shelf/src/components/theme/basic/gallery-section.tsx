import type { GallerySectionProps } from "./types";
import defaultGallery1 from "../../../assets/basic/romantic-couple-portrait-black-and-white.jpg";
import defaultGallery2 from "../../../assets/basic/couple-walking-beach-holding-hands.jpg";
import defaultGallery3 from "../../../assets/basic/couple-laughing-candid-moment.jpg";
import defaultGallery4 from "../../../assets/basic/couple-engagement-garden-photo.jpg";
import defaultGallery5 from "../../../assets/basic/couple-sunset-silhouette-romantic.jpg";
import defaultGallery6 from "../../../assets/basic/couple-intimate-portrait-close-up.jpg";

const defaultGalleryImages = [
  { src: defaultGallery1, alt: "Couple portrait" },
  { src: defaultGallery2, alt: "Couple walking on beach" },
  { src: defaultGallery3, alt: "Couple laughing" },
  { src: defaultGallery4, alt: "Engagement photo" },
  { src: defaultGallery5, alt: "Sunset silhouette" },
  { src: defaultGallery6, alt: "Intimate portrait" },
];

const defaultCustomization = {
  sectionNumberLabel: "03",
  titleLabel: "Gallery",
};

export function GallerySection({
  data,
  customization = defaultCustomization,
  ImageComponent = "img",
}: GallerySectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const images =
    data.images && data.images.length > 0 ? data.images : defaultGalleryImages;

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 px-4 border-b-2 border-foreground"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-4">
          {labels.sectionNumberLabel}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl mb-16 md:mb-24">
          {labels.titleLabel}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-foreground">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden bg-background"
            >
              <ImageComponent
                src={image.src || "/placeholder.svg"}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
