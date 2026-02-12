import { PageHeader } from "@/components/layout/PageHeader";
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline";

export const metadata = {
  title: "Programme Schedule | Dartford Holi Festival",
};

export default function SchedulePage() {
  return (
    <div>
      <PageHeader title="Programme Schedule" subtitle="Sunday 8th March, 10:30 AM – 2:30 PM" />
      <ScheduleTimeline />
    </div>
  );
}
