import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import accessibilityData from "../../../data/accessibility.json";

export const metadata = {
  title: "Accessibility | Dartford Holi Festival",
};

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader title="Accessibility" subtitle="A festival for everyone" />

      <div className="px-4 space-y-4">
        <Card className="border-holi-purple/30">
          <p className="text-white/70 text-sm leading-relaxed">{accessibilityData.intro}</p>
        </Card>

        {accessibilityData.sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{section.icon}</span>
              <h2 className="text-lg font-bold">{section.title}</h2>
            </div>
            <Card>
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-holi-purple mt-0.5 shrink-0">&#x2022;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
