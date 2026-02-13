"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mapMarkers, volunteers } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { MARKER_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { MapMarker } from "@/types";

const markerTypes = ["all", "stage", "food", "water", "toilet", "first-aid", "info", "entrance", "parking", "prayer"] as const;

// Map marker types to linked pages
const markerLinks: Record<string, string> = {
  food: "/food",
  "first-aid": "/emergency",
  info: "/lost-found",
};

// Colour zone overlays
const colourZones = [
  {
    id: "colour-zone",
    label: "Colour Play Zone",
    colour: "bg-holi-pink/15 border-holi-pink/40",
    top: "42%", left: "20%", width: "60%", height: "20%",
    icon: "🎨",
  },
  {
    id: "safe-zone",
    label: "Colour-Free Safe Zone",
    colour: "bg-green-500/15 border-green-500/40",
    top: "70%", left: "8%", width: "30%", height: "15%",
    icon: "🟢",
  },
  {
    id: "kids-zone",
    label: "Children's Zone",
    colour: "bg-yellow-500/15 border-yellow-500/40",
    top: "70%", left: "55%", width: "30%", height: "15%",
    icon: "👶",
  },
];

export default function MapPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-center text-white/40">Loading map...</div>}>
      <MapContent />
    </Suspense>
  );
}

function MapContent() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<MapMarker | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showZones, setShowZones] = useState(false);
  const [showVolunteers, setShowVolunteers] = useState(false);

  // Handle deep link from schedule (?highlight=Main Stage)
  useEffect(() => {
    const highlight = searchParams.get("highlight");
    if (highlight) {
      const marker = mapMarkers.find(
        (m) => m.label.toLowerCase().includes(highlight.toLowerCase()) ||
               highlight.toLowerCase().includes(m.label.toLowerCase())
      );
      if (marker) {
        setSelected(marker);
      }
    }
  }, [searchParams]);

  const filteredMarkers = typeFilter === "all"
    ? mapMarkers
    : mapMarkers.filter((m) => m.type === typeFilter);

  // Get volunteers for the selected marker's zone
  const zoneVolunteers = selected
    ? volunteers.filter(
        (v) =>
          v.zone.toLowerCase() === selected.label.toLowerCase() ||
          v.zone === "All Areas" ||
          selected.label.toLowerCase().includes(v.zone.toLowerCase())
      )
    : [];

  return (
    <div>
      <PageHeader title="Venue Map" subtitle="Open Air Theatre, Central Park" />

      <div className="px-4">
        {/* Type filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          {markerTypes.map((type) => (
            <button
              key={type}
              onClick={() => { setTypeFilter(type); setSelected(null); }}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[36px] flex items-center gap-1.5",
                typeFilter === type
                  ? "bg-holi-pink text-white"
                  : "bg-holi-surface text-white/60 hover:text-white"
              )}
            >
              {type !== "all" && <span className="text-base">{MARKER_ICONS[type]}</span>}
              <span>{type === "all" ? "All" : type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
            </button>
          ))}
        </div>

        {/* Overlay toggles */}
        <div className="flex gap-2 pb-3">
          <button
            onClick={() => setShowZones(!showZones)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5",
              showZones
                ? "bg-holi-purple text-white"
                : "bg-holi-surface text-white/50 hover:text-white"
            )}
          >
            🎨 <span>Colour Zones</span>
          </button>
          <button
            onClick={() => setShowVolunteers(!showVolunteers)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5",
              showVolunteers
                ? "bg-holi-orange text-white"
                : "bg-holi-surface text-white/50 hover:text-white"
            )}
          >
            👥 <span>Volunteers</span>
          </button>
        </div>

        {/* Map container */}
        <div className="relative glass-card rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
          {/* Background representing the park */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-800/20">
            {/* Park outline */}
            <div className="absolute inset-4 border-2 border-white/10 rounded-3xl" />
            {/* Stage area */}
            <div className="absolute top-[20%] left-[30%] right-[30%] h-[15%] bg-holi-purple/20 rounded-xl border border-holi-purple/30 flex items-center justify-center">
              <span className="text-xs text-white/40 font-medium">STAGE</span>
            </div>
            {/* Colour play area */}
            <div className="absolute top-[45%] left-[25%] right-[25%] h-[15%] bg-holi-pink/10 rounded-xl border border-holi-pink/20 border-dashed flex items-center justify-center">
              <span className="text-xs text-white/30 font-medium">COLOUR PLAY</span>
            </div>
            {/* Food court */}
            <div className="absolute top-[42%] right-[8%] w-[25%] h-[20%] bg-holi-orange/10 rounded-xl border border-holi-orange/20 flex items-center justify-center">
              <span className="text-xs text-white/30 font-medium rotate-90">FOOD</span>
            </div>
          </div>

          {/* Colour zone overlays */}
          {showZones && colourZones.map((zone) => (
            <div
              key={zone.id}
              className={cn(
                "absolute rounded-xl border-2 border-dashed flex items-center justify-center z-5 transition-opacity",
                zone.colour
              )}
              style={{ top: zone.top, left: zone.left, width: zone.width, height: zone.height }}
            >
              <div className="text-center">
                <span className="text-lg block">{zone.icon}</span>
                <span className="text-[10px] font-semibold text-white/60 block leading-tight">{zone.label}</span>
              </div>
            </div>
          ))}

          {/* Volunteer zone markers */}
          {showVolunteers && (() => {
            // Group volunteers by zone and position them
            const zonePositions: Record<string, { x: number; y: number }> = {
              "All Areas": { x: 50, y: 10 },
              "Main Stage": { x: 50, y: 22 },
              "Food Court": { x: 80, y: 50 },
              "Info Desk": { x: 15, y: 15 },
              "Car Park": { x: 85, y: 88 },
              "Activity Zone": { x: 50, y: 52 },
            };

            const grouped = volunteers.reduce((acc, vol) => {
              if (!acc[vol.zone]) acc[vol.zone] = [];
              acc[vol.zone].push(vol);
              return acc;
            }, {} as Record<string, typeof volunteers>);

            return Object.entries(grouped).map(([zone, vols]) => {
              const pos = zonePositions[zone] || { x: 50, y: 50 };
              return (
                <div
                  key={zone}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div className="bg-holi-orange/90 rounded-lg px-2 py-1 text-center min-w-[60px] shadow-lg">
                    <span className="text-[10px] font-bold block text-white">👥 {vols.length}</span>
                    <span className="text-[8px] text-white/80 block leading-tight">{zone}</span>
                  </div>
                </div>
              );
            });
          })()}

          {/* Markers */}
          {filteredMarkers.map((marker) => (
            <button
              key={marker.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all",
                "w-10 h-10 rounded-full flex items-center justify-center text-lg",
                "hover:scale-125 active:scale-110",
                selected?.id === marker.id
                  ? "bg-holi-pink scale-125 ring-2 ring-white"
                  : "bg-holi-surface/90 hover:bg-holi-surface"
              )}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              onClick={() => setSelected(selected?.id === marker.id ? null : marker)}
              aria-label={marker.label}
            >
              {MARKER_ICONS[marker.type] || "📍"}
            </button>
          ))}
        </div>

        {/* Selected marker info */}
        {selected && (
          <div className="glass-card rounded-2xl p-4 mt-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{MARKER_ICONS[selected.type]}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{selected.label}</h3>
                {selected.description && (
                  <p className="text-white/60 text-sm mt-0.5">{selected.description}</p>
                )}
              </div>
              {markerLinks[selected.type] && (
                <Link
                  href={markerLinks[selected.type]}
                  className="text-holi-pink text-sm font-medium hover:underline shrink-0"
                >
                  View &rarr;
                </Link>
              )}
            </div>

            {/* Show volunteers in this zone */}
            {zoneVolunteers.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-white/40 mb-2">Volunteers in this area:</p>
                <div className="flex flex-wrap gap-2">
                  {zoneVolunteers.map((vol) => (
                    <div key={vol.id} className="flex items-center gap-1.5 bg-white/5 rounded-full px-2.5 py-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-holi-pink to-holi-purple flex items-center justify-center text-[8px] font-bold">
                        {vol.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-xs text-white/70">{vol.name}</span>
                      <span className="text-[10px] text-holi-orange">({vol.role})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Zone legend when zones are visible */}
        {showZones && (
          <div className="mt-3 glass-card rounded-2xl p-4">
            <h3 className="font-semibold text-sm mb-2">Zone Guide</h3>
            <div className="space-y-2">
              {colourZones.map((zone) => (
                <div key={zone.id} className="flex items-center gap-2 text-xs text-white/60">
                  <span>{zone.icon}</span>
                  <span className="font-medium">{zone.label}</span>
                  {zone.id === "safe-zone" && <span className="text-green-400/60">— No colour throwing</span>}
                  {zone.id === "kids-zone" && <span className="text-yellow-400/60">— Family-friendly area</span>}
                  {zone.id === "colour-zone" && <span className="text-pink-400/60">— Active colour play!</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 glass-card rounded-2xl p-4">
          <h3 className="font-semibold text-sm mb-3">Map Legend</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(MARKER_ICONS).map(([type, icon]) => (
              <div key={type} className="flex items-center gap-2 text-xs text-white/60">
                <span>{icon}</span>
                <span className="capitalize">{type.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
