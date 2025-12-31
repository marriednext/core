import type { RsvpSectionProps } from "./types";

const defaultCustomization = {
  sectionNumberLabel: "04",
  titleLabel: "RSVP",
  descriptionLabel: "Please respond by May 1st, 2025",
  formPretitleLabel: "YOUR RESPONSE",
  fullNameLabel: "FULL NAME",
  fullNamePlaceholder: "Your name",
  emailLabel: "EMAIL",
  emailPlaceholder: "your@email.com",
  attendanceLabel: "WILL YOU ATTEND?",
  acceptLabel: "Joyfully Accept",
  declineLabel: "Regretfully Decline",
  guestCountLabel: "NUMBER OF GUESTS",
  dietaryLabel: "DIETARY RESTRICTIONS",
  dietaryPlaceholder: "Any dietary requirements or allergies...",
  songRequestLabel: "SONG REQUEST",
  songRequestPlaceholder: "What song will get you on the dance floor?",
  submitButtonLabel: "SUBMIT RSVP",
};

export function RsvpSection({
  data,
  customization = defaultCustomization,
}: RsvpSectionProps) {
  const labels = { ...defaultCustomization, ...customization };

  if (data?.rsvpFormComponent) {
    return (
      <section
        id="rsvp"
        className="py-24 md:py-32 px-4 border-b-2 border-foreground bg-foreground text-background"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] mb-4 opacity-60">
            {labels.sectionNumberLabel}
          </p>
          <h2 className="font-serif text-5xl md:text-7xl mb-6">
            {labels.titleLabel}
          </h2>
          <p className="text-lg mb-12 opacity-80">{labels.descriptionLabel}</p>
          {data.rsvpFormComponent}
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="py-24 md:py-32 px-4 border-b-2 border-foreground bg-foreground text-background"
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-4 opacity-60">
          {labels.sectionNumberLabel}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl mb-6">
          {labels.titleLabel}
        </h2>
        <p className="text-lg mb-12 opacity-80">{labels.descriptionLabel}</p>

        <div className="border-2 border-background p-8 md:p-12">
          <p className="text-xs tracking-[0.3em] mb-8 opacity-60">
            {labels.formPretitleLabel}
          </p>

          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-[0.2em] mb-3 opacity-60">
                  {labels.fullNameLabel}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-background py-3 focus:outline-none placeholder:opacity-40"
                  placeholder={labels.fullNamePlaceholder}
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] mb-3 opacity-60">
                  {labels.emailLabel}
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b-2 border-background py-3 focus:outline-none placeholder:opacity-40"
                  placeholder={labels.emailPlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] mb-4 opacity-60">
                {labels.attendanceLabel}
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    className="w-4 h-4 accent-background"
                  />
                  <span>{labels.acceptLabel}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    className="w-4 h-4 accent-background"
                  />
                  <span>{labels.declineLabel}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] mb-3 opacity-60">
                {labels.guestCountLabel}
              </label>
              <select className="w-full bg-transparent border-b-2 border-background py-3 focus:outline-none cursor-pointer">
                <option value="1" className="text-foreground">
                  1 Guest
                </option>
                <option value="2" className="text-foreground">
                  2 Guests
                </option>
                <option value="3" className="text-foreground">
                  3 Guests
                </option>
                <option value="4" className="text-foreground">
                  4 Guests
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] mb-3 opacity-60">
                {labels.dietaryLabel}
              </label>
              <textarea
                className="w-full bg-transparent border-2 border-background p-4 focus:outline-none placeholder:opacity-40 min-h-[100px] resize-none"
                placeholder={labels.dietaryPlaceholder}
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] mb-3 opacity-60">
                {labels.songRequestLabel}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b-2 border-background py-3 focus:outline-none placeholder:opacity-40"
                placeholder={labels.songRequestPlaceholder}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-background text-foreground py-4 text-xs tracking-[0.2em] hover:opacity-80 transition-opacity mt-8"
            >
              {labels.submitButtonLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
