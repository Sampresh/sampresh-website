"use client";

import { PixelHeading } from "@/components/ui/pixel-heading-word";

const VARIANTS = [
  { font: "grid", label: "Grid" },
  { font: "circle", label: "Circle" },
  { font: "triangle", label: "Triangle" },
  { font: "line", label: "Line" },
] as const;

export default function PixelHeadingWordDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 bg-background px-6 py-16">
      <PixelHeading
        initialFont="square"
        hoverFont="circle"
        showLabel={false}
        className="text-6xl leading-none tracking-tight text-foreground md:text-8xl"
      >
        Pixel Fonts
      </PixelHeading>

      <div className="flex flex-col items-center gap-5">
        {VARIANTS.map((v) => (
          <div key={v.font} className="flex items-center gap-6">
            <span className="w-24 text-right text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {v.label}
            </span>
            <PixelHeading
              initialFont={v.font}
              hoverFont="square"
              showLabel={false}
              className="text-3xl leading-none text-foreground md:text-4xl"
            >
              Geist
            </PixelHeading>
          </div>
        ))}
      </div>
    </div>
  );
}
