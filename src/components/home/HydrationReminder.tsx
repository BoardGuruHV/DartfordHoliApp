"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { EVENT_DATE, EVENT_END } from "@/lib/constants";

const REMINDER_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

export function HydrationReminder() {
  const [enabled, setEnabled] = useLocalStorage("holi-hydration-reminders", false);
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unsupported">("default");
  const [lastReminder, setLastReminder] = useState<number>(0);
  const [waterCount, setWaterCount] = useLocalStorage("holi-water-count", 0);

  // Check if Notification API is available
  useEffect(() => {
    if (!("Notification" in window)) {
      setPermissionState("unsupported");
    } else {
      setPermissionState(Notification.permission);
    }
  }, []);

  const sendReminder = useCallback(() => {
    if (Notification.permission === "granted") {
      new Notification("💧 Time to Hydrate!", {
        body: "Stay hydrated at the Holi Festival! Grab some water from the nearest water station.",
        icon: "/icons/icon-192.png",
        tag: "hydration-reminder",
      });
    }
  }, []);

  // Set up the reminder interval
  useEffect(() => {
    if (!enabled || permissionState !== "granted") return;

    const now = new Date();
    const eventStart = new Date(EVENT_DATE);
    const eventEnd = new Date(EVENT_END);

    // Only send reminders during event hours
    if (now < eventStart || now > eventEnd) return;

    const interval = setInterval(() => {
      const current = new Date();
      if (current >= eventStart && current <= eventEnd) {
        sendReminder();
        setLastReminder(Date.now());
      }
    }, REMINDER_INTERVAL_MS);

    // Send first reminder after 30 mins
    return () => clearInterval(interval);
  }, [enabled, permissionState, sendReminder]);

  const handleEnable = async () => {
    if (permissionState === "unsupported") return;

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);
      if (permission === "granted") {
        setEnabled(true);
        // Send a test notification
        new Notification("💧 Hydration Reminders On!", {
          body: "You'll get a reminder every 30 minutes during the festival to stay hydrated.",
          icon: "/icons/icon-192.png",
          tag: "hydration-setup",
        });
      }
    } else if (Notification.permission === "granted") {
      setEnabled(true);
    }
  };

  const handleDisable = () => {
    setEnabled(false);
  };

  // Don't show on unsupported browsers
  if (permissionState === "unsupported") return null;

  return (
    <div className="px-4">
      <Card className="border-blue-400/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl shrink-0">💧</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm">Hydration Reminders</h3>
              <p className="text-xs text-white/50 mt-0.5">
                {enabled
                  ? "Active — reminding you every 30 mins"
                  : "Get notified to drink water during the festival"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={enabled ? "secondary" : "primary"}
            onClick={enabled ? handleDisable : handleEnable}
          >
            {enabled ? "Off" : "On"}
          </Button>
        </div>

        {permissionState === "denied" && (
          <p className="text-xs text-red-400/70 mt-2 pt-2 border-t border-white/5">
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        )}

        {/* Water intake tracker */}
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">Water intake today</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWaterCount((c) => Math.max(0, c - 1))}
                className="w-7 h-7 rounded-full bg-white/5 text-white/60 text-sm flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Remove one glass"
              >
                −
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {waterCount} 💧
              </span>
              <button
                onClick={() => setWaterCount((c) => c + 1)}
                className="w-7 h-7 rounded-full bg-holi-purple/30 text-white text-sm flex items-center justify-center hover:bg-holi-purple/50 transition-colors"
                aria-label="Add one glass"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (waterCount / 8) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-white/30 mt-1 text-right">{waterCount}/8 glasses</p>
        </div>
      </Card>
    </div>
  );
}
