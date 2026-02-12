import { PageHeader } from "@/components/layout/PageHeader";
import { volunteers } from "@/lib/data";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Volunteers & Organisers | Dartford Holi Festival",
};

export default function VolunteersPage() {
  return (
    <div>
      <PageHeader title="Volunteers & Organisers" subtitle="The people making it happen" />

      <div className="px-4 grid grid-cols-2 gap-3">
        {volunteers.map((vol) => (
          <Card key={vol.id}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-holi-pink to-holi-purple mx-auto flex items-center justify-center text-2xl font-bold">
                {vol.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-semibold text-sm mt-3">{vol.name}</h3>
              <p className="text-holi-orange text-xs mt-0.5">{vol.role}</p>
              <p className="text-white/40 text-xs mt-0.5">{vol.zone}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
