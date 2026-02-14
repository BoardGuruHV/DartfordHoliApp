"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { EVENT_DATE, EVENT_END } from "@/lib/constants";

export function CountdownTimer() {
  const { days, hours, minutes, seconds, isEventDay, isOver } = useCountdown(EVENT_DATE, EVENT_END);

  if (isOver) {
    return (
      <div className="mx-4 glass-card rounded-2xl p-6 text-center">
        <p className="text-xl font-bold gradient-text">Thank you for celebrating with us!</p>
        <p className="text-white/60 mt-2">See you next year!</p>
      </div>
    );
  }

  if (isEventDay) {
    return (
      <div className="mx-4 glass-card rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">🎉</div>
        <p className="text-2xl font-bold gradient-text">Festival is LIVE!</p>
        <p className="text-white/60 mt-2">Happy Holi! Enjoy the celebrations!</p>
      </div>
    );
  }

  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Mins" },
    { value: seconds, label: "Secs" },
  ];

  return (
    <div className="mx-4 glass-card rounded-2xl p-6">
      <p className="text-center text-white/60 text-sm mb-4 font-medium">Countdown to Holi!</p>
      <div className="grid grid-cols-4 gap-3">
        {blocks.map((block) => (
          <div key={block.label} className="text-center">
            <div className="bg-holi-surface rounded-xl p-3">
              <span className="text-2xl font-bold gradient-text">
                {block.value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs text-white/60 mt-1 block">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
