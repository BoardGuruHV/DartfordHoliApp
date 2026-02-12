import { announcements } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function AnnouncementsPreview() {
  const latest = announcements.slice(0, 2);

  return (
    <SectionWrapper title="Announcements" href="/announcements">
      <div className="space-y-3">
        {latest.map((item) => (
          <div
            key={item.id}
            className={cn(
              "glass-card rounded-xl p-3",
              item.priority === "urgent" && "border-red-500/50",
              item.priority === "important" && "border-holi-orange/50"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/50 text-xs">{formatTime(item.time)}</span>
              {item.priority !== "normal" && (
                <span className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded",
                  item.priority === "urgent" ? "bg-red-500/20 text-red-300" : "bg-holi-orange/20 text-orange-300"
                )}>
                  {item.priority}
                </span>
              )}
            </div>
            <p className="font-semibold text-sm">{item.title}</p>
            <p className="text-white/50 text-xs mt-0.5 line-clamp-2">{item.message}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
