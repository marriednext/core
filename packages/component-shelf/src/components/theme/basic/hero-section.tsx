import type { HeroSectionProps, HeroSectionData } from "./types";

const getDefaultEventDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date.toISOString();
};

const defaultData: Partial<HeroSectionData> = {
  nameA: "Emma",
  nameB: "James",
  eventDate: getDefaultEventDate(),
  locationName: "The Grove Estate",
};

const defaultCustomization = {
  pretitleLabel: "WE ARE GETTING MARRIED",
  ampersandLabel: "&",
  rsvpButtonLabel: "RSVP NOW",
};

export function HeroSection({
  data: dataProp,
  customization = defaultCustomization,
  LinkComponent = "a",
}: HeroSectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const data = { ...defaultData, ...dataProp };
  const displayDate = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const locationLine = [displayDate, data.locationName]
    .filter(Boolean)
    .join(" — ");

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-28 pb-20 border-b-2 border-foreground">
      <div className="text-center max-w-4xl">
        <p className="text-xs tracking-[0.3em] mb-8 md:mb-12">
          {labels.pretitleLabel}
        </p>

        <h1 className="font-serif text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-[0.85] tracking-tight mb-8 md:mb-12">
          <span className="block">{data.nameA}</span>
          <span className="block text-3xl sm:text-4xl md:text-5xl font-sans tracking-[0.5em] my-4">
            {labels.ampersandLabel}
          </span>
          <span className="block">{data.nameB}</span>
        </h1>

        {locationLine && (
          <div className="border-t-2 border-b-2 border-foreground py-4 md:py-6 inline-block px-8 md:px-16">
            <p className="text-sm md:text-base tracking-[0.2em]">
              {locationLine.toUpperCase()}
            </p>
          </div>
        )}

        <div className="mt-12 md:mt-16">
          <LinkComponent
            href="#rsvp"
            className="inline-block bg-foreground text-background px-8 md:px-12 py-4 text-xs tracking-[0.2em] hover:bg-muted-foreground transition-colors"
          >
            {labels.rsvpButtonLabel}
          </LinkComponent>
        </div>
      </div>
    </section>
  );
}
