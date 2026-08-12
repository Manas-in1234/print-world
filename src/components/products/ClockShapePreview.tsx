import type { ClockShapeId } from "@/data/clock-shapes";
import { cn } from "@/lib/cn";

interface ClockShapePreviewProps {
  shape: ClockShapeId | string;
  className?: string;
}

const shapeStyles: Record<string, string> = {
  round: "rounded-full",
  square: "rounded-xl",
  rectangle: "rounded-lg aspect-[4/3] w-[90%]",
  oval: "rounded-[50%]",
  rhombus: "rotate-45 rounded-lg scale-75",
  custom: "rounded-2xl border-2 border-dashed border-accent/40",
  heart: "clip-heart",
};

const accentColors: Partial<Record<string, string>> = {
  round: "from-neutral-100 to-neutral-200",
  square: "from-stone-100 to-stone-200",
  rectangle: "from-stone-100 to-stone-200",
  oval: "from-neutral-50 to-neutral-100",
  rhombus: "from-amber-50 to-amber-100",
  custom: "from-surface to-background",
  heart: "from-rose-50 to-rose-100",
};

export function ClockShapePreview({ shape, className }: ClockShapePreviewProps) {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      <div
        className={cn(
          "relative flex h-[85%] w-[85%] items-center justify-center bg-gradient-to-br shadow-inner",
          accentColors[shape] ?? "from-neutral-100 to-neutral-200",
          shapeStyles[shape] ?? "rounded-full",
        )}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute h-1.5 w-0.5 rounded-full bg-foreground/20"
            style={{
              top: "8%",
              left: "50%",
              transform: `translateX(-50%) rotate(${deg}deg)`,
              transformOrigin: "50% 420%",
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 h-[32%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[45deg] rounded-full bg-foreground/80" />
        <div className="absolute left-1/2 top-1/2 h-[22%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full -rotate-[30deg] rounded-full bg-foreground/50" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-sm" />
        <div className="absolute inset-[18%] rounded-[inherit] bg-gradient-to-br from-accent/10 to-transparent opacity-60" />
      </div>
    </div>
  );
}
