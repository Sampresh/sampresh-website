import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PortfolioProvider } from "@/contexts/portfolio-context"

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  // Only load the weights we actually use
  weight: ["400", "500", "600", "700"],
})

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/profile.jpeg" as="image" />
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
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
