import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import colourSafetyData from "../../../data/colour-safety.json";

export const metadata = {
  title: "Colour Safety Guide | Dartford Holi Festival",
};

export default function ColourSafetyPage() {
  return (
    <div>
      <PageHeader title="Colour Safety Guide" subtitle="Stay safe, stay colourful!" />

      <div className="px-4 space-y-4">
        <Card className="border-holi-pink/30">
          <p className="text-white/70 text-sm leading-relaxed">{colourSafetyData.intro}</p>
        </Card>

        {colourSafetyData.sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{section.icon}</span>
              <h2 className="text-lg font-bold">{section.title}</h2>
            </div>
            <Card>
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-holi-pink mt-0.5 shrink-0">&#x2022;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}

        <Card className="text-center border-holi-orange/30">
          <p className="text-sm text-white/60">
            If you experience any discomfort from colour powder, visit the{" "}
            <strong className="text-white">First Aid tent</strong> near the Main Entrance immediately.
          </p>
        </Card>
      </div>
    </div>
  );
}
