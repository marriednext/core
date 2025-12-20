"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

interface CountdownSectionProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownSection({ targetDate }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        numbersRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-muted">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <p
          className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground mb-12"
          data-animate="fade-up"
        >
          Until we say "I do"
        </p>

        <div ref={numbersRef} className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="text-center">
              <div className="font-serif text-[clamp(4rem,10vw,10rem)] leading-none text-foreground">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">{unit.label}</div>
              {index < timeUnits.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 text-4xl text-muted-foreground/30">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
