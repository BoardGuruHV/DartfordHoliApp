"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ShareButton } from "@/components/ui/ShareButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCountdown } from "@/hooks/useCountdown";
import { EVENT_DATE, EVENT_END } from "@/lib/constants";
import type { GalleryPhoto, FeedbackEntry } from "@/types";

interface ChecklistState {
  [key: string]: boolean;
}

export function HoliHighlights() {
  const countdown = useCountdown(EVENT_DATE, EVENT_END);
  const [dismissed, setDismissed] = useLocalStorage("holi-highlights-dismissed", false);
  const [favourites] = useLocalStorage<string[]>("holi-favourites", []);
  const [photos] = useLocalStorage<GalleryPhoto[]>("holi-gallery", []);
  const [feedback] = useLocalStorage<FeedbackEntry[]>("holi-feedback", []);
  const [checklist] = useLocalStorage<ChecklistState>("holi-checklist", {});
  const [waterCount] = useLocalStorage<number>("holi-water-count", 0);

  // Only show after event ends
  if (!countdown.isOver || dismissed) return null;

  const checklistTotal = Object.keys(checklist).length;
  const checklistDone = Object.values(checklist).filter(Boolean).length;
  const checklistPct = checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  const stats = [
    { icon: "⭐", label: "Events Favourited", value: favourites.length },
    { icon: "📸", label: "Photos Taken", value: photos.length },
    { icon: "💧", label: "Glasses of Water", value: waterCount },
    { icon: "✅", label: "Checklist Complete", value: `${checklistPct}%` },
  ];

  const hasActivity = favourites.length > 0 || photos.length > 0 || feedback.length > 0 || waterCount > 0;

  const shareText = [
    `My Dartford Holi Festival 2025 Highlights! 🎨🪔`,
    favourites.length > 0 ? `⭐ Favourited ${favourites.length} events` : null,
    photos.length > 0 ? `📸 Took ${photos.length} photos` : null,
    waterCount > 0 ? `💧 Drank ${waterCount} glasses of water` : null,
    `✅ ${checklistPct}% prepared`,
    feedback.length > 0 ? `⭐ Left feedback for the organisers` : null,
    `\nWhat a colourful day! #DartfordHoli #HoliFestival`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!hasActivity) return null;

  return (
    <div className="px-4">
      <Card className="border-holi-pink/30 overflow-hidden relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-holi-pink/10 via-holi-purple/10 to-holi-orange/10 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold gradient-text">My Holi Highlights</h2>
              <p className="text-xs text-white/50 mt-0.5">Your festival recap</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/30 hover:text-white/60 text-sm p-2"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-3 text-center">
                <span className="text-2xl block">{stat.icon}</span>
                <span className="text-xl font-bold block mt-1">{stat.value}</span>
                <span className="text-[11px] text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>

          {feedback.length > 0 && (
            <p className="text-xs text-white/40 text-center mb-3">
              🙏 You submitted feedback — thank you for helping us improve!
            </p>
          )}

          <div className="flex justify-center">
            <ShareButton
              title="My Dartford Holi Festival 2025 Highlights"
              text={shareText}
              size="md"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
