import { sponsors } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function SponsorsPreview() {
  const topSponsors = sponsors.filter((s) => s.tier === "platinum" || s.tier === "gold");

  return (
    <SectionWrapper title="Our Sponsors" href="/sponsors">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {topSponsors.map((sponsor) => (
          <div key={sponsor.id} className="glass-card rounded-xl p-4 min-w-[160px] shrink-0 text-center">
            <p className="font-semibold text-sm">{sponsor.name}</p>
            <p className="text-holi-yellow text-xs mt-0.5 capitalize">{sponsor.tier}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
