"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Particle } from "@/components/ui/particle-text-effect"

type RevealTag = "h1" | "h2" | "h3" | "p" | "span" | "div"

export interface ParticleRevealProps {
  /** Plain text to assemble. Kept as real DOM text once the reveal finishes. */
  text: string
  /** Element rendered underneath the canvas. */
  as?: RevealTag
  /** Classes for the real text element — the canvas copies its font and color. */
  className?: string
  /** Frames to run before handing off to the real text. */
  settleFrames?: number
  /** Particle sampling step. Higher means fewer, more separated particles. */
  pixelSteps?: number
  /** Dot size in CSS pixels. */
  dotSize?: number
  /** Crossfade duration in ms. */
  fadeMs?: number
  /** Delay before the assembly starts, in ms. */
  delay?: number
}

/**
 * Assembles text out of flying particles, then crossfades to the real element.
 *
 * The canvas mirrors the rendered text's font, size, color and line wrapping, so
 * the handoff lands in place. The DOM text is always present (just transparent
 * until the reveal ends), which keeps it selectable and readable by crawlers and
 * screen readers.
 */
export function ParticleReveal({
  text,
  as: Tag = "p",
  className,
  settleFrames = 150,
  pixelSteps = 6,
  dotSize = 2,
  fadeMs = 700,
  delay = 0,
}: ParticleRevealProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    const textEl = textRef.current
    const canvas = canvasRef.current
    if (!host || !textEl || !canvas) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      setDone(true)
      return
    }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const run = () => {
      if (cancelled) return

      const rect = textEl.getBoundingClientRect()
      if (rect.width < 2 || rect.height < 2) {
        setDone(true)
        return
      }

      const styles = getComputedStyle(textEl)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.ceil(rect.width)
      const h = Math.ceil(rect.height)

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext("2d")!
      ctx.scale(dpr, dpr)

      // Stamp the text exactly as the DOM renders it, including wrapping.
      const fontSize = parseFloat(styles.fontSize)
      const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.2
      const font = `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}`

      const stamp = document.createElement("canvas")
      stamp.width = w * dpr
      stamp.height = h * dpr
      const sctx = stamp.getContext("2d")!
      sctx.scale(dpr, dpr)
      sctx.font = font
      sctx.fillStyle = "#fff"
      sctx.textAlign = "left"
      sctx.textBaseline = "top"

      const lines: string[] = []
      let current = ""
      for (const word of text.split(/\s+/)) {
        const candidate = current ? `${current} ${word}` : word
        if (sctx.measureText(candidate).width > w && current) {
          lines.push(current)
          current = word
        } else {
          current = candidate
        }
      }
      if (current) lines.push(current)

      const topPad = Math.max((lineHeight - fontSize) / 2, 0)
      lines.forEach((line, i) => {
        sctx.fillText(line, 0, i * lineHeight + topPad)
      })

      // Sample the stamp into particle targets.
      const data = sctx.getImageData(0, 0, stamp.width, stamp.height).data
      const step = pixelSteps * dpr
      const particles: Particle[] = []
      const color = parseColor(styles.color)

      for (let y = 0; y < stamp.height; y += step) {
        for (let x = 0; x < stamp.width; x += step) {
          const alpha = data[(y * stamp.width + x) * 4 + 3]
          if (alpha < 128) continue

          const p = new Particle()
          // Enter from a ring around the text block.
          const angle = Math.random() * Math.PI * 2
          const distance = Math.max(w, h) * (0.6 + Math.random() * 0.9)
          p.pos.x = w / 2 + Math.cos(angle) * distance
          p.pos.y = h / 2 + Math.sin(angle) * distance
          p.target.x = x / dpr
          p.target.y = y / dpr
          p.maxSpeed = 6 + Math.random() * 8
          p.maxForce = p.maxSpeed * 0.28
          p.closeEnoughTarget = 24
          p.startColor = color
          p.targetColor = color
          p.colorWeight = 1
          particles.push(p)
        }
      }

      if (!particles.length) {
        setDone(true)
        return
      }

      let frame = 0
      const tick = () => {
        if (cancelled) return
        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
        for (const p of particles) {
          p.move()
          ctx.fillRect(p.pos.x, p.pos.y, dotSize, dotSize)
        }
        frame++
        if (frame >= settleFrames) {
          setDone(true)
          return
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      tick()
    }

    // Wait for webfonts so the stamp matches the final rendered text.
    const startWhenReady = () => {
      timer = setTimeout(run, delay)
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(startWhenReady).catch(startWhenReady)
    } else {
      startWhenReady()
    }

    return () => {
      cancelled = true
      clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, settleFrames, pixelSteps, dotSize, delay])

  return (
    <div ref={hostRef} className="relative">
      <Tag
        ref={textRef as never}
        className={cn("transition-opacity ease-out", className)}
        style={{ opacity: done ? 1 : 0, transitionDuration: `${fadeMs}ms` }}
      >
        {text}
      </Tag>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 transition-opacity ease-out"
        style={{ opacity: done ? 0 : 1, transitionDuration: `${fadeMs}ms` }}
      />
    </div>
  )
}

function parseColor(value: string): { r: number; g: number; b: number } {
  const match = value.match(/-?\d+(\.\d+)?/g)
  if (!match || match.length < 3) return { r: 255, g: 255, b: 255 }
  return { r: Number(match[0]), g: Number(match[1]), b: Number(match[2]) }
}

export default ParticleReveal
