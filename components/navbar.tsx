"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/contexts/portfolio-context"

// Memoize the Navbar component to prevent unnecessary re-renders
export const Navbar = memo(function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { profileInfo } = usePortfolio()

  // Handle scroll effect with throttling
  useEffect(() => {
    // Skip initial scroll check on mount for better performance
    let isFirstRun = true

    const handleScroll = () => {
      if (isFirstRun) {
        isFirstRun = false
        return
      }

      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Memoize the download handler to prevent unnecessary re-renders
  const handleDownloadCV = useCallback(() => {
    // Create a link to download the CV
    const link = document.createElement("a")
    link.href = profileInfo.cv.path || "/cv/Sampresh-Karki-Resume.pdf"
    link.download = profileInfo.cv.fileName || "Sampresh-Karki-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [profileInfo.cv.path, profileInfo.cv.fileName])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white z-50">
          <span className="text-red-500">Sampresh</span>Karki
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`${pathname === "/" ? "text-red-500" : "text-white hover:text-red-500"} transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`${pathname === "/projects" ? "text-red-500" : "text-white hover:text-red-500"} transition-colors`}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={`${pathname === "/blog" ? "text-red-500" : "text-white hover:text-red-500"} transition-colors`}
          >
            Blogs/Articles
          </Link>
          <Link
            href="/contact"
            className={`${pathname === "/contact" ? "text-red-500" : "text-white hover:text-red-500"} transition-colors`}
          >
            Contact
          </Link>
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={handleDownloadCV}
          >
            <Download className="mr-2 h-4 w-4" /> Download CV
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu - Only render when open for better performance */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 md:hidden">
          <nav className="flex flex-col items-center gap-8 text-xl">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-red-500" : "text-white"} hover:text-red-500 transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`${pathname === "/projects" ? "text-red-500" : "text-white"} hover:text-red-500 transition-colors`}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={`${pathname === "/blog" ? "text-red-500" : "text-white"} hover:text-red-500 transition-colors`}
            >
              Blogs/Articles
            </Link>
            <Link
              href="/contact"
              className={`${pathname === "/contact" ? "text-red-500" : "text-white"} hover:text-red-500 transition-colors`}
            >
              Contact
            </Link>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white mt-4"
              onClick={handleDownloadCV}
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
})
