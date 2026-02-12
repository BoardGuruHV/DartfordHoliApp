import { PageHeader } from "@/components/layout/PageHeader";
import { sponsors } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Sponsors | Dartford Holi Festival",
};

const tierColors = {
  platinum: "from-slate-300/30 to-slate-400/10 border-slate-300/40 text-slate-200",
  gold: "from-yellow-500/30 to-yellow-600/10 border-yellow-500/40 text-yellow-300",
  silver: "from-gray-400/30 to-gray-500/10 border-gray-400/40 text-gray-300",
  community: "from-holi-purple/30 to-holi-purple/10 border-holi-purple/40 text-purple-300",
};

const tierOrder = ["platinum", "gold", "silver", "community"] as const;

export default function SponsorsPage() {
  return (
    <div>
      <PageHeader title="Our Sponsors" subtitle="Thank you for your generous support" />

      <div className="px-4 space-y-6">
        {tierOrder.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;

          return (
            <section key={tier}>
              <Badge className={`mb-3 ${tierColors[tier]} border text-sm px-3 py-1`}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)} {tier !== "community" ? "Sponsor" : "Partner"}
              </Badge>
              <div className={`grid gap-3 ${tier === "platinum" ? "grid-cols-1" : "grid-cols-2"}`}>
                {tierSponsors.map((sponsor) => (
                  <Card key={sponsor.id} className={`bg-gradient-to-b ${tierColors[tier]}`}>
                    <div className={tier === "platinum" ? "text-center py-2" : ""}>
                      <h3 className={`font-semibold ${tier === "platinum" ? "text-lg" : "text-sm"}`}>
                        {sponsor.name}
                      </h3>
                      {sponsor.description && (
                        <p className="text-white/50 text-xs mt-1">{sponsor.description}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
