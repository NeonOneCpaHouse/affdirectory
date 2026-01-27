import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { LanguageProvider } from "@/context/LanguageContext"
import { AudienceProvider } from "@/context/AudienceContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TraffDirector - Webmaster Monetization Directory",
  description: "Compare ad networks, read industry news, and find the best monetization strategies for publishers.",
  generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} bg-sky-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
