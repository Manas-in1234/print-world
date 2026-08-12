import type { ProductShape } from "@/types/product";
import { ShapePreview } from "@/components/products/ProductMockup";

const clockShapes: { shape: ProductShape; label: string }[] = [
  { shape: "round", label: "Round" },
  { shape: "square", label: "Square" },
  { shape: "hexagon", label: "Hexagon" },
  { shape: "heart", label: "Heart" },
  { shape: "star", label: "Star" },
];

export function ClockPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center justify-center gap-2">
        {clockShapes.slice(0, 3).map(({ shape, label }) => (
          <div key={shape} className="flex flex-col items-center gap-1">
            <ShapePreview shape={shape} size="sm" showHands />
            <span className="text-[10px] text-muted">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {clockShapes.slice(3).map(({ shape, label }) => (
          <div key={shape} className="flex flex-col items-center gap-1">
            <ShapePreview shape={shape} size="sm" showHands />
            <span className="text-[10px] text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
