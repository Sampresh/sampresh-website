"use client"

import { useMemo } from "react"
import { ArrowRight, Github, Linkedin, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { usePortfolio } from "@/contexts/portfolio-context"
import ConstellationField from "@/components/ui/constellation-field"
import { ParticleReveal } from "@/components/ui/particle-reveal"
import { ParticleTextEffect } from "@/components/ui/particle-text-effect"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const { profileInfo } = usePortfolio()

  // Memoize social links to prevent unnecessary re-renders; skip any that are unset
  const socialLinks = useMemo(
    () =>
      [
        { icon: <Github className="h-5 w-5" />, url: profileInfo.socialLinks?.github, label: "GitHub" },
        { icon: <Linkedin className="h-5 w-5" />, url: profileInfo.socialLinks?.linkedin, label: "LinkedIn" },
        { icon: <Youtube className="h-5 w-5" />, url: profileInfo.socialLinks?.youtube, label: "YouTube" },
        { icon: <Instagram className="h-5 w-5" />, url: profileInfo.socialLinks?.instagram, label: "Instagram" },
      ].filter((link) => Boolean(link.url)),
    [profileInfo.socialLinks],
  )

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Constellation background: gold palette rotated to the site's red, faded into the black page */}
      <div className="absolute inset-0 z-0">
        <ConstellationField mode="dark" hue={-43} saturation={1.6} density={0.8} style={{ opacity: 0.6 }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="max-w-3xl py-16 sm:py-20">
          {/* Name, role and bio all assemble from particles at the same time. */}
          <ParticleReveal
            as="h1"
            text={profileInfo.name}
            pixelSteps={5}
            settleFrames={130}
            className="font-pixel-square text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          />

          {/* Roles cycle indefinitely, so this one stays a canvas. */}
          <div className="mt-3 sm:mt-4">
            <ParticleTextEffect
              words={profileInfo.roles}
              width={520}
              height={72}
              fontSize={46}
              fontFamily="Arial, sans-serif"
              align="left"
              pixelSteps={4}
              dotSize={3}
              cycleFrames={420}
              speedRange={[3, 6]}
              forceRatio={0.28}
              closeEnough={45}
              colors={[{ r: 239, g: 68, b: 68 }]}
              transparent
              trailFade={0.3}
              showCaption={false}
              className="w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[28rem]"
            />
            <span className="sr-only">{profileInfo.roles.join(", ")}</span>
          </div>

          <ParticleReveal
            as="p"
            text={profileInfo.bio}
            pixelSteps={4}
            settleFrames={150}
            className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-gray-400 sm:mt-7 sm:text-base lg:text-lg"
          />

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button asChild className="bg-red-500 text-white hover:bg-red-600">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-red-500"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
