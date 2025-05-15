"use client"

import { useEffect, useRef, useMemo, useState } from "react"
import { ArrowRight, Github, Linkedin, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePortfolio } from "@/contexts/portfolio-context"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const { profileInfo, isLoading } = usePortfolio()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCanvasReady, setIsCanvasReady] = useState(false)

  // Memoize social links to prevent unnecessary re-renders
  const socialLinks = useMemo(
    () => [
      {
        icon: <Github className="h-6 w-6" />,
        url: profileInfo.socialLinks.github,
        label: "GitHub",
      },
      {
        icon: <Linkedin className="h-6 w-6" />,
        url: profileInfo.socialLinks.linkedin,
        label: "LinkedIn",
      },
      {
        icon: <Youtube className="h-6 w-6" />,
        url: profileInfo.socialLinks.youtube,
        label: "YouTube",
      },
      {
        icon: <Instagram className="h-6 w-6" />,
        url: profileInfo.socialLinks.instagram,
        label: "Instagram",
      },
    ],
    [profileInfo.socialLinks],
  )

  // Defer canvas animation initialization to after main content is loaded
  useEffect(() => {
    if (isLoading) return

    // Use requestIdleCallback to defer non-critical initialization
    const initCanvas = () => {
      setIsCanvasReady(true)
    }

    if ("requestIdleCallback" in window) {
      // @ts-ignore - TypeScript doesn't have types for requestIdleCallback
      window.requestIdleCallback(initCanvas, { timeout: 2000 })
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(initCanvas, 200)
    }
  }, [isLoading])

  // Only initialize canvas animation after main content is loaded
  useEffect(() => {
    if (!isCanvasReady) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const pixelRatio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * pixelRatio
    canvas.height = rect.height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    // Adjust canvas size with CSS
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Reduce particle count for better performance
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const createParticles = () => {
      // Adjust particle count based on screen size for better performance
      // Reduce particle count significantly for better performance
      const particleCount = Math.min(Math.floor(window.innerWidth / 40), 30)
      particles.length = 0 // Clear existing particles

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.3 - 0.15, // Slower movement
          speedY: Math.random() * 0.3 - 0.15, // Slower movement
          color: `rgba(255, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.3 + 0.1})`,
        })
      }
    }

    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Limit to 30 FPS for better performance
    const fpsInterval = 1000 / fps

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastTime

      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval)

        ctx.clearRect(0, 0, rect.width, rect.height)

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()

          p.x += p.speedX
          p.y += p.speedY

          if (p.x < 0 || p.x > rect.width) p.speedX *= -1
          if (p.y < 0 || p.y > rect.height) p.speedY *= -1
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Throttle resize event for better performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect()
        const pixelRatio = window.devicePixelRatio || 1

        canvas.width = rect.width * pixelRatio
        canvas.height = rect.height * pixelRatio
        ctx.scale(pixelRatio, pixelRatio)

        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`

        createParticles()
      }, 200)
    }

    createParticles()
    animationFrameId = requestAnimationFrame(animate)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
    }
  }, [isCanvasReady])

  // Render a simplified loading state
  if (isLoading) {
    return (
      <section className="relative min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-zinc-900"></div>
            <div className="text-center md:text-left space-y-6">
              <div className="h-12 w-3/4 bg-zinc-900 rounded"></div>
              <div className="h-24 bg-zinc-900 rounded"></div>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="h-10 w-32 bg-zinc-900 rounded"></div>
                <div className="h-10 w-32 bg-zinc-900 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {isCanvasReady && <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-4 -left-4 w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-red-500/30 to-red-700/30 blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-red-500/20 to-red-700/20 blur-sm"></div>

            {/* Main image container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-red-400 via-red-500 to-red-600 z-0">
                <div className="w-full h-full rounded-full bg-black"></div>
              </div>

              {/* Profile image */}
              <div className="absolute inset-0 rounded-full p-2 overflow-hidden z-10">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  <Image
                    src="/images/profile.jpeg"
                    alt={profileInfo.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-red-500">{profileInfo.name}</span> <br />
              <span className="text-red-500">{profileInfo.title}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">{profileInfo.bio}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
              <Link href="/projects" passHref>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Contact Me
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
