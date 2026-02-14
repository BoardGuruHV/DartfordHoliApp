import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Dartford Holi Festival 2025",
  description: "Capture and share your colourful moments from the Dartford Holi Festival. Upload photos and share with the community.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
