"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the dress code?",
    answer:
      "We kindly request cocktail attire. Ladies, feel free to wear elegant dresses or jumpsuits. Gentlemen, suits or dress slacks with a blazer are perfect. The ceremony will be outdoors, so we recommend comfortable footwear for grass.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Due to limited space, we can only accommodate guests who have been specifically named on the invitation. Please refer to your invitation for details on your party size.",
  },
  {
    question: "Are children welcome?",
    answer:
      "While we love your little ones, we have chosen to make our wedding an adults-only celebration. We hope this gives you the opportunity to enjoy a night out!",
  },
  {
    question: "Will there be parking available?",
    answer:
      "Yes, complimentary valet parking will be available at the venue. There is also a parking lot adjacent to the venue for self-parking.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "We recommend arriving 20-30 minutes before the ceremony begins to find your seats and settle in. The ceremony will begin promptly at 4:00 PM.",
  },
  {
    question: "Is the venue wheelchair accessible?",
    answer:
      "Yes, the venue is fully wheelchair accessible. Please let us know in advance if you require any special accommodations and we will be happy to assist.",
  },
  {
    question: "Will the ceremony be indoors or outdoors?",
    answer:
      "The ceremony will take place outdoors in the vineyard garden, with the reception following indoors in the grand ballroom. In case of inclement weather, both will be held indoors.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We kindly ask that you keep your phones and cameras put away during the ceremony so you can be fully present with us. Our photographer will capture all the special moments, and we will share photos with you after the wedding.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-[#745656] mb-4">
            Questions & Answers
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2c2c2c] mb-6">
            Frequently Asked
          </h2>
          <div className="w-24 h-px bg-[#745656]/30 mx-auto" />
        </div>

        <div className="divide-y divide-[#745656]/20">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="font-serif text-xl md:text-2xl text-[#2c2c2c] group-hover:text-[#745656] transition-colors duration-300 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#745656] transition-transform duration-300 flex-shrink-0",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-out",
                  openIndex === index
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                )}
              >
                <p className="text-lg text-[#2c2c2c]/70 leading-relaxed pl-0 md:pl-0">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-[#745656]/20 text-center">
          <p className="text-lg text-[#2c2c2c]/70 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:hello@yulissaandmatthew.com"
            className="inline-flex items-center gap-2 text-[#745656] text-lg hover:underline underline-offset-4 transition-all"
          >
            Reach out to us directly
          </a>
        </div>
      </div>
    </section>
  );
}
