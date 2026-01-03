"use client";

import "style-shelf/tailwind";
import { labels } from "./labels";
import { useCountdown } from "../../../hooks";
import type {
  CountdownSectionCustomization,
  CountdownSectionProps,
} from "./types";
import { EditableLabel } from "../../ui/editable-label";

const defaultCountdownLabels = {
  pretextLabel: labels["lisastheme.countdown.pretext.label"],
  daysLabel: labels["lisastheme.countdown.days.label"],
  hoursLabel: labels["lisastheme.countdown.hours.label"],
  minutesLabel: labels["lisastheme.countdown.minutes.label"],
  secondsLabel: labels["lisastheme.countdown.seconds.label"],
};

export function CountdownSection({
  data,
  customization,
  editable = false,
  onCustomizationChange,
}: CountdownSectionProps) {
  const mergedCustomization = {
    ...defaultCountdownLabels,
    ...customization,
  };

  const eventDate = data?.eventDate || "2026-07-26T07:00:00";

  const { timeUnits } = useCountdown({
    targetDate: eventDate,
    labels: {
      days: mergedCustomization.daysLabel,
      hours: mergedCustomization.hoursLabel,
      minutes: mergedCustomization.minutesLabel,
      seconds: mergedCustomization.secondsLabel,
    },
  });

  const handleChange = (
    key: keyof CountdownSectionCustomization,
    value: string
  ) => {
    onCustomizationChange?.(key, value);
  };

  return (
    <section className="@container py-32 bg-[#faf9f6]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {mergedCustomization.pretextLabel && (
          <EditableLabel
            as="p"
            value={mergedCustomization.pretextLabel}
            editable={editable}
            onChange={(v) => handleChange("pretextLabel", v)}
            className="text-[#745656] tracking-[0.4em] uppercase text-sm mb-4"
          />
        )}

        <div className="flex flex-col @md:flex-row items-center justify-center gap-8 @md:gap-16 mt-12">
          <div className="text-center">
            <span className="block font-serif text-7xl @md:text-8xl text-[#2c2c2c] font-light">
              {timeUnits[0].formatted}
            </span>
            {timeUnits[0].label && (
              <EditableLabel
                as="span"
                value={timeUnits[0].label}
                editable={editable}
                onChange={(v) => handleChange("daysLabel", v)}
                className="block mt-3 text-[#745656]/70 tracking-[0.3em] uppercase text-xs"
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-8 @md:gap-16">
            {timeUnits.slice(1).map((unit, index) => (
              <div key={unit.key} className="flex items-center gap-8">
                <div className="text-center">
                  <span className="block font-serif text-6xl @md:text-8xl text-[#2c2c2c] font-light">
                    {unit.formatted}
                  </span>
                  {unit.label && (
                    <EditableLabel
                      as="span"
                      value={unit.label}
                      editable={editable}
                      onChange={(v) =>
                        handleChange(
                          `${unit.key}Label` as keyof CountdownSectionCustomization,
                          v
                        )
                      }
                      className="block mt-3 text-[#745656]/70 tracking-[0.3em] uppercase text-xs"
                    />
                  )}
                </div>
                {index < timeUnits.length - 2 && (
                  <span className="text-[#745656]/30 text-4xl @md:text-5xl font-light hidden @md:block">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
