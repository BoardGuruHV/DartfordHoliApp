import { PageHeader } from "@/components/layout/PageHeader";
import { announcements } from "@/lib/data";
import { formatTime, cn } from "@/lib/utils";

export const metadata = {
  title: "Announcements | Dartford Holi Festival",
};

export default function AnnouncementsPage() {
  return (
    <div>
      <PageHeader title="Announcements" subtitle="Latest updates from the festival" />

      <div className="px-4 space-y-3">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={cn(
              "glass-card rounded-xl p-4",
              item.priority === "urgent" && "border-red-500/50",
              item.priority === "important" && "border-holi-orange/50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/50 text-sm font-medium">{formatTime(item.time)}</span>
              {item.priority !== "normal" && (
                <span className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  item.priority === "urgent"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : "bg-holi-orange/20 text-orange-300 border border-orange-500/30"
                )}>
                  {item.priority.toUpperCase()}
                </span>
              )}
              <span className="text-white/30 text-xs px-2 py-0.5 bg-white/5 rounded-full">
                {item.category}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.message}</p>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <p className="text-4xl mb-3">📢</p>
            <p>No announcements yet. Check back during the festival!</p>
          </div>
        )}
      </div>
    </div>
  );
}
