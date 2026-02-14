import { emergency } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CallButton } from "@/components/ui/CallButton";

export function EmergencyPreview() {
  return (
    <SectionWrapper title="Emergency & Safety" href="/emergency">
      <div className="space-y-2">
        <CallButton number={emergency.emergencyNumber} label="Emergency Services" variant="emergency" />
        <CallButton number={emergency.eventSecurity.phone} label="Event Security" />
      </div>
      <p className="text-white/60 text-xs mt-3">
        First Aid: {emergency.firstAid.location}
      </p>
    </SectionWrapper>
  );
}
