import type { OurStorySectionProps, Milestone } from "./types";

const defaultMilestones: Milestone[] = [
  {
    date: "SEPTEMBER 2018",
    title: "First Meeting",
    description:
      "We met at a mutual friend's art exhibition in Brooklyn. Emma spilled red wine on James's white shirt.",
  },
  {
    date: "DECEMBER 2018",
    title: "First Date",
    description:
      "After weeks of texting, we finally met for coffee that turned into dinner that turned into watching the sunrise.",
  },
  {
    date: "MARCH 2021",
    title: "Moving In",
    description:
      "We found a small apartment with a fire escape perfect for morning coffee. It was perfect.",
  },
  {
    date: "OCTOBER 2024",
    title: "The Proposal",
    description:
      "On a hike through the mountains, James nervously dropped the ring twice. She said yes before he finished asking.",
  },
];

const defaultCustomization = {
  sectionNumberLabel: "01",
  titleLabel: "Our Story",
};

export function OurStorySection({
  data,
  customization = defaultCustomization,
}: OurStorySectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const milestones = data.milestones && data.milestones.length > 0 ? data.milestones : defaultMilestones;

  return (
    <section id="story" className="py-24 md:py-32 px-4 border-b-2 border-foreground">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-4">
          {labels.sectionNumberLabel}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl mb-16 md:mb-24">
          {labels.titleLabel}
        </h2>

        <div className="space-y-0">
          {milestones.map((event, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-12 border-t-2 border-foreground first:border-t-0"
            >
              <p className="text-xs tracking-[0.2em] text-muted-foreground">
                {event.date}
              </p>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl mb-4">
                  {event.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
