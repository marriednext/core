"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCountdown } from "../../../hooks";

interface CountdownSectionProps {
  targetDate: Date;
}

export function CountdownSection({ targetDate }: CountdownSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  const { timeUnits } = useCountdown({ targetDate });

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
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-muted">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <p
          className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground mb-12"
          data-animate="fade-up"
        >
          Until we say "I do"
        </p>

        <div
          ref={numbersRef}
          className="flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          {timeUnits.map((unit, index) => (
            <div key={unit.key} className="text-center">
              <div className="font-serif text-[clamp(4rem,10vw,10rem)] leading-none text-foreground">
                {unit.formatted}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {unit.label}
              </div>
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
  );
}
