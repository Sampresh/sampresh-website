"use client"

import { useEffect, useRef } from "react"

export interface Vector2D {
  x: number
  y: number
}

export class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    // Check if particle is close enough to its target to slow down
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    // Add force towards target
    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    // Move particle
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean, dotSize = 2) {
    // Blend towards target color
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    // Calculate current color
    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.fillRect(this.pos.x, this.pos.y, dotSize, dotSize)
    } else {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      // Set target outside the scene
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
      this.target.x = randomPos.x
      this.target.y = randomPos.y

      // Begin blending color to black
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0

      this.isKilled = true
    }
  }

  private generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }
}

interface RGB {
  r: number
  g: number
  b: number
}

interface ParticleTextEffectProps {
  words?: string[]
  /** Internal canvas resolution. The canvas is scaled to fit its container. */
  width?: number
  height?: number
  /** Font used to stamp the text that particles form. */
  fontSize?: number
  fontFamily?: string
  /** Sampling step — lower means more particles. */
  pixelSteps?: number
  /** Frames each word stays on screen before morphing to the next. */
  cycleFrames?: number
  /** Fixed colors cycled per word. Omit for the original random colors. */
  colors?: RGB[]
  /** Per-frame fill that creates the motion trail. Match the page background. */
  trailColor?: string
  /**
   * Fade the trail by erasing instead of painting over it, so the canvas stays
   * transparent and whatever sits behind it shows through.
   */
  transparent?: boolean
  /** Trail fade strength when `transparent` — higher clears faster. */
  trailFade?: number
  /**
   * Particle speed range in px/frame. The defaults suit a large canvas; a small
   * one needs slower particles or they orbit their target instead of settling.
   */
  speedRange?: [number, number]
  /** Steering force as a fraction of speed. Higher settles faster. */
  forceRatio?: number
  /** Distance at which a particle starts braking toward its target. */
  closeEnough?: number
  /** Horizontal alignment of the stamped word inside the canvas. */
  align?: "center" | "left"
  /** Dot size in canvas pixels. Raise it when the canvas is scaled down. */
  dotSize?: number
  /** The instructional caption under the canvas. */
  showCaption?: boolean
  className?: string
}

const DEFAULT_WORDS = ["HELLO", "21st.dev", "ParticleTextEffect", "BY", "KAINXU"]

export function ParticleTextEffect({
  words = DEFAULT_WORDS,
  width = 1000,
  height = 500,
  fontSize = 100,
  fontFamily = "Arial",
  pixelSteps = 6,
  cycleFrames = 240,
  colors,
  trailColor = "rgba(0, 0, 0, 0.1)",
  transparent = false,
  trailFade = 0.12,
  speedRange = [4, 10],
  forceRatio = 0.05,
  closeEnough = 100,
  align = "center",
  dotSize = 2,
  showCaption = true,
  className,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

  // Keep the latest config in refs so the animation loop never restarts mid-flight.
  const configRef = useRef({
    words, fontSize, fontFamily, pixelSteps, cycleFrames, colors, trailColor, transparent, trailFade,
    speedRange, forceRatio, closeEnough, align, dotSize,
  })
  configRef.current = {
    words, fontSize, fontFamily, pixelSteps, cycleFrames, colors, trailColor, transparent, trailFade,
    speedRange, forceRatio, closeEnough, align, dotSize,
  }

  const drawAsPoints = true

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }

  const nextWord = (word: string, canvas: HTMLCanvasElement, wordIndex: number) => {
    const cfg = configRef.current

    // Create off-screen canvas for text rendering
    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")!

    // Draw text
    offscreenCtx.fillStyle = "white"
    offscreenCtx.font = `bold ${cfg.fontSize}px ${cfg.fontFamily}`
    offscreenCtx.textAlign = cfg.align
    offscreenCtx.textBaseline = "middle"
    offscreenCtx.fillText(word, cfg.align === "left" ? 0 : canvas.width / 2, canvas.height / 2)

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // Pick this word's color
    const newColor = cfg.colors?.length
      ? cfg.colors[wordIndex % cfg.colors.length]
      : {
          r: Math.random() * 255,
          g: Math.random() * 255,
          b: Math.random() * 255,
        }

    const particles = particlesRef.current
    let particleIndex = 0

    // Collect coordinates
    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += cfg.pixelSteps * 4) {
      coordsIndexes.push(i)
    }

    // Shuffle coordinates for fluid motion
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex
      const alpha = pixels[pixelIndex + 3]

      if (alpha > 0) {
        const x = (pixelIndex / 4) % canvas.width
        const y = Math.floor(pixelIndex / 4 / canvas.width)

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()

          const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y

          const [minSpeed, maxSpeed] = cfg.speedRange
          particle.maxSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed
          particle.maxForce = particle.maxSpeed * cfg.forceRatio
          particle.closeEnoughTarget = cfg.closeEnough
          particle.particleSize = Math.random() * 6 + 6
          particle.colorBlendRate = Math.random() * 0.0275 + 0.0025

          particles.push(particle)
        }

        // Set color transition
        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor
        particle.colorWeight = 0

        particle.target.x = x
        particle.target.y = y
      }
    }

    // Kill remaining particles
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cfg = configRef.current
    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Motion blur. Over an opaque background we paint a translucent fill; over
    // page content we erase instead, which fades the trail without a black box.
    if (cfg.transparent) {
      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = `rgba(0, 0, 0, ${cfg.trailFade})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "source-over"
    } else {
      ctx.fillStyle = cfg.trailColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, drawAsPoints, cfg.dotSize)

      // Remove dead particles that are out of bounds
      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1)
        }
      }
    }

    // Handle mouse interaction
    if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2),
        )
        if (distance < 50) {
          particle.kill(canvas.width, canvas.height)
        }
      })
    }

    // Auto-advance words
    frameCountRef.current++
    if (frameCountRef.current % cfg.cycleFrames === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % cfg.words.length
      nextWord(cfg.words[wordIndexRef.current], canvas, wordIndexRef.current)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Re-seed when the word list changes (e.g. profile data loads from storage).
  const wordsKey = words.join("|")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    let cancelled = false

    const start = () => {
      if (cancelled) return
      particlesRef.current = []
      frameCountRef.current = 0
      wordIndexRef.current = 0
      const ctx = canvas.getContext("2d")!
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextWord(configRef.current.words[0], canvas, 0)
      animate()
    }

    // Wait for webfonts so the particles trace the real face, not a fallback.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(start).catch(start)
    } else {
      start()
    }

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isPressed = true
      mouseRef.current.isRightClick = e.button === 2
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * canvas.width
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * canvas.height
    }

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false
      mouseRef.current.isRightClick = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * canvas.width
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * canvas.height
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("contextmenu", handleContextMenu)

    return () => {
      cancelled = true
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("contextmenu", handleContextMenu)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsKey, width, height])

  if (!showCaption) {
    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={className}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <canvas
        ref={canvasRef}
        className={className ?? "border border-gray-800 rounded-lg shadow-2xl"}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="mt-4 text-white text-sm text-center max-w-md">
        <p className="mb-2">Particle Text Effect</p>
        <p className="text-gray-400 text-xs">
          Right-click and hold while moving mouse to destroy particles \u2022 Words change automatically every 4 seconds
        </p>
      </div>
    </div>
  )
}
