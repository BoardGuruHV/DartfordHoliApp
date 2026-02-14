import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dartford-holi.vercel.app";

  const routes = [
    "/",
    "/schedule",
    "/map",
    "/food",
    "/emergency",
    "/about-holi",
    "/colour-safety",
    "/checklist",
    "/accessibility",
    "/announcements",
    "/volunteers",
    "/sponsors",
    "/gallery",
    "/faq",
    "/feedback",
    "/lost-found",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2025-03-01"),
    changeFrequency: route === "/announcements" ? "hourly" : "weekly",
    priority: route === "/" ? 1.0 : route === "/schedule" ? 0.9 : 0.7,
  }));
}
