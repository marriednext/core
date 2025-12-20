"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Gift, Home, Plane } from "lucide-react"

const registryOptions = [
  {
    icon: Gift,
    title: "Traditional Registry",
    description: "Browse our curated collection of items we've selected to help build our new home together.",
    link: "#",
    linkText: "View Registry",
  },
  {
    icon: Plane,
    title: "Honeymoon Fund",
    description:
      "Help us create unforgettable memories as we embark on our honeymoon adventure through the Greek islands.",
    link: "#",
    linkText: "Contribute",
  },
  {
    icon: Home,
    title: "Home Fund",
    description:
      "Your generous contribution will help us furnish our first home and create a beautiful space to begin our life together.",
    link: "#",
    linkText: "Contribute",
  },
]

export function RegistrySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".registry-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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

  return (
    <section ref={sectionRef} id="registry" className="py-32 lg:py-48 bg-muted">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-24" data-animate="fade-up">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-4">
            Your Presence is Our Present
          </span>
          <h2 className="font-serif text-5xl lg:text-7xl text-foreground mb-6">Registry</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
            we've created a few options to help us start our new chapter together.
          </p>
        </div>

        {/* Registry Options */}
        <div className="grid lg:grid-cols-3 gap-0 border-t border-border">
          {registryOptions.map((option, index) => (
            <div
              key={option.title}
              className={`registry-item py-12 lg:py-16 ${
                index < registryOptions.length - 1
                  ? "lg:pr-16 border-b lg:border-b-0 lg:border-r border-border"
                  : "lg:pl-16"
              } ${index > 0 && index < registryOptions.length - 1 ? "lg:px-16" : ""} ${index === 0 ? "lg:pr-16" : ""}`}
            >
              <option.icon className="w-8 h-8 text-primary mb-8" strokeWidth={1.5} />

              <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">{option.title}</h3>

              <p className="text-muted-foreground leading-relaxed mb-8">{option.description}</p>

              <a
                href={option.link}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors"
              >
                {option.linkText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
