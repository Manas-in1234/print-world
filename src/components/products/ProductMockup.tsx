import type { ProductPlaceholder, ProductShape } from "@/types/product";
import { cn } from "@/lib/cn";

interface ProductMockupProps {
  type: ProductPlaceholder;
  className?: string;
}

export function ProductMockup({ type, className }: ProductMockupProps) {
  switch (type) {
    case "tshirt":
      return <TShirtMockup className={className} />;
    case "frame":
      return <FrameMockup className={className} />;
    case "mug":
      return <MugMockup className={className} />;
    case "card":
      return <CardMockup className={className} />;
    case "poster":
      return <PosterMockup className={className} />;
    case "clock":
      return <ClockMockup className={className} />;
    default:
      return null;
  }
}

function TShirtMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <div className="relative h-[75%] w-[70%]">
        <div className="absolute inset-0 rounded-t-[40%] bg-gradient-to-b from-neutral-200 to-neutral-300 shadow-inner" />
        <div className="absolute left-[15%] top-0 h-[35%] w-[25%] rounded-b-full bg-gradient-to-b from-neutral-200 to-neutral-300" />
        <div className="absolute right-[15%] top-0 h-[35%] w-[25%] rounded-b-full bg-gradient-to-b from-neutral-200 to-neutral-300" />
        <div className="absolute left-1/2 top-[30%] h-[35%] w-[45%] -translate-x-1/2 rounded-lg bg-gradient-to-br from-accent/30 to-accent/10" />
        <div className="absolute left-1/2 top-[42%] h-1 w-[30%] -translate-x-1/2 rounded bg-accent/40" />
      </div>
    </div>
  );
}

function FrameMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center p-6",
        className,
      )}
    >
      <div className="relative h-[80%] w-[75%] rounded-sm border-[6px] border-white/80 bg-white/20 shadow-lg backdrop-blur-sm">
        <div className="absolute inset-2 bg-gradient-to-br from-accent/20 via-surface to-accent/10" />
        <div className="absolute bottom-4 left-4 right-4 h-8 rounded bg-white/30" />
      </div>
    </div>
  );
}

function MugMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-end justify-center pb-4",
        className,
      )}
    >
      <div className="relative h-[70%] w-[45%]">
        <div className="absolute inset-x-0 bottom-0 top-[8%] rounded-b-2xl rounded-t-lg bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 shadow-md" />
        <div className="absolute left-1/2 top-[20%] h-[50%] w-[60%] -translate-x-1/2 rounded bg-gradient-to-br from-accent/25 to-accent/5" />
        <div className="absolute -right-[28%] top-[25%] h-[45%] w-[35%] rounded-r-full border-[8px] border-neutral-200 border-l-transparent" />
      </div>
    </div>
  );
}

function CardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <div className="relative h-[55%] w-[75%]">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-neutral-300/50 shadow-sm" />
        <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-lg bg-neutral-200/70 shadow-sm" />
        <div className="absolute inset-0 rounded-lg border border-card-border bg-card shadow-md">
          <div className="p-4">
            <div className="mb-3 h-2 w-1/3 rounded bg-foreground/20" />
            <div className="mb-1.5 h-1.5 w-2/3 rounded bg-muted/30" />
            <div className="h-1.5 w-1/2 rounded bg-muted/20" />
            <div className="absolute bottom-4 right-4 h-6 w-6 rounded-full bg-accent/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PosterMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <div className="relative h-[85%] w-[60%]">
        <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-neutral-100 to-neutral-200 shadow-lg">
          <div className="absolute inset-3 bg-gradient-to-br from-accent/20 via-transparent to-accent/10" />
          <div className="absolute bottom-6 left-3 right-3 space-y-2">
            <div className="h-2 w-3/4 rounded bg-foreground/15" />
            <div className="h-1.5 w-1/2 rounded bg-muted/25" />
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 h-3 w-[110%] -translate-x-1/2 rounded-full bg-neutral-300/60 blur-sm" />
      </div>
    </div>
  );
}

function ClockMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <ShapePreview shape="round" size="lg" showHands />
    </div>
  );
}

interface ShapePreviewProps {
  shape: ProductShape;
  size?: "sm" | "md" | "lg";
  showHands?: boolean;
  className?: string;
}

export function ShapePreview({
  shape,
  size = "md",
  showHands = false,
  className,
}: ShapePreviewProps) {
  const sizeMap = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-28 w-28",
  };

  const shapeStyles: Record<ProductShape, string> = {
    round: "rounded-full",
    square: "rounded-lg",
    rectangle: "rounded-md",
    hexagon: "clip-hexagon",
    heart: "clip-heart",
    star: "clip-star",
    bean: "clip-bean",
    egg: "clip-egg",
    floral: "clip-floral rounded-full",
  };

  const rectangleSizeMap = {
    sm: "h-8 w-12",
    md: "h-12 w-16",
    lg: "h-20 w-28",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-inner",
        shape === "rectangle" ? rectangleSizeMap[size] : sizeMap[size],
        shapeStyles[shape],
        className,
      )}
    >
      {showHands && (
        <>
          <div className="absolute left-1/2 top-1/2 h-[35%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[30deg] rounded-full bg-foreground/70" />
          <div className="absolute left-1/2 top-1/2 h-[25%] w-0.5 origin-bottom -translate-x-1/2 -translate-y-full -rotate-[60deg] rounded-full bg-foreground/50" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </>
      )}
    </div>
  );
}
