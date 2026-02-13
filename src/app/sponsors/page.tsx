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
                      {/* Sponsor initial avatar */}
                      <div className={`${tier === "platinum" ? "w-16 h-16 text-2xl mx-auto mb-3" : "w-10 h-10 text-base mb-2"} rounded-full bg-white/10 flex items-center justify-center font-bold`}>
                        {sponsor.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <h3 className={`font-semibold ${tier === "platinum" ? "text-lg" : "text-sm"}`}>
                        {sponsor.name}
                      </h3>
                      {sponsor.description && (
                        <p className="text-white/50 text-xs mt-1">{sponsor.description}</p>
                      )}
                      {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs mt-2 text-holi-pink hover:underline"
                        >
                          Visit Website
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
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
