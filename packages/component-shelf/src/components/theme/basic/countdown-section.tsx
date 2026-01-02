"use client";

import { useCountdown } from "../../../hooks";
import type { CountdownSectionProps } from "./types";

const getDefaultEventDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date.toISOString();
};

const defaultCustomization = {
  pretextLabel: "COUNTING DOWN",
  daysLabel: "DAYS",
  hoursLabel: "HOURS",
  minutesLabel: "MINUTES",
  secondsLabel: "SECONDS",
};

export function CountdownSection({
  data,
  customization = defaultCustomization,
}: CountdownSectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const eventDate = data.eventDate || getDefaultEventDate();

  const { timeUnits } = useCountdown({
    targetDate: eventDate,
    labels: {
      days: labels.daysLabel,
      hours: labels.hoursLabel,
      minutes: labels.minutesLabel,
      seconds: labels.secondsLabel,
    },
  });

  return (
    <section className="py-24 md:py-32 px-4 border-b-2 border-foreground">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-12 md:mb-16 text-center">
          {labels.pretextLabel}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground">
          {timeUnits.map((unit) => (
            <div
              key={unit.key}
              className="bg-background p-8 md:p-12 text-center"
            >
              <span className="font-serif text-5xl md:text-7xl lg:text-8xl block">
                {unit.formatted}
              </span>
              <span className="text-xs tracking-[0.2em] mt-4 block text-muted-foreground">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
