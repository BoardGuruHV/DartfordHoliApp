"use client";

import { useState, useEffect } from "react";
import { schedule } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatTime, cn, isCurrentEvent, isUpcoming, getTimeFromSchedule } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ShareButton } from "@/components/ui/ShareButton";
import Link from "next/link";
import type { ScheduleItem } from "@/types";

const categories = ["all", "favourites", "ceremony", "performance", "activity", "food"] as const;

export function ScheduleTimeline() {
  const [filter, setFilter] = useState<string>("all");
  const [favourites, setFavourites] = useLocalStorage<string[]>("holi-favourites", []);
  const [, setTick] = useState(0);

  // Refresh every 30s for time-aware styling
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavourite = (id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  let filtered = schedule;
  if (filter === "favourites") {
    filtered = schedule.filter((item) => favourites.includes(item.id));
  } else if (filter !== "all") {
    filtered = schedule.filter((item) => item.category === filter);
  }

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[36px]",
              filter === cat
                ? "bg-holi-pink text-white"
                : "bg-holi-surface text-white/60 hover:text-white"
            )}
          >
            {cat === "all" ? "All" : cat === "favourites" ? `My Schedule (${favourites.length})` : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty state for favourites */}
      {filter === "favourites" && filtered.length === 0 && (
        <div className="text-center py-12 px-4 text-white/40">
          <p className="text-3xl mb-2">⭐</p>
          <p className="text-sm">No favourites yet. Tap the star on any event to add it to your schedule.</p>
        </div>
      )}

      {/* Timeline */}
      <div className="px-4 space-y-0">
        {filtered.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === filtered.length - 1}
            isFavourited={favourites.includes(item.id)}
            onToggleFavourite={() => toggleFavourite(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  isLast,
  isFavourited,
  onToggleFavourite,
}: {
  item: ScheduleItem;
  isLast: boolean;
  isFavourited: boolean;
  onToggleFavourite: () => void;
}) {
  const current = isCurrentEvent(item.time, item.endTime);
  const upcoming = isUpcoming(item.time);
  const past = getTimeFromSchedule(item.endTime) < new Date();

  return (
    <div className={cn("flex gap-4", past && "opacity-50")}>
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-3 h-3 rounded-full shrink-0 mt-1.5",
          current ? "bg-holi-pink animate-pulse" : upcoming ? "bg-holi-orange" : item.highlight ? "bg-holi-pink" : "bg-holi-surface-light"
        )} />
        {!isLast && <div className="w-0.5 flex-1 bg-white/10 my-1" />}
      </div>

      {/* Content */}
      <div className={cn(
        "glass-card rounded-xl p-4 mb-3 flex-1",
        current && "border-holi-pink/50 ring-1 ring-holi-pink/20",
        upcoming && "border-holi-orange/30",
        !current && !upcoming && item.highlight && "border-holi-pink/30"
      )}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {current && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-holi-pink bg-holi-pink/15 px-1.5 py-0.5 rounded">NOW</span>
              )}
              {upcoming && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-holi-orange bg-holi-orange/15 px-1.5 py-0.5 rounded">SOON</span>
              )}
              <span className="text-holi-pink font-bold text-sm">{formatTime(item.time)}</span>
              <span className="text-white/30 text-xs">–</span>
              <span className="text-white/40 text-sm">{formatTime(item.endTime)}</span>
            </div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-white/60 text-sm mt-1">{item.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={CATEGORY_COLORS[item.category]}>{item.category}</Badge>
              <Link
                href={`/map?highlight=${encodeURIComponent(item.location)}`}
                className="text-white/40 text-xs hover:text-holi-pink transition-colors underline decoration-dotted"
                onClick={(e) => e.stopPropagation()}
              >
                {item.location}
              </Link>
            </div>
          </div>

          {/* Favourite + Share buttons */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <button
              onClick={onToggleFavourite}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
            >
              <span className="text-lg">{isFavourited ? "⭐" : "☆"}</span>
            </button>
            <ShareButton
              title={item.title}
              text={`${item.title} at ${formatTime(item.time)} — Dartford Holi Festival`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
