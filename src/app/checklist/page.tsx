"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import checklistData from "../../../data/checklist.json";

export default function ChecklistPage() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>("holi-checklist", {});

  const allItems = checklistData.sections.flatMap((s) => s.items);
  const totalItems = allItems.length;
  const checkedCount = allItems.filter((item) => checked[item.id]).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <PageHeader title="Preparation Checklist" subtitle="Get ready for Holi!" />

      <div className="px-4 space-y-4">
        {/* Progress bar */}
        <Card className="border-holi-pink/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Your Progress</span>
            <span className="text-sm text-holi-pink font-bold">{checkedCount}/{totalItems}</span>
          </div>
          <div className="w-full h-3 bg-holi-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-holi-pink to-holi-orange rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-center text-holi-yellow text-sm font-semibold mt-2">
              You&apos;re all set for Holi! 🎉
            </p>
          )}
        </Card>

        {checklistData.sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold mb-2">{section.title}</h2>
            <Card>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex items-center gap-3 w-full text-left py-2 px-1 rounded-lg hover:bg-white/5 transition-colors min-h-[44px]"
                    role="checkbox"
                    aria-checked={!!checked[item.id]}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                      checked[item.id]
                        ? "bg-holi-pink border-holi-pink"
                        : "border-white/30"
                    }`}>
                      {checked[item.id] && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked[item.id] ? "text-white/40 line-through" : "text-white/80"}`}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        ))}

        <p className="text-center text-white/40 text-xs pb-4">
          Your checklist is saved on this device.
        </p>
      </div>
    </div>
  );
}
