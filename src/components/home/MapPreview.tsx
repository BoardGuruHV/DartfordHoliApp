import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function MapPreview() {
  return (
    <SectionWrapper title="Venue Map" href="/map">
      <Link href="/map" className="block glass-card rounded-xl p-6 text-center hover:bg-white/5 transition-colors">
        <span className="text-4xl block mb-2">🗺️</span>
        <p className="font-semibold">Open Venue Map</p>
        <p className="text-white/50 text-xs mt-1">Find stages, food, toilets & more</p>
      </Link>
    </SectionWrapper>
  );
}
