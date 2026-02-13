"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { schedule } from "@/lib/data";
import { formatTime, getTimeFromSchedule } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import type { ScheduleItem } from "@/types";

function getNowAndNext(): { now: ScheduleItem | null; next: ScheduleItem | null; minutesUntilNext: number } {
  const currentTime = new Date();

  let now: ScheduleItem | null = null;
  let next: ScheduleItem | null = null;
  let minutesUntilNext = 0;

  for (const item of schedule) {
    const start = getTimeFromSchedule(item.time);
    const end = getTimeFromSchedule(item.endTime);

    if (currentTime >= start && currentTime <= end) {
      now = item;
    } else if (currentTime < start && !next) {
      next = item;
      minutesUntilNext = Math.ceil((start.getTime() - currentTime.getTime()) / 60000);
    }
  }

  return { now, next, minutesUntilNext };
}

export function NowUpNext() {
  const [state, setState] = useState<{ now: ScheduleItem | null; next: ScheduleItem | null; minutesUntilNext: number }>({
    now: null,
    next: null,
    minutesUntilNext: 0,
  });

  useEffect(() => {
    function update() {
      setState(getNowAndNext());
    }
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  // Only show on event day when there's something to display
  const eventDay = new Date("2025-03-08");
  const today = new Date();
  const isEventDay = today.toDateString() === eventDay.toDateString();

  if (!isEventDay || (!state.now && !state.next)) return null;

  return (
    <Link href="/schedule" className="block mx-4">
      <div className="glass-card rounded-2xl p-4 border border-holi-pink/30">
        {state.now && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-holi-pink opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-holi-pink" />
              </span>
              <span className="text-holi-pink text-xs font-bold uppercase tracking-wider">Happening Now</span>
            </div>
            <h3 className="font-bold text-lg">{state.now.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/50 text-sm">{formatTime(state.now.time)} – {formatTime(state.now.endTime)}</span>
              <Badge className={CATEGORY_COLORS[state.now.category]}>{state.now.category}</Badge>
            </div>
            <p className="text-white/40 text-xs mt-1">{state.now.location}</p>
          </div>
        )}

        {state.next && (
          <div className={state.now ? "pt-3 border-t border-white/10" : ""}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-holi-orange text-xs font-bold uppercase tracking-wider">Up Next</span>
                <h4 className="font-semibold mt-0.5">{state.next.title}</h4>
                <span className="text-white/50 text-sm">{formatTime(state.next.time)}</span>
                <span className="text-white/40 text-xs ml-2">{state.next.location}</span>
              </div>
              {state.minutesUntilNext > 0 && (
                <div className="text-right shrink-0 ml-3">
                  <div className="text-2xl font-bold gradient-text">{state.minutesUntilNext}</div>
                  <div className="text-white/40 text-xs">min</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
