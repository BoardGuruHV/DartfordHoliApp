"use client";

import { useState } from "react";
import { schedule } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatTime, cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";
import type { ScheduleItem } from "@/types";

const categories = ["all", "ceremony", "performance", "activity", "food"] as const;

export function ScheduleTimeline() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? schedule : schedule.filter((item) => item.category === filter);

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
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-4 space-y-0">
        {filtered.map((item, index) => (
          <TimelineItem key={item.id} item={item} isLast={index === filtered.length - 1} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, isLast }: { item: ScheduleItem; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-3 h-3 rounded-full shrink-0 mt-1.5",
          item.highlight ? "bg-holi-pink" : "bg-holi-surface-light"
        )} />
        {!isLast && <div className="w-0.5 flex-1 bg-white/10 my-1" />}
      </div>

      {/* Content */}
      <div className={cn("glass-card rounded-xl p-4 mb-3 flex-1", item.highlight && "border-holi-pink/30")}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-holi-pink font-bold text-sm">{formatTime(item.time)}</span>
          <span className="text-white/30 text-xs">–</span>
          <span className="text-white/40 text-sm">{formatTime(item.endTime)}</span>
        </div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-white/60 text-sm mt-1">{item.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={CATEGORY_COLORS[item.category]}>{item.category}</Badge>
          <span className="text-white/40 text-xs">{item.location}</span>
        </div>
      </div>
    </div>
  );
}
