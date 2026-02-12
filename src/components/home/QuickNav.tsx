import Link from "next/link";
import { NavIcon } from "@/components/layout/NavIcon";

const quickLinks = [
  { href: "/schedule", icon: "calendar", label: "Schedule", color: "from-pink-500/30 to-pink-600/10 border-pink-500/30" },
  { href: "/map", icon: "map", label: "Venue Map", color: "from-purple-500/30 to-purple-600/10 border-purple-500/30" },
  { href: "/food", icon: "utensils", label: "Food & Drink", color: "from-orange-500/30 to-orange-600/10 border-orange-500/30" },
  { href: "/emergency", icon: "shield", label: "Safety", color: "from-red-500/30 to-red-600/10 border-red-500/30" },
  { href: "/announcements", icon: "megaphone", label: "Updates", color: "from-yellow-500/30 to-yellow-600/10 border-yellow-500/30" },
  { href: "/faq", icon: "help-circle", label: "FAQ", color: "from-teal-500/30 to-teal-600/10 border-teal-500/30" },
];

export function QuickNav() {
  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-3 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border bg-gradient-to-b ${link.color} transition-all active:scale-95 min-h-[80px]`}
          >
            <NavIcon icon={link.icon} />
            <span className="text-xs font-medium text-center">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
