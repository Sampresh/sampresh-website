"use client"

import { useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Download, FileText, Home, Mail } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { usePortfolio } from "@/contexts/portfolio-context"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
] as const

/** Frosted panel shared by the desktop rail and the mobile bar. */
const GLASS =
  "border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.55)] " +
  "supports-[backdrop-filter]:bg-white/[0.06]"

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

/**
 * The lit pill that slides between items. Framer's shared layout animation does
 * the travelling, so the light appears to glide rather than jump.
 */
function Spotlight({ layoutId, orientation }: { layoutId: string; orientation: "vertical" | "horizontal" }) {
  const reduceMotion = useReducedMotion()
  // Vertical rail: light enters from the right edge. Horizontal bar: from the top.
  const vertical = orientation === "vertical"

  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden="true"
      className="absolute inset-0 rounded-2xl bg-white/[0.10]"
      transition={
        reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }
      }
    >
      {/* the emitter */}
      <span
        className={cn(
          "absolute rounded-full bg-white",
          vertical
            ? "right-[-1px] top-1/2 h-7 w-[3px] -translate-y-1/2 shadow-[0_0_14px_4px_rgba(255,255,255,0.5)]"
            : "left-1/2 top-[-1px] h-[3px] w-7 -translate-x-1/2 shadow-[0_0_14px_4px_rgba(255,255,255,0.5)]",
        )}
      />
      {/* the cone of light falling off it */}
      <span
        className={cn(
          "absolute inset-0 rounded-2xl opacity-80",
          vertical
            ? "bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.30),transparent_72%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.30),transparent_72%)]",
        )}
      />
    </motion.span>
  )
}

export const Navbar = memo(function Navbar() {
  const pathname = usePathname()
  const { profileInfo } = usePortfolio()

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement("a")
    link.href = profileInfo.cv.path || "/cv/Sampresh-Karki-Resume.pdf"
    link.download = profileInfo.cv.fileName || "Sampresh-Karki-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [profileInfo.cv.path, profileInfo.cv.fileName])

  return (
    <>
      {/* ---------- Tablet and up: floating rail on the right ---------- */}
      <nav
        aria-label="Main"
        data-nav-rail=""
        className={cn(
          "fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-[26px] px-2 py-4 sm:flex lg:right-6",
          GLASS,
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className="group relative rounded-[20px] px-3 py-3.5 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {active && <Spotlight layoutId="nav-spotlight-rail" orientation="horizontal" />}
              <VerticalLabel
                text={item.label}
                className={cn(
                  active ? "text-white" : "text-white/50 group-hover:text-white/85",
                )}
              />
            </Link>
          )
        })}

        <span aria-hidden="true" className="h-px w-8 bg-white/10" />

        <button
          type="button"
          onClick={handleDownloadCV}
          aria-label="Download CV"
          className="group relative flex flex-col items-center gap-2 rounded-[20px] px-3 py-3.5 outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <Download className="h-4 w-4 text-red-400 transition-colors group-hover:text-red-300" />
          <VerticalLabel text="CV" className="text-red-400 group-hover:text-red-300" />
        </button>
      </nav>

      {/* ---------- Mobile: floating icon bar ---------- */}
      <nav
        aria-label="Main"
        className={cn(
          "fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-[26px] p-2 sm:hidden",
          GLASS,
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className="relative grid h-12 w-[58px] place-items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {active && <Spotlight layoutId="nav-spotlight-bar" orientation="horizontal" />}
              <Icon
                className={cn(
                  "relative z-10 h-[22px] w-[22px] transition-colors duration-300",
                  active ? "text-white" : "text-white/55",
                )}
              />
            </Link>
          )
        })}

        <span aria-hidden="true" className="mx-1 h-7 w-px bg-white/12" />

        <button
          type="button"
          onClick={handleDownloadCV}
          aria-label="Download CV"
          className="relative grid h-12 w-[58px] place-items-center rounded-2xl outline-none active:bg-white/[0.06]"
        >
          <Download className="h-[22px] w-[22px] text-red-400" />
        </button>
      </nav>
    </>
  )
})

/**
 * One letter per line, reading top to bottom. The letters are decorative here —
 * the link carries an aria-label so assistive tech reads "Projects", not "P R O".
 */
function VerticalLabel({ text, className }: { text: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "nav-letters relative z-10 flex flex-col items-center text-[13px] font-semibold uppercase leading-[1.35] tracking-[0.1em] transition-colors duration-300 lg:text-[15px]",
        className,
      )}
    >
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`}>{char}</span>
      ))}
    </span>
  )
}
