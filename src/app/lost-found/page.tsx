"use client";

import { useState } from "react";
import { lostFound } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId, formatTime } from "@/lib/utils";
import type { LostFoundItem } from "@/types";

export default function LostFoundPage() {
  const [localItems, setLocalItems] = useLocalStorage<LostFoundItem[]>("holi-lost-found", []);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"lost" | "found">("lost");

  const allItems = [...lostFound, ...localItems].sort((a, b) => (a.time > b.time ? -1 : 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const now = new Date();
    const item: LostFoundItem = {
      id: generateId(),
      type,
      description: description.trim(),
      location: location.trim() || "Not specified",
      time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
      resolved: false,
    };

    setLocalItems((prev) => [...prev, item]);
    setDescription("");
    setLocation("");
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Lost & Found" subtitle="Report or find lost items" />

      <div className="px-4 space-y-4">
        <Button className="w-full" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Report Lost/Found Item"}
        </Button>

        {showForm && (
          <Card>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("lost")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                    type === "lost" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-holi-surface text-white/60"
                  }`}
                >
                  I Lost Something
                </button>
                <button
                  type="button"
                  onClick={() => setType("found")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                    type === "found" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-holi-surface text-white/60"
                  }`}
                >
                  I Found Something
                </button>
              </div>

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item..."
                className="w-full bg-holi-surface rounded-xl p-3 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-holi-pink/50 focus:outline-none"
                required
              />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where was it lost/found?"
                className="w-full bg-holi-surface rounded-xl p-3 text-sm text-white placeholder:text-white/30 border border-white/10 focus:border-holi-pink/50 focus:outline-none"
              />
              <Button type="submit" className="w-full">Submit Report</Button>
            </form>
          </Card>
        )}

        {/* Items list */}
        <div className="space-y-3">
          {allItems.map((item) => (
            <Card key={item.id}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.type === "lost" ? "🔍" : "📦"}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={item.type === "lost"
                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                      : "bg-green-500/20 text-green-300 border-green-500/30"
                    }>
                      {item.type}
                    </Badge>
                    <span className="text-white/40 text-xs">{formatTime(item.time)}</span>
                  </div>
                  <p className="font-medium text-sm">{item.description}</p>
                  <p className="text-white/50 text-xs mt-0.5">Location: {item.location}</p>
                </div>
              </div>
            </Card>
          ))}

          {allItems.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <p className="text-4xl mb-3">✅</p>
              <p>No items reported. Visit the Info Desk for assistance.</p>
            </div>
          )}
        </div>

        <p className="text-center text-white/40 text-xs pb-4">
          For immediate help, visit the Info Desk near the Main Entrance.
        </p>
      </div>
    </div>
  );
}
