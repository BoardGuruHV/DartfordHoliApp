"use client";

import { useState } from "react";
import { foodStalls } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DIETARY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { FoodStall, DietaryLabel } from "@/types";

const allDietary: DietaryLabel[] = ["vegetarian", "vegan", "gluten-free", "halal", "nut-free", "dairy-free"];

export default function FoodPage() {
  const [filter, setFilter] = useState<DietaryLabel | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all"
    ? foodStalls
    : foodStalls.filter((stall) =>
        stall.items.some((item) => item.dietary.includes(filter))
      );

  return (
    <div>
      <PageHeader title="Food & Drink" subtitle="Delicious treats from local vendors" />

      {/* Dietary filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[36px]",
            filter === "all" ? "bg-holi-pink text-white" : "bg-holi-surface text-white/60"
          )}
        >
          All
        </button>
        {allDietary.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[36px]",
              filter === d ? "bg-holi-pink text-white" : "bg-holi-surface text-white/60"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Stall list */}
      <div className="px-4 space-y-4">
        {filtered.map((stall) => (
          <StallCard
            key={stall.id}
            stall={stall}
            isExpanded={expanded === stall.id}
            onToggle={() => setExpanded(expanded === stall.id ? null : stall.id)}
            dietaryFilter={filter}
          />
        ))}
      </div>
    </div>
  );
}

function StallCard({
  stall,
  isExpanded,
  onToggle,
  dietaryFilter,
}: {
  stall: FoodStall;
  isExpanded: boolean;
  onToggle: () => void;
  dietaryFilter: DietaryLabel | "all";
}) {
  const filteredItems = dietaryFilter === "all"
    ? stall.items
    : stall.items.filter((item) => item.dietary.includes(dietaryFilter));

  return (
    <Card>
      <button className="w-full text-left" onClick={onToggle} aria-expanded={isExpanded}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{stall.name}</h3>
            <p className="text-holi-orange text-sm">{stall.cuisine}</p>
            <p className="text-white/50 text-xs mt-1">{stall.location}</p>
          </div>
          <svg
            className={cn("w-5 h-5 text-white/40 shrink-0 transition-transform mt-1", isExpanded && "rotate-180")}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
          {filteredItems.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                {item.description && (
                  <p className="text-white/50 text-xs mt-0.5">{item.description}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.dietary.map((d) => (
                    <Badge key={d} className={DIETARY_COLORS[d]}>{d}</Badge>
                  ))}
                </div>
              </div>
              <span className="text-holi-yellow font-bold text-sm whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
