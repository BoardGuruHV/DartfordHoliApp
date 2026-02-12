import { event } from "@/lib/data";

export function HeroBanner() {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden px-4 pt-6 pb-8">
      {/* Decorative colour splashes */}
      <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-holi-pink/20 blur-3xl" />
      <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-holi-orange/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full bg-holi-purple/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative text-center">
        <div className="text-5xl mb-4 animate-float">🎨</div>
        <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)] gradient-text leading-tight">
          {event.name}
        </h1>
        <p className="text-white/70 mt-2 text-lg">{event.tagline}</p>
        <div className="mt-4 space-y-1 text-sm text-white/60">
          <p className="font-medium text-white/80">{formattedDate}</p>
          <p>{event.startTime} AM – {event.endTime.replace("14", "2")} PM</p>
          <p>{event.venue}</p>
          <p>{event.address}, {event.postcode}</p>
        </div>
      </div>
    </div>
  );
}
