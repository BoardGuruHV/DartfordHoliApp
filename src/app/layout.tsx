import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://dartford-holi.vercel.app";

export const metadata: Metadata = {
  title: "Dartford Holi Festival 2025",
  description: "Your pocket guide to the Dartford Holi Festival — schedule, map, food, safety & more! Sunday 8th March, Central Park, Dartford.",
  metadataBase: new URL(siteUrl),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Holi Fest",
  },
  openGraph: {
    title: "Dartford Holi Festival 2025",
    description: "A Celebration of Colours, Culture & Community. Sunday 8th March, 10:30 AM – 2:30 PM, Central Park, Dartford.",
    type: "website",
    url: siteUrl,
    siteName: "Dartford Holi Festival",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dartford Holi Festival 2025 — A Celebration of Colours, Culture & Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dartford Holi Festival 2025",
    description: "A Celebration of Colours, Culture & Community. Sunday 8th March, 10:30 AM – 2:30 PM, Central Park, Dartford.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#9C27B0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Dartford Holi Festival 2025",
              description: "A Celebration of Colours, Culture & Community. Join us for an afternoon of colour throwing, live music, dance performances, delicious food, and cultural celebrations.",
              startDate: "2025-03-08T10:30:00+00:00",
              endDate: "2025-03-08T14:30:00+00:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Open Air Theatre, Central Park",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Central Park, Dartford",
                  addressLocality: "Dartford",
                  addressRegion: "Kent",
                  postalCode: "DA1 1EU",
                  addressCountry: "GB",
                },
              },
              image: [`${siteUrl}/og-image.png`],
              organizer: {
                "@type": "Organization",
                name: "Dartford Holi Festival",
                url: siteUrl,
              },
              isAccessibleForFree: true,
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        <Header />
        <main className="min-h-screen max-w-lg mx-auto">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
