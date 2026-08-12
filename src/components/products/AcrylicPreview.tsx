import type { AcrylicVariant } from "@/types/navigation";
import { cn } from "@/lib/cn";

interface AcrylicPreviewProps {
  variant: AcrylicVariant | string;
  className?: string;
}

export function AcrylicPreview({ variant, className }: AcrylicPreviewProps) {
  const v = variant as AcrylicVariant;
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      <div className="relative h-[85%] w-[85%]">
        <div className={cn("absolute inset-0 border-2 border-white/70 bg-gradient-to-br from-white/50 via-accent/10 to-white/20 shadow-lg backdrop-blur-sm", variantStyles[v] ?? "rounded-xl")}>
          <PreviewInner variant={v} />
        </div>
        <div className={cn("absolute -inset-1 -z-10 opacity-30 blur-md bg-accent/20", variantStyles[v] ?? "rounded-xl")} />
      </div>
    </div>
  );
}

const variantStyles: Record<AcrylicVariant, string> = {
  "bean-portrait": "aspect-[3/4] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]",
  "egg-portrait": "aspect-[3/4] rounded-[50%_/_60%_60%_40%_40%]",
  "bean-landscape": "aspect-[4/3] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]",
  "egg-landscape": "aspect-[4/3] rounded-[50%_/_55%_55%_45%_45%]",
  "photo-collage-5": "rounded-xl",
  "large-square-collage": "rounded-xl",
  "couple-acrylic": "rounded-2xl",
  "hexagon-7-photo": "clip-hexagon",
};

function PreviewInner({ variant }: { variant: AcrylicVariant }) {
  switch (variant) {
    case "bean-portrait":
    case "egg-portrait":
    case "bean-landscape":
    case "egg-landscape":
      return <div className="absolute inset-3 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent" />;
    case "photo-collage-5":
      return (
        <div className="absolute inset-2 grid grid-cols-3 grid-rows-2 gap-1">
          <div className="col-span-2 row-span-2 rounded bg-gradient-to-br from-accent/25 to-accent/5" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded bg-gradient-to-br from-accent/20 to-accent/5" />
          ))}
        </div>
      );
    case "large-square-collage":
      return (
        <div className="absolute inset-2 grid grid-cols-3 gap-1">
          <div className="col-span-2 row-span-2 rounded bg-gradient-to-br from-accent/25 to-accent/5" />
          <div className="rounded bg-gradient-to-br from-accent/15 to-accent/5" />
          <div className="rounded bg-gradient-to-br from-accent/15 to-accent/5" />
        </div>
      );
    case "couple-acrylic":
      return (
        <div className="absolute inset-3 flex gap-2">
          <div className="flex-1 rounded-[50%_/_60%_60%_40%_40%] bg-gradient-to-br from-accent/25 to-accent/5" />
          <div className="flex-1 rounded-[50%_/_60%_60%_40%_40%] bg-gradient-to-br from-accent/20 to-accent/5" />
        </div>
      );
    case "hexagon-7-photo":
      return (
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-5 w-5 clip-hexagon bg-gradient-to-br from-accent/30 to-accent/5" />
            ))}
          </div>
        </div>
      );
    default:
      return <div className="absolute inset-3 bg-gradient-to-br from-accent/20 to-transparent" />;
  }
}
