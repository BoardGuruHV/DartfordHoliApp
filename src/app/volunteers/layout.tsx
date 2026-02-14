import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteers | Dartford Holi Festival 2025",
  description: "Meet the volunteers and organisers making the Dartford Holi Festival possible. Find help by zone.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
