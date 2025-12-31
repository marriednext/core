import { Camera } from "lucide-react";
import type { PhotoUploadSectionProps } from "./types";

const defaultCustomization = {
  sectionNumberLabel: "09",
  titleLine1Label: "SHARE YOUR",
  titleLine2Label: "MOMENTS",
  descriptionLabel:
    "Capture the day through your eyes. Upload the photos you take at our wedding—candid moments, dance floor chaos, tearful speeches. Every perspective matters.",
  noAccountLabel: "No account needed. Just point, shoot, and share.",
  buttonLabel: "VIEW & UPLOAD PHOTOS",
  qrCodeLabel: "SCAN THE QR CODE\nAT YOUR TABLE",
};

export function PhotoUploadSection({
  data,
  customization = defaultCustomization,
  LinkComponent = "a",
}: PhotoUploadSectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const photosPageUrl = data?.photosPageUrl || "/photos";

  return (
    <section
      id="photos"
      className="py-24 md:py-32 border-t-2 border-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] opacity-50">
              {labels.sectionNumberLabel}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl mt-4 mb-8">
              {labels.titleLine1Label}
              <br />
              {labels.titleLine2Label}
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-md">
              {labels.descriptionLabel}
            </p>
            <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-md mt-4">
              {labels.noAccountLabel}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <LinkComponent
              href={photosPageUrl}
              className="group border-2 border-foreground p-12 md:p-16 hover:bg-foreground hover:text-background transition-colors duration-300 flex flex-col items-center gap-6"
            >
              <Camera
                size={48}
                strokeWidth={1}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-xs tracking-[0.3em]">
                {labels.buttonLabel}
              </span>
            </LinkComponent>
            <p className="text-xs tracking-[0.2em] opacity-50 mt-6 text-center md:text-right whitespace-pre-line">
              {labels.qrCodeLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
