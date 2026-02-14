import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venue Map | Dartford Holi Festival 2025",
  description: "Interactive venue map of Central Park, Dartford — find stages, food stalls, toilets, first aid, and colour zones at the Holi Festival.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
