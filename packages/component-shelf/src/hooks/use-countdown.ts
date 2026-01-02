"use client";

import { useState, useEffect, useMemo } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeUnit {
  value: number;
  label: string;
  key: keyof TimeLeft;
  formatted: string;
}

export interface CountdownLabels {
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
}

export interface UseCountdownOptions {
  targetDate: Date | string;
  labels?: CountdownLabels;
  padNumbers?: boolean;
}

export interface UseCountdownReturn {
  timeLeft: TimeLeft;
  timeUnits: TimeUnit[];
  isComplete: boolean;
  totalSeconds: number;
}

const DEFAULT_LABELS: Required<CountdownLabels> = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
};

function calculateTimeLeft(
  targetDate: Date
): TimeLeft & { totalSeconds: number } {
  const difference = targetDate.getTime() - new Date().getTime();
  const totalSeconds = Math.max(0, Math.floor(difference / 1000));

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    totalSeconds,
  };
}

export function useCountdown({
  targetDate,
  labels = {},
  padNumbers = true,
}: UseCountdownOptions): UseCountdownReturn {
  const target = useMemo(
    () => (typeof targetDate === "string" ? new Date(targetDate) : targetDate),
    [targetDate]
  );

  const [state, setState] = useState(() => calculateTimeLeft(target));

  useEffect(() => {
    setState(calculateTimeLeft(target));

    const timer = setInterval(() => {
      setState(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  const timeUnits: TimeUnit[] = useMemo(() => {
    const keys: (keyof TimeLeft)[] = ["days", "hours", "minutes", "seconds"];
    return keys.map((key) => ({
      value: state[key],
      label: mergedLabels[key],
      key,
      formatted: padNumbers
        ? String(state[key]).padStart(2, "0")
        : String(state[key]),
    }));
  }, [state, mergedLabels, padNumbers]);

  return {
    timeLeft: {
      days: state.days,
      hours: state.hours,
      minutes: state.minutes,
      seconds: state.seconds,
    },
    timeUnits,
    isComplete: state.totalSeconds === 0,
    totalSeconds: state.totalSeconds,
  };
}
