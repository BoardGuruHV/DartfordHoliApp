import { HeroBanner } from "@/components/home/HeroBanner";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { QuickNav } from "@/components/home/QuickNav";
import { InstallPrompt } from "@/components/home/InstallPrompt";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { AnnouncementsPreview } from "@/components/home/AnnouncementsPreview";
import { FoodPreview } from "@/components/home/FoodPreview";
import { MapPreview } from "@/components/home/MapPreview";
import { EmergencyPreview } from "@/components/home/EmergencyPreview";
import { SponsorsPreview } from "@/components/home/SponsorsPreview";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-2">
      <HeroBanner />
      <CountdownTimer />
      <InstallPrompt />
      <QuickNav />
      <SchedulePreview />
      <AnnouncementsPreview />
      <MapPreview />
      <FoodPreview />
      <EmergencyPreview />
      <SponsorsPreview />

      {/* More links */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {[
          { href: "/volunteers", icon: "👥", label: "Volunteers" },
          { href: "/gallery", icon: "📸", label: "Photo Gallery" },
          { href: "/faq", icon: "❓", label: "FAQ" },
          { href: "/feedback", icon: "⭐", label: "Feedback" },
          { href: "/lost-found", icon: "🔍", label: "Lost & Found" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="glass-card rounded-xl p-4 text-center hover:bg-white/5 transition-colors"
          >
            <span className="text-2xl block mb-1">{link.icon}</span>
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
