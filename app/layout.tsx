import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { SITE_URL, getAbsoluteUrl } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })
const GOOGLE_ANALYTICS_ID = "G-GZY06Z2PWV"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AffTraff",
    template: "%s",
  },
  description: "AffTraff is a directory and media platform for affiliate marketers, webmasters, rankings, guides, tools, events, and jobs.",
  openGraph: {
    type: "website",
    siteName: "AffTraff",
    title: "AffTraff",
    description: "AffTraff is a directory and media platform for affiliate marketers, webmasters, rankings, guides, tools, events, and jobs.",
    url: SITE_URL,
    images: [
      {
        url: getAbsoluteUrl("/og-default.svg"),
        width: 1200,
        height: 630,
        alt: "AffTraff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AffTraff",
    description: "AffTraff is a directory and media platform for affiliate marketers, webmasters, rankings, guides, tools, events, and jobs.",
    images: [getAbsoluteUrl("/og-default.svg")],
  },
  icons: {
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
