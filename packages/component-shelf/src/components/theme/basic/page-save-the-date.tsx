"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, Share2, Download, Check } from "lucide-react";
import type {
  ApplicationImageComponent,
  ApplicationLinkComponent,
} from "./types";

export interface PageSaveTheDateData {
  nameA: string | null;
  nameB: string | null;
  eventDate?: string | null;
  eventTime?: string | null;
  locationName?: string | null;
  locationCity?: string | null;
  locationState?: string | null;
  heroImageUrl?: string;
}

export interface PageSaveTheDateCustomization {
  pretitleLabel?: string;
  dateSectionLabel?: string;
  timeLabel?: string;
  countdownLabel?: string;
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  secondsLabel?: string;
  venueSectionLabel?: string;
  addToCalendarLabel?: string;
  shareLabel?: string;
  linkCopiedLabel?: string;
  noteLabel?: string;
  hashtag?: string;
}

export interface PageSaveTheDateProps {
  data: PageSaveTheDateData;
  customization?: PageSaveTheDateCustomization;
  ImageComponent?: ApplicationImageComponent;
  LinkComponent?: ApplicationLinkComponent;
}

const defaultCustomization: PageSaveTheDateCustomization = {
  pretitleLabel: "Save the Date",
  dateSectionLabel: "The Date",
  timeLabel: "Four O'Clock in the Afternoon",
  countdownLabel: "Counting Down",
  daysLabel: "Days",
  hoursLabel: "Hours",
  minutesLabel: "Minutes",
  secondsLabel: "Seconds",
  venueSectionLabel: "The Venue",
  addToCalendarLabel: "Add to Calendar",
  shareLabel: "Share",
  linkCopiedLabel: "Link Copied",
  noteLabel:
    "Formal invitation to follow. We can't wait to celebrate with you!",
  hashtag: "#Wedding2025",
};

export function PageSaveTheDate({
  data,
  customization = defaultCustomization,
  ImageComponent = "img",
}: PageSaveTheDateProps) {
  const labels = { ...defaultCustomization, ...customization };
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = data.eventDate ? new Date(data.eventDate) : null;

  useEffect(() => {
    if (!weddingDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const handleShare = async () => {
    const shareTitle = `Save the Date - ${data.nameA} & ${data.nameB}`;
    const shareText = `We're getting married! ${displayDate}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      });
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCalendar = () => {
    if (!weddingDate) return;

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const endDate = new Date(weddingDate);
    endDate.setHours(endDate.getHours() + 7);

    const locationString = [
      data.locationName,
      data.locationCity,
      data.locationState,
    ]
      .filter(Boolean)
      .join(", ");

    const event = {
      title: `${data.nameA} & ${data.nameB} Wedding`,
      start: formatDate(weddingDate),
      end: formatDate(endDate),
      location: locationString,
      description: "Join us as we celebrate our love",
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "save-the-date.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  const displayDate = weddingDate
    ? weddingDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const countdownItems = [
    { value: timeLeft.days, label: labels.daysLabel },
    { value: timeLeft.hours, label: labels.hoursLabel },
    { value: timeLeft.minutes, label: labels.minutesLabel },
    { value: timeLeft.seconds, label: labels.secondsLabel },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {data.heroImageUrl && (
        <section className="relative h-[50vh] md:h-[60vh] border-b-2 border-foreground">
          <ImageComponent
            src={data.heroImageUrl}
            alt={`${data.nameA} and ${data.nameB}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-foreground mb-2 drop-shadow-lg">
                {labels.pretitleLabel}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none">
              {data.nameA || "Partner"}
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px bg-foreground flex-1 max-w-[100px]" />
              <Heart className="w-5 h-5" strokeWidth={1} />
              <div className="h-px bg-foreground flex-1 max-w-[100px]" />
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none">
              {data.nameB || "Partner"}
            </h1>
          </div>

          {displayDate && (
            <div className="border-y-2 border-foreground py-8 mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Calendar className="w-5 h-5" strokeWidth={1} />
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {labels.dateSectionLabel}
                </p>
              </div>
              <p className="font-serif text-3xl md:text-4xl">{displayDate}</p>
              {labels.timeLabel && (
                <p className="font-sans text-sm text-muted-foreground mt-2">
                  {labels.timeLabel}
                </p>
              )}
            </div>
          )}

          {weddingDate && (
            <div className="mb-8">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                {labels.countdownLabel}
              </p>
              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
                {countdownItems.map((item) => (
                  <div
                    key={item.label}
                    className="border-2 border-foreground p-3 md:p-4"
                  >
                    <p className="font-serif text-2xl md:text-4xl">
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(data.locationName || data.locationCity) && (
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-2">
                <MapPin className="w-5 h-5" strokeWidth={1} />
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {labels.venueSectionLabel}
                </p>
              </div>
              {data.locationName && (
                <p className="font-serif text-xl md:text-2xl">
                  {data.locationName}
                </p>
              )}
              {(data.locationCity || data.locationState) && (
                <p className="font-sans text-sm text-muted-foreground">
                  {[data.locationCity, data.locationState]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {weddingDate && (
              <button
                onClick={handleAddToCalendar}
                className="flex items-center gap-2 border-2 border-foreground px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto justify-center"
              >
                <Download className="w-4 h-4" />
                {labels.addToCalendarLabel}
              </button>
            )}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-foreground text-background px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors w-full sm:w-auto justify-center"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  {labels.linkCopiedLabel}
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  {labels.shareLabel}
                </>
              )}
            </button>
          </div>

          {labels.noteLabel && (
            <p className="font-sans text-sm text-muted-foreground mt-12 max-w-sm mx-auto">
              {labels.noteLabel}
            </p>
          )}
        </div>
      </section>

      <footer className="border-t-2 border-foreground py-6">
        <div className="text-center">
          <p className="font-sans text-xs text-muted-foreground">
            {labels.hashtag}
          </p>
        </div>
      </footer>
    </main>
  );
}
