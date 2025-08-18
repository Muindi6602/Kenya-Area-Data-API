import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../fontawesome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kenya Area Data API | Counties, Constituencies & Wards",
  description: "Free REST API for accessing Kenya's administrative areas including counties, constituencies and wards. Developer-friendly and easy to integrate.",
  keywords: [
    "Kenya API",
    "Kenya areas API",
    "Counties API",
    "Constituencies API",
    "Wards API",
    "Kenya administrative areas",
    "Free Kenya data",
    "REST API Kenya"
  ],
  authors: [{ name: "Kenya Area Data API Team" }],
  openGraph: {
    title: "Kenya Area Data API",
    description: "Free REST API for accessing Kenya's administrative areas including counties, constituencies and wards",
    url: "https://kenyaareadata.vercel.app",
    siteName: "Kenya Area Data API",
    images: [
      {
        url: "https://kenyaareadata.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kenya Area Data API",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya Area Data API",
    description: "Free REST API for accessing Kenya's administrative areas including counties, constituencies and wards",
    images: ["https://kenyaareadata.vercel.app/og-image.png"],
  },
  metadataBase: new URL("https://kenyaareadata.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}