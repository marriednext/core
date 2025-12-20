"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "What is the dress code?",
    answer:
      "We invite you to embrace our Tuscan garden setting with elegant cocktail attire. Think flowing fabrics, earth tones, and comfortable shoes for the outdoor ceremony. Please avoid white or ivory, as we'd like to reserve those colors for the bride.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Due to venue capacity, we can only accommodate guests named on the invitation. If your invitation includes a plus one, their name will be listed. We appreciate your understanding.",
  },
  {
    question: "Are children welcome?",
    answer:
      "While we adore your little ones, we've decided to make this an adults-only celebration. We hope this gives you the opportunity to enjoy a night out!",
  },
  {
    question: "Will transportation be provided?",
    answer:
      "Yes! Shuttle buses will run between the recommended hotels and the venue throughout the event. Specific times and pickup locations will be shared closer to the date.",
  },
  {
    question: "What about accommodation?",
    answer:
      "We've reserved a block of rooms at Villa San Michele and Hotel Borgo di Cortefreda. Both are charming options near the venue. Booking details are available on our accommodations page.",
  },
  {
    question: "Is the venue accessible?",
    answer:
      "The ceremony and reception areas are wheelchair accessible. If you have specific accessibility needs, please reach out to us directly and we'll ensure you're comfortable.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We kindly ask that you keep your phones tucked away during the ceremony—our photographer will capture every moment. Feel free to snap away during the reception!",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "Please let us know your dietary requirements when you RSVP. Our chef will be delighted to accommodate vegetarian, vegan, gluten-free, and other dietary needs.",
  },
]

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} id="faq" className="py-32 lg:py-48 bg-background">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Header */}
          <div className="lg:sticky lg:top-32 lg:self-start" data-animate="fade-up">
            <h2 className="font-serif text-5xl lg:text-7xl text-foreground mb-6">
              Questions
              <br />& Answers
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Everything you need to know about our special day. If you don't find your answer here, please don't
              hesitate to reach out.
            </p>
            <a
              href="mailto:hello@elenaandmarco.com"
              className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item border-b border-border">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-8 flex items-start justify-between gap-8 text-left group"
                >
                  <span className="font-serif text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-1 text-primary">
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index ? "max-h-96 pb-8" : "max-h-0"
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed pr-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
