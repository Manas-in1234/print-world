import type { ProductShapeId } from "@/types/navigation";
import { cn } from "@/lib/cn";

interface ClockShapePreviewProps {
  shape: ProductShapeId;
  className?: string;
}

const shapeStyles: Record<ProductShapeId, string> = {
  round: "rounded-full",
  square: "rounded-xl",
  rectangle: "rounded-lg",
  hexagon: "clip-hexagon",
  heart: "clip-heart",
  star: "clip-star",
  bean: "rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]",
  egg: "rounded-[50%_/_60%_60%_40%_40%]",
  floral: "rounded-full border-2 border-dashed border-accent/30",
};

const accentColors: Partial<Record<ProductShapeId, string>> = {
  round: "from-neutral-100 to-neutral-200",
  square: "from-stone-100 to-stone-200",
  hexagon: "from-amber-50 to-amber-100",
  heart: "from-rose-50 to-rose-100",
  star: "from-yellow-50 to-yellow-100",
};

export function ClockShapePreview({ shape, className }: ClockShapePreviewProps) {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      <div
        className={cn(
          "relative flex h-[85%] w-[85%] items-center justify-center bg-gradient-to-br shadow-inner",
          accentColors[shape] ?? "from-neutral-100 to-neutral-200",
          shapeStyles[shape],
        )}
      >
        {/* Hour markers */}
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
        {/* Hands */}
        <div className="absolute left-1/2 top-1/2 h-[32%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[45deg] rounded-full bg-foreground/80" />
        <div className="absolute left-1/2 top-1/2 h-[22%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full -rotate-[30deg] rounded-full bg-foreground/50" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-sm" />
        {/* Custom design area */}
        <div className="absolute inset-[18%] rounded-[inherit] bg-gradient-to-br from-accent/10 to-transparent opacity-60" />
      </div>
    </div>
  );
}
