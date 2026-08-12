import type { ProductShapeId } from "@/types/navigation";
import { cn } from "@/lib/cn";

interface ShapeTileProps {
  shape: ProductShapeId;
  className?: string;
}

export function ShapeTile({ shape, className }: ShapeTileProps) {
  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-inner ring-1 ring-white/50 transition-all duration-300 group-hover:scale-110 group-hover:from-accent/10 group-hover:to-accent/5 group-hover:shadow-soft sm:h-16 sm:w-16",
        shapeStyles[shape],
        className,
      )}
    >
      {shape === "floral" && (
        <div className="h-6 w-6 rounded-full border-2 border-accent/30" />
      )}
    </div>
  );
}

const shapeStyles: Record<ProductShapeId, string> = {
  round: "rounded-full",
  square: "rounded-lg",
  rectangle: "h-12 w-16 rounded-md sm:h-14 sm:w-[4.5rem]",
  hexagon: "clip-hexagon",
  heart: "clip-heart",
  star: "clip-star",
  bean: "rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]",
  egg: "rounded-[50%_/_60%_60%_40%_40%]",
  floral: "rounded-full border-2 border-dashed border-accent/30",
};
