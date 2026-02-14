import { event } from "@/lib/data";

export function Footer() {
  return (
    <footer className="px-4 py-8 mb-16 text-center text-white/60 text-sm border-t border-white/10">
      <p className="font-medium text-white/60">{event.name}</p>
      <p className="mt-1">{event.venue}</p>
      <p className="mt-1">{event.address}, {event.postcode}</p>
      <p className="mt-3">Made with 🎨 for the community</p>
    </footer>
  );
}
