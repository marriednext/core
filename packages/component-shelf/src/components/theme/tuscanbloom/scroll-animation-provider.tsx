"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimationProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Fade up animations for elements with data-animate="fade-up"
      gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Stagger animations for elements with data-animate="stagger"
      gsap.utils.toArray<HTMLElement>('[data-animate="stagger"]').forEach((container) => {
        const children = container.children
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Scale reveal for images with data-animate="scale-reveal"
      gsap.utils.toArray<HTMLElement>('[data-animate="scale-reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Parallax effect for elements with data-animate="parallax"
      gsap.utils.toArray<HTMLElement>('[data-animate="parallax"]').forEach((el) => {
        const speed = el.dataset.speed || "0.5"
        gsap.to(el, {
          yPercent: -30 * Number.parseFloat(speed),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Horizontal line reveal with data-animate="line-reveal"
      gsap.utils.toArray<HTMLElement>('[data-animate="line-reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Text reveal character by character with data-animate="text-reveal"
      gsap.utils.toArray<HTMLElement>('[data-animate="text-reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return <>{children}</>
}
