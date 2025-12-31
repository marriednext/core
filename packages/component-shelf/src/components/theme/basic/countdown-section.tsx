"use client";

import { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventDate = data.eventDate || getDefaultEventDate();

  useEffect(() => {
    const weddingDate = new Date(eventDate);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const countdownItems = [
    { value: timeLeft.days, label: labels.daysLabel },
    { value: timeLeft.hours, label: labels.hoursLabel },
    { value: timeLeft.minutes, label: labels.minutesLabel },
    { value: timeLeft.seconds, label: labels.secondsLabel },
  ];

  return (
    <section className="py-24 md:py-32 px-4 border-b-2 border-foreground">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-12 md:mb-16 text-center">
          {labels.pretextLabel}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground">
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="bg-background p-8 md:p-12 text-center"
            >
              <span className="font-serif text-5xl md:text-7xl lg:text-8xl block">
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-xs tracking-[0.2em] mt-4 block text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
