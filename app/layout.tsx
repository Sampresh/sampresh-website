import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import {
  GeistPixelCircle,
  GeistPixelGrid,
  GeistPixelLine,
  GeistPixelSquare,
  GeistPixelTriangle,
} from "geist/font/pixel"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PortfolioProvider } from "@/contexts/portfolio-context"

// Geist font variables: --font-geist-sans, --font-geist-mono and the five
// --font-geist-pixel-* faces. Mapped to font-* utilities in tailwind.config.ts.
const fontVariables = [
  GeistSans.variable,
  GeistMono.variable,
  GeistPixelSquare.variable,
  GeistPixelGrid.variable,
  GeistPixelCircle.variable,
  GeistPixelTriangle.variable,
  GeistPixelLine.variable,
].join(" ")

export const metadata: Metadata = {
  title: "Sampresh Karki - Computer Systems Engineering Graduate",
  description:
    "Personal portfolio of Sampresh Karki, a Computer Systems Engineering graduate passionate about tech, AI, cybersecurity, and creative problem-solving.",
  keywords: [
    "Sampresh Karki",
    "Portfolio",
    "Web Development",
    "AI",
    "Machine Learning",
    "Computer Systems Engineering",
    "Nepal",
  ],
  authors: [{ name: "Sampresh Karki" }],
  creator: "Sampresh Karki",
  metadataBase: new URL("https://sampresh.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sampresh Karki - Computer Systems Engineering Graduate",
    description:
      "Personal portfolio of Sampresh Karki, a Computer Systems Engineering graduate passionate about tech, AI, cybersecurity, and creative problem-solving.",
    url: "https://sampresh.com.np",
    siteName: "Sampresh Karki Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Sampresh Karki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sampresh Karki - Computer Systems Engineering Graduate",
    description:
      "Personal portfolio of Sampresh Karki, a Computer Systems Engineering graduate passionate about tech, AI, cybersecurity, and creative problem-solving.",
    images: ["/images/profile.jpeg"],
    creator: "@sampreshkarki",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/profile.jpeg" as="image" />
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-pixel-square">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PortfolioProvider>
            {children}
            <Toaster />
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
