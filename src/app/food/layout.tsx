import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food & Drinks | Dartford Holi Festival 2025",
  description: "Browse food stalls and menus at the Dartford Holi Festival — vegetarian, vegan, halal, gluten-free options available.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
