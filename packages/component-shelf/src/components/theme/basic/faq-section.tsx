"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FaqSectionProps, FaqItem } from "./types";

const defaultFaqs: FaqItem[] = [
  {
    question: "What is the dress code?",
    answer:
      "Black tie optional. Formal attire is encouraged. Dark colors are welcome.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We have reserved seating for those listed on your invitation. Please reach out if you have any questions.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, complimentary valet parking will be available at the venue. Self-parking is also available in the adjacent lot.",
  },
  {
    question: "Will there be vegetarian options?",
    answer:
      "Absolutely! We will have vegetarian, vegan, and gluten-free options available. Please note any dietary restrictions in your RSVP.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "The ceremony begins at 4:00 PM sharp. We recommend arriving by 3:30 PM to find parking and get seated.",
  },
];

const defaultCustomization = {
  sectionNumberLabel: "05",
  titleLabel: "FAQ",
};

export function FaqSection({
  data,
  customization = defaultCustomization,
}: FaqSectionProps) {
  const labels = { ...defaultCustomization, ...customization };
  const faqs = data.faqs && data.faqs.length > 0 ? data.faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-4 border-b-2 border-foreground"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] mb-4">
          {labels.sectionNumberLabel}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl mb-16 md:mb-24">
          {labels.titleLabel}
        </h2>

        <div className="divide-y-2 divide-foreground border-t-2 border-foreground">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span className="font-serif text-lg md:text-xl pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
