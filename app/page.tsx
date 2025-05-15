"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { Download, Github, Linkedin, Youtube, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Dynamically import non-critical sections with loading fallbacks
const SkillsSection = dynamic(
  () => import("@/components/skills-section").then((mod) => ({ default: mod.SkillsSection })),
  {
    loading: () => (
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-8 w-48 bg-zinc-800 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-zinc-800 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    ),
    ssr: false,
  },
)

const ProjectsSection = dynamic(
  () => import("@/components/projects-section").then((mod) => ({ default: mod.ProjectsSection })),
  {
    loading: () => (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-8 w-48 bg-zinc-900 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-zinc-900 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    ),
    ssr: false,
  },
)

const BlogSection = dynamic(() => import("@/components/blog-section").then((mod) => ({ default: mod.BlogSection })), {
  loading: () => (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="h-8 w-48 bg-zinc-800 rounded mx-auto mb-4"></div>
          <div className="h-4 w-64 bg-zinc-800 rounded mx-auto"></div>
        </div>
      </div>
    </section>
  ),
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        <HeroSection />

        <Suspense fallback={<div className="h-20"></div>}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<div className="h-20"></div>}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<div className="h-20"></div>}>
          <BlogSection />
        </Suspense>

        <section className="container mx-auto py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to collaborate?</h2>
            <p className="text-gray-400 mb-8">Let's turn your ideas into reality. Download my CV or get in touch.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" passHref>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </Button>
              </Link>
              <Link href="/cv" passHref>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white">
                <span className="text-red-500">Sampresh</span>Karki
              </Link>
              <p className="text-gray-400 mt-2">Building the future, one line of code at a time.</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-500"
                onClick={() => window.open("https://github.com/Sampresh", "_blank")}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-500"
                onClick={() => window.open("https://www.linkedin.com/in/sampresh-karki-a86409256/", "_blank")}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-500"
                onClick={() => window.open("https://www.youtube.com/@sampres10", "_blank")}
              >
                <Youtube className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-500"
                onClick={() => window.open("https://www.instagram.com/sampres10", "_blank")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Sampresh Karki. All rights reserved.</p>
            <Link href="/admin/login" className="text-gray-500 hover:text-red-500 text-sm mt-2 inline-block">
              Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
