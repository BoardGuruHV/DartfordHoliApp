import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | Dartford Holi Festival 2025",
  description: "Live announcements and updates from the Dartford Holi Festival. Stay informed about schedule changes and important notices.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
