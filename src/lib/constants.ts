export const EVENT_DATE = new Date("2025-03-08T10:30:00");
export const EVENT_END = new Date("2025-03-08T14:30:00");

export const COLORS = {
  pink: "#E91E63",
  purple: "#9C27B0",
  orange: "#FF9800",
  yellow: "#FFEB3B",
  background: "#1a0a2e",
  surface: "#2d1b4e",
  surfaceLight: "#3d2b5e",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Schedule", href: "/schedule", icon: "calendar" },
  { label: "Map", href: "/map", icon: "map" },
  { label: "Food", href: "/food", icon: "utensils" },
  { label: "Emergency", href: "/emergency", icon: "shield" },
] as const;

export const ALL_SECTIONS = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Schedule", href: "/schedule", icon: "calendar" },
  { label: "Map", href: "/map", icon: "map" },
  { label: "Food", href: "/food", icon: "utensils" },
  { label: "Emergency", href: "/emergency", icon: "shield" },
  { label: "Announcements", href: "/announcements", icon: "megaphone" },
  { label: "Volunteers", href: "/volunteers", icon: "users" },
  { label: "Sponsors", href: "/sponsors", icon: "heart" },
  { label: "Gallery", href: "/gallery", icon: "camera" },
  { label: "FAQ", href: "/faq", icon: "help-circle" },
  { label: "Feedback", href: "/feedback", icon: "star" },
  { label: "Lost & Found", href: "/lost-found", icon: "search" },
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  ceremony: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  performance: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  activity: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  food: "bg-green-500/20 text-green-300 border-green-500/30",
  break: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

export const DIETARY_COLORS: Record<string, string> = {
  vegetarian: "bg-green-500/20 text-green-300",
  vegan: "bg-emerald-500/20 text-emerald-300",
  "gluten-free": "bg-amber-500/20 text-amber-300",
  "nut-free": "bg-blue-500/20 text-blue-300",
  halal: "bg-teal-500/20 text-teal-300",
  "dairy-free": "bg-sky-500/20 text-sky-300",
  spicy: "bg-red-500/20 text-red-300",
};

export const MARKER_ICONS: Record<string, string> = {
  stage: "🎭",
  food: "🍛",
  toilet: "🚻",
  "first-aid": "🏥",
  entrance: "🚪",
  water: "💧",
  info: "ℹ️",
  prayer: "🕌",
  parking: "🅿️",
};
