import { ArrowLeft } from "lucide-react";
import { PhotoFeed } from "./photo-feed";
import type {
  Photo,
  ApplicationLinkComponent,
  ApplicationImageComponent,
} from "./types";

export interface PagePhotosData {
  photos?: Photo[];
}

export interface PagePhotosCustomization {
  logoLabel?: string;
  backLabel?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
}

export interface PagePhotosProps {
  data: PagePhotosData;
  customization?: PagePhotosCustomization;
  backHref?: string;
  onUpload?: (files: FileList) => Promise<void>;
  LinkComponent?: ApplicationLinkComponent;
  ImageComponent?: ApplicationImageComponent;
}

const defaultCustomization: PagePhotosCustomization = {
  logoLabel: "E & J",
  backLabel: "BACK",
  titleLine1: "WEDDING",
  titleLine2: "GALLERY",
  description:
    "Every photo tells a story. Upload yours and become part of our collective memory.",
};

export function PagePhotos({
  data,
  customization = defaultCustomization,
  backHref = "/#photos",
  onUpload,
  LinkComponent = "a",
  ImageComponent = "img",
}: PagePhotosProps) {
  const labels = { ...defaultCustomization, ...customization };
  const photos = data.photos || [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <LinkComponent
              href={backHref}
              className="flex items-center gap-3 hover:opacity-50 transition-opacity"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
              <span className="text-xs tracking-[0.2em]">
                {labels.backLabel}
              </span>
            </LinkComponent>
            <span className="font-serif text-xl md:text-2xl tracking-tight">
              {labels.logoLabel}
            </span>
            <div className="w-16" />
          </div>
        </div>
      </header>

      <section className="pt-32 md:pt-40 pb-16 md:pb-24 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight">
            {labels.titleLine1}
            <br />
            {labels.titleLine2}
          </h1>
          <p className="text-sm md:text-base opacity-70 mt-8 max-w-md">
            {labels.description}
          </p>
        </div>
      </section>

      <PhotoFeed
        data={{ photos }}
        onUpload={onUpload}
        ImageComponent={ImageComponent}
      />
    </main>
  );
}
