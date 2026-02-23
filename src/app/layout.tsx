import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudNestle - Where Your Business Finds Its Cloud Home",
  description: "Expert AWS cloud consulting to help your business nestle into secure, scalable cloud solutions. Migration, optimization, and support services.",
  openGraph: {
    title: "CloudNestle - Where Your Business Finds Its Cloud Home",
    description: "Expert AWS cloud consulting to help your business nestle into secure, scalable cloud solutions. Migration, optimization, and support services.",
    url: "https://cloudnestle.com",
    siteName: "CloudNestle",
    images: [
      {
        url: "https://cloudnestle.com/cloudnestle-logo.png",
        width: 1200,
        height: 630,
        alt: "CloudNestle - AWS Cloud Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudNestle - Where Your Business Finds Its Cloud Home",
    description: "Expert AWS cloud consulting to help your business nestle into secure, scalable cloud solutions. Migration, optimization, and support services.",
    images: ["https://cloudnestle.com/cloudnestle-logo.png"],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CloudNestle Consulting & Services",
    "url": "https://cloudnestle.com",
    "logo": "https://cloudnestle.com/cloudnestle-logo.png",
    "description": "Expert AWS cloud consulting to help your business nestle into secure, scalable cloud solutions. Migration, optimization, and support services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ground floor, #85, 2nd Cross Road, Central Excise Layout, Vijay Nagar",
      "addressLocality": "Bangalore",
      "postalCode": "560040",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-346-576-5655",
        "contactType": "sales",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-95910-40061",
        "contactType": "sales",
        "areaServed": ["IN", "Global"],
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/cloudnestleconsultingandservices",
      "https://www.instagram.com/cloudnestle/",
      "https://www.youtube.com/@cloudnestle",
      "http://linkedin.com/company/cloudnestle"
    ],
    "email": "sales@cloudnestle.com"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
