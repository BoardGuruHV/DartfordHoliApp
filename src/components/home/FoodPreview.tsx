import { foodStalls } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function FoodPreview() {
  return (
    <SectionWrapper title="Food & Drink" href="/food">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {foodStalls.map((stall) => (
          <div key={stall.id} className="glass-card rounded-xl p-4 min-w-[200px] shrink-0">
            <p className="font-semibold text-sm">{stall.name}</p>
            <p className="text-holi-orange text-xs mt-0.5">{stall.cuisine}</p>
            <p className="text-white/50 text-xs mt-1 line-clamp-2">{stall.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
