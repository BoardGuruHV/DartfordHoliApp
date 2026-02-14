import dynamic from "next/dynamic";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { NowUpNext } from "@/components/home/NowUpNext";
import { QuickNav } from "@/components/home/QuickNav";
import { InstallPrompt } from "@/components/home/InstallPrompt";
import { ShareButton } from "@/components/ui/ShareButton";
import Link from "next/link";

// Lazy load below-the-fold components for code splitting
const WeatherWidget = dynamic(() => import("@/components/home/WeatherWidget").then(m => ({ default: m.WeatherWidget })));
const HydrationReminder = dynamic(() => import("@/components/home/HydrationReminder").then(m => ({ default: m.HydrationReminder })));
const HoliHighlights = dynamic(() => import("@/components/home/HoliHighlights").then(m => ({ default: m.HoliHighlights })));
const SchedulePreview = dynamic(() => import("@/components/home/SchedulePreview").then(m => ({ default: m.SchedulePreview })));
const AnnouncementsPreview = dynamic(() => import("@/components/home/AnnouncementsPreview").then(m => ({ default: m.AnnouncementsPreview })));
const FoodPreview = dynamic(() => import("@/components/home/FoodPreview").then(m => ({ default: m.FoodPreview })));
const MapPreview = dynamic(() => import("@/components/home/MapPreview").then(m => ({ default: m.MapPreview })));
const EmergencyPreview = dynamic(() => import("@/components/home/EmergencyPreview").then(m => ({ default: m.EmergencyPreview })));
const SponsorsPreview = dynamic(() => import("@/components/home/SponsorsPreview").then(m => ({ default: m.SponsorsPreview })));

export default function HomePage() {
  return (
    <div className="space-y-2">
      <HeroBanner />
      <CountdownTimer />
      <HoliHighlights />
      <NowUpNext />
      <WeatherWidget />
      <InstallPrompt />
      <QuickNav />
      <HydrationReminder />
      <SchedulePreview />
      <AnnouncementsPreview />
      <MapPreview />
      <FoodPreview />
      <EmergencyPreview />
      <SponsorsPreview />

      {/* More links */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {[
          { href: "/about-holi", icon: "🪔", label: "Story of Holi" },
          { href: "/colour-safety", icon: "🎨", label: "Colour Safety" },
          { href: "/checklist", icon: "✅", label: "Preparation Checklist" },
          { href: "/accessibility", icon: "♿", label: "Accessibility" },
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
        {/* Share the event */}
        <div className="glass-card rounded-xl p-4 text-center flex flex-col items-center justify-center">
          <ShareButton
            title="Dartford Holi Festival 2025"
            text="Join me at the Dartford Holi Festival! Sunday 8th March, Central Park, Dartford. A celebration of colours, culture & community!"
            size="md"
          />
          <span className="text-sm font-medium mt-1">Share Event</span>
        </div>
      </div>
    </div>
  );
}
