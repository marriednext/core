"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function RsvpSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rsvp-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
    <section ref={sectionRef} id="rsvp" className="py-32 lg:py-48 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="rsvp-content max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 block mb-4">
              Will you join us?
            </span>
            <h2 className="font-serif text-5xl lg:text-8xl">RSVP</h2>
            <p className="mt-8 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Please let us know if you'll be able to celebrate with us. We kindly ask that you respond by August 1st,
              2025.
            </p>
          </div>

          {/* Form Container - Insert your custom form component here */}
          <div className="rsvp-form-container">
            {/* 
              Custom RSVP Form Component goes here
              Replace this placeholder with your actual form component
            */}
            <div className="space-y-8">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-primary-foreground/30 py-4 text-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-primary-foreground/30 py-4 text-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b-2 border-primary-foreground/30 py-4 text-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-6">
                  Will you be attending?
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 border-2 border-primary-foreground/50 flex items-center justify-center group-hover:border-primary-foreground transition-colors">
                      <input type="radio" name="attendance" value="yes" className="sr-only peer" />
                      <div className="w-3 h-3 bg-primary-foreground scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="text-lg">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 border-2 border-primary-foreground/50 flex items-center justify-center group-hover:border-primary-foreground transition-colors">
                      <input type="radio" name="attendance" value="no" className="sr-only peer" />
                      <div className="w-3 h-3 bg-primary-foreground scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className="text-lg">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
                  Number of Guests
                </label>
                <select className="w-full bg-transparent border-b-2 border-primary-foreground/30 py-4 text-lg text-primary-foreground focus:outline-none focus:border-primary-foreground transition-colors appearance-none cursor-pointer">
                  <option value="1" className="bg-primary text-primary-foreground">
                    1 Guest
                  </option>
                  <option value="2" className="bg-primary text-primary-foreground">
                    2 Guests
                  </option>
                  <option value="3" className="bg-primary text-primary-foreground">
                    3 Guests
                  </option>
                  <option value="4" className="bg-primary text-primary-foreground">
                    4 Guests
                  </option>
                </select>
              </div>

              {/* Dietary Requirements */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
                  Dietary Requirements
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-primary-foreground/30 py-4 text-lg text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors resize-none"
                  placeholder="Please let us know of any dietary restrictions..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full md:w-auto px-16 py-5 bg-primary-foreground text-primary text-sm uppercase tracking-[0.2em] hover:bg-primary-foreground/90 transition-colors"
                >
                  Send RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
