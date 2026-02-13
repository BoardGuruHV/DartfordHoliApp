"use client";

import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { announcements as staticAnnouncements } from "@/lib/data";
import { formatTime, cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Announcement } from "@/types";

const POLL_INTERVAL = 60 * 1000; // 60 seconds

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(staticAnnouncements);
  const [lastSeen, setLastSeen] = useLocalStorage<string>("holi-announcements-last-seen", "");
  const [newCount, setNewCount] = useState(0);
  const [isPolling, setIsPolling] = useState(false);

  // Mark all as seen when page loads
  useEffect(() => {
    if (announcements.length > 0) {
      const latestId = announcements[0].id;
      // Count new announcements since last visit
      if (lastSeen) {
        const lastSeenIdx = announcements.findIndex((a) => a.id === lastSeen);
        if (lastSeenIdx > 0) {
          setNewCount(lastSeenIdx);
        }
      }
      // Mark as seen after a short delay so user sees the "NEW" badges
      const timeout = setTimeout(() => {
        setLastSeen(latestId);
        setNewCount(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [announcements, lastSeen, setLastSeen]);

  // Poll for new announcements
  const pollAnnouncements = useCallback(async () => {
    try {
      setIsPolling(true);
      // In production, this would fetch from a live endpoint:
      // const res = await fetch("/api/announcements");
      // const data = await res.json();
      // For now, use the static data (the infrastructure is ready)
      // When deployed, organizers update data/announcements.json → Vercel rebuilds → SW fetches new cache
      const res = await fetch("/announcements.json").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > announcements.length) {
          setAnnouncements(data);
          setNewCount(data.length - announcements.length);
        }
      }
    } catch {
      // Silently fail — use cached data
    } finally {
      setIsPolling(false);
    }
  }, [announcements.length]);

  // Set up polling interval
  useEffect(() => {
    const interval = setInterval(pollAnnouncements, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [pollAnnouncements]);

  return (
    <div>
      <PageHeader title="Announcements" subtitle="Latest updates from the festival" />

      <div className="px-4">
        {/* Polling indicator */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/30">
            {isPolling ? "Checking for updates..." : "Auto-refreshes every minute"}
          </p>
          <button
            onClick={pollAnnouncements}
            className="text-xs text-holi-pink hover:text-holi-pink/80 font-medium transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="space-y-3">
          {announcements.map((item, index) => {
            const isNew = index < newCount;
            return (
              <div
                key={item.id}
                className={cn(
                  "glass-card rounded-xl p-4 transition-all",
                  item.priority === "urgent" && "border-red-500/50",
                  item.priority === "important" && "border-holi-orange/50",
                  isNew && "ring-1 ring-holi-pink/30"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/50 text-sm font-medium">{formatTime(item.time)}</span>
                  {isNew && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-holi-pink bg-holi-pink/15 px-1.5 py-0.5 rounded animate-pulse">
                      NEW
                    </span>
                  )}
                  {item.priority !== "normal" && (
                    <span className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      item.priority === "urgent"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-holi-orange/20 text-orange-300 border border-orange-500/30"
                    )}>
                      {item.priority.toUpperCase()}
                    </span>
                  )}
                  <span className="text-white/30 text-xs px-2 py-0.5 bg-white/5 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.message}</p>
              </div>
            );
          })}

          {announcements.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <p className="text-4xl mb-3">📢</p>
              <p>No announcements yet. Check back during the festival!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
