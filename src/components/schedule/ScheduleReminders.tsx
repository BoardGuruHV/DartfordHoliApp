"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { schedule } from "@/lib/data";
import { getTimeFromSchedule, formatTime } from "@/lib/utils";

const REMINDER_LEAD_TIME = 5 * 60 * 1000; // 5 minutes before

export function ScheduleReminders() {
  const [enabled, setEnabled] = useLocalStorage("holi-schedule-reminders", false);
  const [favourites] = useLocalStorage<string[]>("holi-favourites", []);
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unsupported">("default");
  const [scheduledCount, setScheduledCount] = useState(0);

  useEffect(() => {
    if (!("Notification" in window)) {
      setPermissionState("unsupported");
    } else {
      setPermissionState(Notification.permission);
    }
  }, []);

  const scheduleReminders = useCallback(() => {
    if (!enabled || Notification.permission !== "granted") return;

    const now = Date.now();
    let count = 0;

    favourites.forEach((favId) => {
      const item = schedule.find((s) => s.id === favId);
      if (!item) return;

      const eventTime = getTimeFromSchedule(item.time).getTime();
      const reminderTime = eventTime - REMINDER_LEAD_TIME;
      const delay = reminderTime - now;

      if (delay > 0 && delay < 8 * 60 * 60 * 1000) {
        // Only schedule if within next 8 hours
        count++;
        setTimeout(() => {
          if (Notification.permission === "granted") {
            new Notification(`⏰ ${item.title} starts in 5 minutes!`, {
              body: `${formatTime(item.time)} at ${item.location}`,
              icon: "/icons/icon-192.png",
              tag: `schedule-${item.id}`,
            });
          }
        }, delay);
      }
    });

    setScheduledCount(count);
  }, [enabled, favourites]);

  // Schedule reminders when enabled or favourites change
  useEffect(() => {
    scheduleReminders();
  }, [scheduleReminders]);

  const handleEnable = async () => {
    if (permissionState === "unsupported") return;

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);
      if (permission === "granted") {
        setEnabled(true);
        new Notification("🔔 Schedule Reminders On!", {
          body: "You'll get notified 5 minutes before your favourited events start.",
          icon: "/icons/icon-192.png",
          tag: "reminders-setup",
        });
      }
    } else if (Notification.permission === "granted") {
      setEnabled(true);
    }
  };

  if (permissionState === "unsupported") return null;
  if (favourites.length === 0) return null;

  return (
    <div className="px-4 pb-3">
      <Card className="border-holi-orange/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl shrink-0">🔔</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm">Event Reminders</h3>
              <p className="text-xs text-white/50 mt-0.5">
                {enabled
                  ? `Active — ${scheduledCount} upcoming reminder${scheduledCount !== 1 ? "s" : ""}`
                  : `Get notified 5 min before your ${favourites.length} favourited event${favourites.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={enabled ? "secondary" : "primary"}
            onClick={enabled ? () => setEnabled(false) : handleEnable}
          >
            {enabled ? "Off" : "On"}
          </Button>
        </div>

        {permissionState === "denied" && (
          <p className="text-xs text-red-400/70 mt-2 pt-2 border-t border-white/5">
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        )}
      </Card>
    </div>
  );
}
