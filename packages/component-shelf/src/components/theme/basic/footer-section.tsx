import type { FooterSectionProps, FooterSectionData } from "./types";
import defaultLogoImage from "../../../assets/basic/images/logo-20-281-29.png";

const getDefaultEventDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date.toISOString();
};

const defaultData: Partial<FooterSectionData> = {
  nameA: "Emma",
  nameB: "James",
  eventDate: getDefaultEventDate(),
};

const defaultCustomization = {
  signOffLabel: "See you there",
  hashtag: "#EMMAJAMES2025",
  closingLabel: "WITH LOVE",
  madeWithLabel: "Made for free with",
  brandLabel: "MARRIEDNEXT.COM",
  logoUrl: defaultLogoImage,
};

export function FooterSection({
  data: dataProp,
  customization = defaultCustomization,
  LinkComponent = "a",
  ImageComponent = "img",
}: FooterSectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const data = { ...defaultData, ...dataProp };

  const displayDate = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const coupleNames = [data.nameA, data.nameB].filter(Boolean).join(" & ");

  return (
    <footer className="py-24 md:py-32 px-4 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8">
          {labels.signOffLabel}
        </h2>
        {displayDate && (
          <p className="text-xs tracking-[0.3em] opacity-60 mb-16">
            {displayDate.toUpperCase()}
          </p>
        )}

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {coupleNames && (
            <p className="text-xs tracking-[0.2em] opacity-60">{coupleNames}</p>
          )}
          <p className="text-xs tracking-[0.2em] opacity-60">
            {labels.hashtag}
          </p>
          <p className="text-xs tracking-[0.2em] opacity-60">
            {labels.closingLabel}
          </p>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8">
          <LinkComponent
            href="https://marriednext.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase">
              {labels.madeWithLabel}
            </p>
            <div className="flex items-center gap-2">
              <ImageComponent
                src={labels.logoUrl || defaultLogoImage}
                alt="MarriedNext logo"
                width={24}
                height={24}
                className="invert"
              />
              <span className="text-sm tracking-[0.15em] font-medium">
                {labels.brandLabel}
              </span>
            </div>
          </LinkComponent>
        </div>
      </div>
    </footer>
  );
}
