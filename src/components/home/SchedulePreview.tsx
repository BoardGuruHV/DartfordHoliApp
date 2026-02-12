import { schedule } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { formatTime } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";

export function SchedulePreview() {
  const highlights = schedule.filter((item) => item.highlight).slice(0, 4);

  return (
    <SectionWrapper title="Programme Highlights" href="/schedule">
      <div className="space-y-3">
        {highlights.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-3 flex items-start gap-3">
            <div className="text-holi-pink font-bold text-sm whitespace-nowrap pt-0.5">
              {formatTime(item.time)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-white/50 text-xs mt-0.5 line-clamp-1">{item.description}</p>
              <Badge className={`mt-1.5 ${CATEGORY_COLORS[item.category]}`}>
                {item.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
