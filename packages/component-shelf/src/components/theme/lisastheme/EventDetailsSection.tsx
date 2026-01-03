import "style-shelf/tailwind";
import { MapPin, Clock, Sparkles } from "lucide-react";
import { labels } from "./labels";
import type {
  EventDetailsSectionCustomization,
  EventDetailsSectionProps,
} from "./types";
import clsx from "clsx";
import { EditableLabel } from "../../ui/editable-label";

const defaultEventDetailsLabels = {
  headingPretextLabel: labels["lisastheme.details.pretitle.label"],
  headingLabel: labels["lisastheme.details.title.label"],
  ceremonyHeadingLabel: labels["lisastheme.details.ceremony.title.label"],
  ceremonyDescriptionLabel: labels["lisastheme.details.ceremony.text.label"],
  venueHeadingLabel: labels["lisastheme.details.venue.title.label"],
  viewMapLabel: labels["lisastheme.details.venue.button.label"],
  celebrationHeadingLabel: labels["lisastheme.details.celebration.title.label"],
  celebrationDescriptionLabel:
    labels["lisastheme.details.celebration.text.1.label"],
  celebrationAttireLabel: labels["lisastheme.details.celebration.text.2.label"],
  dressCodeSectionLabel: labels["lisastheme.details.dresscode.pretitle.label"],
  dressCodeValueLabel: labels["lisastheme.details.dresscode.title.label"],
  dressCodeNoteLabel: labels["lisastheme.details.dresscode.text.label"],
};

export function EventDetailsSection({
  data,
  customization,
  editable = false,
  onCustomizationChange,
}: EventDetailsSectionProps) {
  const mergedCustomization = {
    ...defaultEventDetailsLabels,
    ...customization,
  };
  const formattedTime = data?.eventTime || "4:00 PM";
  const addressLines = data?.locationAddress?.split("\n") || [];

  const handleChange = (
    key: keyof EventDetailsSectionCustomization,
    value: string
  ) => {
    onCustomizationChange?.(key, value);
  };

  return (
    <section id="details" className="py-32 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          {mergedCustomization.headingPretextLabel && (
            <EditableLabel
              as="p"
              value={mergedCustomization.headingPretextLabel}
              editable={editable}
              onChange={(v) => handleChange("headingPretextLabel", v)}
              className="text-[#745656] tracking-[0.4em] uppercase text-sm mb-4"
            />
          )}
          {mergedCustomization.headingLabel && (
            <EditableLabel
              as="h2"
              value={mergedCustomization.headingLabel}
              editable={editable}
              onChange={(v) => handleChange("headingLabel", v)}
              className="font-serif text-5xl md:text-6xl text-[#2c2c2c] font-light italic"
            />
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-[#745656]/30 rounded-full mb-6">
              <Sparkles className="w-6 h-6 text-[#745656]" />
            </div>
            {mergedCustomization.ceremonyHeadingLabel && (
              <EditableLabel
                as="h3"
                value={mergedCustomization.ceremonyHeadingLabel}
                editable={editable}
                onChange={(v) => handleChange("ceremonyHeadingLabel", v)}
                className="font-serif text-2xl text-[#2c2c2c] mb-4 italic"
              />
            )}
            {mergedCustomization.ceremonyDescriptionLabel && (
              <EditableLabel
                as="p"
                value={mergedCustomization.ceremonyDescriptionLabel}
                editable={editable}
                onChange={(v) => handleChange("ceremonyDescriptionLabel", v)}
                className="text-[#2c2c2c]/70 mb-6 leading-relaxed"
              />
            )}
            {formattedTime && (
              <div className="space-y-2 text-[#2c2c2c]/80">
                <p className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-[#745656]" />
                  {formattedTime}
                </p>
              </div>
            )}
          </div>

          <div
            className={clsx(
              "text-center",
              "border-x-0 md:border-x border-[#745656]/10 px-0 md:px-8"
            )}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 border border-[#745656]/30 rounded-full mb-6">
              <MapPin className="w-6 h-6 text-[#745656]" />
            </div>
            {mergedCustomization.venueHeadingLabel && (
              <EditableLabel
                as="h3"
                value={mergedCustomization.venueHeadingLabel}
                editable={editable}
                onChange={(v) => handleChange("venueHeadingLabel", v)}
                className="font-serif text-2xl text-[#2c2c2c] mb-4 italic"
              />
            )}
            <p className="text-[#2c2c2c]/70 mb-6 leading-relaxed">
              {data?.locationName}
            </p>
            <address className="not-italic text-[#2c2c2c]/80 space-y-1">
              {addressLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </address>
            {data?.mapsShareUrl && mergedCustomization.viewMapLabel && (
              <a
                href={data?.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#745656] text-sm tracking-[0.2em] uppercase border-b border-[#745656]/30 pb-1 hover:border-[#745656] transition-colors"
              >
                {mergedCustomization.viewMapLabel}
              </a>
            )}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-[#745656]/30 rounded-full mb-6">
              <span className="text-[#745656] text-xl">✦</span>
            </div>
            {mergedCustomization.celebrationHeadingLabel && (
              <EditableLabel
                as="h3"
                value={mergedCustomization.celebrationHeadingLabel}
                editable={editable}
                onChange={(v) => handleChange("celebrationHeadingLabel", v)}
                className="font-serif text-2xl text-[#2c2c2c] mb-4 italic"
              />
            )}
            {mergedCustomization.celebrationDescriptionLabel && (
              <EditableLabel
                as="p"
                value={mergedCustomization.celebrationDescriptionLabel}
                editable={editable}
                onChange={(v) => handleChange("celebrationDescriptionLabel", v)}
                className="text-[#2c2c2c]/70 mb-6 leading-relaxed"
              />
            )}
            {mergedCustomization.celebrationAttireLabel && (
              <div className="space-y-2 text-[#2c2c2c]/80">
                <EditableLabel
                  as="p"
                  value={mergedCustomization.celebrationAttireLabel}
                  editable={editable}
                  onChange={(v) => handleChange("celebrationAttireLabel", v)}
                  className="text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {(mergedCustomization.dressCodeSectionLabel ||
          mergedCustomization.dressCodeValueLabel ||
          mergedCustomization.dressCodeNoteLabel) && (
          <div className="mt-20 pt-12 border-t border-[#745656]/10 text-center">
            {mergedCustomization.dressCodeSectionLabel && (
              <EditableLabel
                as="p"
                value={mergedCustomization.dressCodeSectionLabel}
                editable={editable}
                onChange={(v) => handleChange("dressCodeSectionLabel", v)}
                className="text-[#745656] tracking-[0.3em] uppercase text-sm mb-3"
              />
            )}
            {mergedCustomization.dressCodeValueLabel && (
              <EditableLabel
                as="p"
                value={mergedCustomization.dressCodeValueLabel}
                editable={editable}
                onChange={(v) => handleChange("dressCodeValueLabel", v)}
                className="font-serif text-2xl text-[#2c2c2c] italic"
              />
            )}
            {mergedCustomization.dressCodeNoteLabel && (
              <EditableLabel
                as="p"
                value={mergedCustomization.dressCodeNoteLabel}
                editable={editable}
                onChange={(v) => handleChange("dressCodeNoteLabel", v)}
                className="text-[#2c2c2c]/60 mt-3 max-w-lg mx-auto"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
