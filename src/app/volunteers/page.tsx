"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { volunteers } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function VolunteersPage() {
  // Group volunteers by zone
  const zones = [...new Set(volunteers.map((v) => v.zone))];

  return (
    <div>
      <PageHeader title="Volunteers & Organisers" subtitle="The people making it happen" />

      <div className="px-4">
        {/* Zone quick links */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {zones.map((zone) => (
            <Link
              key={zone}
              href={`/map?highlight=${encodeURIComponent(zone)}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-holi-surface text-white/60 hover:text-white hover:bg-holi-purple/30 transition-colors flex items-center gap-1.5"
            >
              📍 {zone}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {volunteers.map((vol) => (
            <Card key={vol.id}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-holi-pink to-holi-purple mx-auto flex items-center justify-center text-2xl font-bold">
                  {vol.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-sm mt-3">{vol.name}</h3>
                <p className="text-holi-orange text-xs mt-0.5">{vol.role}</p>
                <Link
                  href={`/map?highlight=${encodeURIComponent(vol.zone)}`}
                  className="text-white/40 text-xs mt-0.5 hover:text-holi-pink transition-colors inline-flex items-center gap-1"
                >
                  📍 {vol.zone}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
