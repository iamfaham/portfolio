import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorFollower from "@/components/CursorFollower";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ParticleField from "@/components/ParticleField";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://iamfaham.me";
const DESCRIPTION =
  "AI Software Engineer based in Buffalo, NY — building intelligent systems, ML models, and GenAI-powered applications.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Faham | AI Software Engineer",
    template: "%s | Faham",
  },
  description: DESCRIPTION,
  keywords: [
    "Faham",
    "iamfaham",
    "Syed Mohammed Faham",
    "AI Software Engineer",
    "ML Developer",
    "GenAI Developer",
    "Machine Learning",
    "Generative AI",
    "Computer Vision",
    "Python",
    "Next.js",
    "Buffalo NY",
    "developer portfolio",
  ],
  authors: [{ name: "Syed Mohammed Faham", url: SITE_URL }],
  creator: "Syed Mohammed Faham",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Faham | AI Software Engineer",
    title: "Faham | AI Software Engineer",
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Faham | AI Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faham | AI Software Engineer",
    description: DESCRIPTION,
    creator: "@iamfaham",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Ssijj4aoUCOKQXAAVqy1hYbYZGlnjEehmCXB2fGV6zs"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon-2.ico" />
        <JsonLd />
      </head>
      <body className="bg-black text-light-gray">
        <ParticleField />
        <CursorFollower />
        <SmoothCursor />
        <main className="flex-1 h-screen">{children}</main>
      </body>
    </html>
  );
}
