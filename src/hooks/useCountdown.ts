"use client";

import { useState, useEffect } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEventDay: boolean;
  isOver: boolean;
}

export function useCountdown(targetDate: Date, endDate: Date): CountdownValues {
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEventDay: false,
    isOver: false,
  });

  useEffect(() => {
    function calculate() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const endDiff = endDate.getTime() - now.getTime();

      if (endDiff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isEventDay: false, isOver: true });
        return;
      }

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isEventDay: true, isOver: false });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isEventDay: false,
        isOver: false,
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate, endDate]);

  return countdown;
}
