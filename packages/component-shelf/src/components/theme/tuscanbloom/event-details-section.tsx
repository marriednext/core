"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { MapPin, Clock, Calendar } from "lucide-react"

interface EventDetailsSectionProps {
  location: {
    fieldLocationName: string
    fieldPreferredLocationAddressLine1: string
    fieldPreferredLocationAddressLine2: string
    fieldPreferredLocationCity: string
    fieldPreferredLocationState: string
    fieldPreferredLocationZipCode: string
    fieldPreferredLocationCountry: string
  }
  ceremony: {
    time: string
    venue: string
  }
  reception: {
    time: string
    venue: string
  }
  date: Date
}

export function EventDetailsSection({ location, ceremony, reception, date }: EventDetailsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const fullAddress = `${location.fieldPreferredLocationAddressLine1}${location.fieldPreferredLocationAddressLine2 ? ", " + location.fieldPreferredLocationAddressLine2 : ""}, ${location.fieldPreferredLocationCity}, ${location.fieldPreferredLocationState} ${location.fieldPreferredLocationZipCode}, ${location.fieldPreferredLocationCountry}`

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.fieldLocationName + ", " + fullAddress)}&zoom=15`

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical lines
      gsap.fromTo(
        ".detail-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.inOut",
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
    <section ref={sectionRef} id="details" className="py-32 lg:py-48 bg-background">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-24" data-animate="fade-up">
          <h2 className="font-serif text-5xl lg:text-7xl text-foreground mb-6">The Celebration</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join us for a day of love, laughter, and new beginnings in the heart of Tuscany. We can't wait to celebrate
            with you.
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid lg:grid-cols-3 gap-0">
          {/* Date & Location */}
          <div className="relative py-12 lg:py-16 lg:pr-16" data-animate="fade-up">
            <div className="detail-line absolute top-0 right-0 w-px h-full bg-border hidden lg:block" />

            <div className="flex items-start gap-4 mb-8">
              <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Date</span>
                <p className="font-serif text-2xl text-foreground">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Venue</span>
                <p className="font-serif text-2xl text-foreground mb-2">{location.fieldLocationName}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {location.fieldPreferredLocationAddressLine1}
                  <br />
                  {location.fieldPreferredLocationAddressLine2 && (
                    <>
                      {location.fieldPreferredLocationAddressLine2}
                      <br />
                    </>
                  )}
                  {location.fieldPreferredLocationCity}, {location.fieldPreferredLocationState}{" "}
                  {location.fieldPreferredLocationZipCode}
                  <br />
                  {location.fieldPreferredLocationCountry}
                </p>
              </div>
            </div>
          </div>

          {/* Ceremony */}
          <div className="relative py-12 lg:py-16 lg:px-16 border-t lg:border-t-0 border-border" data-animate="fade-up">
            <div className="detail-line absolute top-0 right-0 w-px h-full bg-border hidden lg:block" />

            <span className="text-xs uppercase tracking-[0.3em] text-primary block mb-6">Ceremony</span>

            <h3 className="font-serif text-4xl lg:text-5xl text-foreground mb-8">{ceremony.venue}</h3>

            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-lg text-muted-foreground">{ceremony.time}</p>
            </div>

            <p className="mt-8 text-muted-foreground leading-relaxed">
              Surrounded by ancient olive trees and the gentle Tuscan breeze, we will exchange our vows in an intimate
              ceremony.
            </p>
          </div>

          {/* Reception */}
          <div className="relative py-12 lg:py-16 lg:pl-16 border-t lg:border-t-0 border-border" data-animate="fade-up">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block mb-6">Reception</span>

            <h3 className="font-serif text-4xl lg:text-5xl text-foreground mb-8">{reception.venue}</h3>

            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-lg text-muted-foreground">{reception.time}</p>
            </div>

            <p className="mt-8 text-muted-foreground leading-relaxed">
              Celebrate with us under the stars with local Tuscan cuisine, flowing wine, and dancing until the night
              fades away.
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="mt-24" data-animate="fade-up">
          <div className="h-px bg-border mb-12" />
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125"
              onLoad={() => setMapLoaded(true)}
            />
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Loading map...</p>
              </div>
            )}
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.fieldLocationName + ", " + fullAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors"
          >
            Get Directions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
