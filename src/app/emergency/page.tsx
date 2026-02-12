import { PageHeader } from "@/components/layout/PageHeader";
import { emergency } from "@/lib/data";
import { CallButton } from "@/components/ui/CallButton";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Emergency & Safety | Dartford Holi Festival",
};

export default function EmergencyPage() {
  return (
    <div>
      <PageHeader title="Emergency & Safety" subtitle="Stay safe, have fun!" />

      <div className="px-4 space-y-6">
        {/* Emergency contacts */}
        <section>
          <h2 className="text-lg font-bold mb-3">Emergency Contacts</h2>
          <div className="space-y-2">
            <CallButton number={emergency.emergencyNumber} label="Emergency Services (999)" variant="emergency" />
            <CallButton number={emergency.nonEmergencyNumber} label="Non-Emergency (111)" />
            <CallButton number={emergency.eventSecurity.phone} label="Event Security" />
            <CallButton number={emergency.nearestHospital.phone} label={emergency.nearestHospital.name} />
          </div>
        </section>

        {/* First Aid */}
        <Card>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏥</span>
            <div>
              <h3 className="font-semibold">First Aid Station</h3>
              <p className="text-white/60 text-sm mt-1">{emergency.firstAid.location}</p>
              <p className="text-white/50 text-xs mt-1">{emergency.firstAid.description}</p>
            </div>
          </div>
        </Card>

        {/* Nearest Hospital */}
        <Card>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏨</span>
            <div>
              <h3 className="font-semibold">{emergency.nearestHospital.name}</h3>
              <p className="text-white/60 text-sm mt-1">{emergency.nearestHospital.address}</p>
              <p className="text-white/50 text-xs mt-1">{emergency.nearestHospital.distance}</p>
            </div>
          </div>
        </Card>

        {/* Water Stations */}
        <section>
          <h2 className="text-lg font-bold mb-3">Water Stations</h2>
          <div className="grid grid-cols-2 gap-2">
            {emergency.waterStations.map((station, i) => (
              <Card key={i}>
                <div className="flex items-center gap-2">
                  <span>💧</span>
                  <span className="text-sm">{station}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section>
          <h2 className="text-lg font-bold mb-3">Safety Tips</h2>
          <div className="space-y-2">
            {emergency.safetyTips.map((tip, i) => (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <span className="text-holi-yellow mt-0.5">⚡</span>
                  <p className="text-sm text-white/80">{tip}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
