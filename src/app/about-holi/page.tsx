import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import aboutHoliData from "../../../data/about-holi.json";

export const metadata = {
  title: "The Story of Holi | Dartford Holi Festival",
};

export default function AboutHoliPage() {
  return (
    <div>
      <PageHeader title="The Story of Holi" subtitle="History, legends & meaning" />

      <div className="px-4 space-y-4">
        <Card className="border-holi-purple/30">
          <p className="text-white/70 text-sm leading-relaxed">{aboutHoliData.intro}</p>
        </Card>

        {aboutHoliData.sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{section.icon}</span>
              <h2 className="text-lg font-bold">{section.title}</h2>
            </div>
            <Card>
              {"content" in section && section.content && (
                <p className="text-sm text-white/70 leading-relaxed">{section.content}</p>
              )}
              {"colours" in section && section.colours && (
                <div className="space-y-3">
                  {section.colours.map((c) => (
                    <div key={c.colour} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full shrink-0 ring-2 ring-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <span className="font-semibold text-sm">{c.colour}</span>
                        <p className="text-xs text-white/60">{c.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
