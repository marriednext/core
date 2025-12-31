import { MapPin, Clock, CalendarDays } from "lucide-react";
import type {
  EventDetailsSectionProps,
  EventDetailsSectionData,
} from "./types";

const getDefaultEventDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date.toISOString();
};

const defaultData: EventDetailsSectionData = {
  eventDate: getDefaultEventDate(),
  eventTime: "4:00 PM",
  locationName: "The Grove Estate",
  locationAddressLine1: "4521 Magnolia Drive",
  locationCity: "Charleston",
  locationState: "SC",
  locationZipCode: "29401",
};

const defaultCustomization = {
  sectionNumberLabel: "02",
  titleLabel: "Event Details",
  ceremonyLabel: "THE CEREMONY",
  ceremonyDayLabel: "Saturday",
  ceremonyDoorsOpenLabel: "Doors open at 3:30 PM",
  receptionLabel: "THE RECEPTION",
  receptionTimeLabel: "6:00 PM — Late",
  receptionDescriptionLabel: "Dinner, drinks & dancing",
  receptionLocationLabel: "Grand Ballroom",
  receptionLocationNoteLabel: "Same venue",
  viewMapButtonLabel: "VIEW ON MAP →",
  dressCodeLabel: "DRESS CODE",
  dressCodeValueLabel: "Black Tie Optional",
  dressCodeNoteLabel: "Formal attire encouraged. Dark colors welcome.",
};

export function EventDetailsSection({
  data: dataProp,
  customization = defaultCustomization,
  LinkComponent = "a",
}: EventDetailsSectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const data = {
    ...defaultData,
    ...dataProp,
  };

  const fullAddress = [
    data.locationAddressLine1,
    data.locationCity,
    data.locationState,
    data.locationZipCode,
  ]
    .filter(Boolean)
    .join(", ");

  const mapsUrl =
    data.mapsShareUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddress
    )}`;

  const displayDate = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <section
      id="event"
      className="py-24 md:py-32 px-4 border-b-2 border-foreground"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-4">
          {labels.sectionNumberLabel}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl mb-16 md:mb-24">
          {labels.titleLabel}
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-foreground">
          <div className="bg-background p-8 md:p-12">
            <p className="text-xs tracking-[0.3em] mb-6 text-muted-foreground">
              {labels.ceremonyLabel}
            </p>
            <div className="space-y-6">
              {displayDate && (
                <div className="flex items-start gap-4">
                  <CalendarDays className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-serif text-xl">{displayDate}</p>
                    <p className="text-sm text-muted-foreground">
                      {labels.ceremonyDayLabel}
                    </p>
                  </div>
                </div>
              )}
              {data.eventTime && (
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-serif text-xl">{data.eventTime}</p>
                    <p className="text-sm text-muted-foreground">
                      {labels.ceremonyDoorsOpenLabel}
                    </p>
                  </div>
                </div>
              )}
              {data.locationName && (
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-serif text-xl">{data.locationName}</p>
                    {data.locationAddressLine1 && (
                      <p className="text-sm text-muted-foreground">
                        {data.locationAddressLine1}
                      </p>
                    )}
                    {data.locationAddressLine2 && (
                      <p className="text-sm text-muted-foreground">
                        {data.locationAddressLine2}
                      </p>
                    )}
                    {(data.locationCity ||
                      data.locationState ||
                      data.locationZipCode) && (
                      <p className="text-sm text-muted-foreground">
                        {[
                          data.locationCity,
                          data.locationState,
                          data.locationZipCode,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-background p-8 md:p-12">
            <p className="text-xs tracking-[0.3em] mb-6 text-muted-foreground">
              {labels.receptionLabel}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif text-xl">
                    {labels.receptionTimeLabel}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {labels.receptionDescriptionLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif text-xl">
                    {labels.receptionLocationLabel}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {labels.receptionLocationNoteLabel}
                  </p>
                </div>
              </div>
            </div>

            {fullAddress && (
              <LinkComponent
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-foreground text-background px-6 py-3 text-xs tracking-[0.2em] hover:bg-muted-foreground transition-colors"
              >
                {labels.viewMapButtonLabel}
              </LinkComponent>
            )}
          </div>
        </div>

        <div className="mt-px bg-foreground">
          <div className="bg-background p-8 md:p-12">
            <p className="text-xs tracking-[0.3em] mb-4 text-muted-foreground">
              {labels.dressCodeLabel}
            </p>
            <p className="font-serif text-2xl md:text-3xl">
              {labels.dressCodeValueLabel}
            </p>
            <p className="text-muted-foreground mt-2">
              {labels.dressCodeNoteLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
