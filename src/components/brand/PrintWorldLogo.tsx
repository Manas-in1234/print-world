import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export const PRINT_WORLD_LOGO = "/brand/print-world-logo.jpg";

interface PrintWorldLogoProps {
  variant?: "header" | "footer";
  linked?: boolean;
  showWordmark?: boolean;
  className?: string;
  priority?: boolean;
}

const markSizes = {
  header: { width: 40, height: 40, className: "h-9 w-9 sm:h-10 sm:w-10" },
  footer: { width: 36, height: 36, className: "h-8 w-8" },
} as const;

export function PrintWorldLogo({
  variant = "header",
  linked = true,
  showWordmark,
  className,
  priority = false,
}: PrintWorldLogoProps) {
  const { width, height, className: markClass } = markSizes[variant];
  const withWordmark = showWordmark ?? variant === "header";

  const mark = (
    <Image
      src={PRINT_WORLD_LOGO}
      alt=""
      width={width}
      height={height}
      priority={priority}
      aria-hidden={withWordmark}
      className={cn(markClass, "shrink-0 object-contain", className)}
    />
  );

  const brand = withWordmark ? (
    <>
      {mark}
      <span className="font-display text-[1.05rem] font-semibold tracking-[0.14em] text-foreground sm:text-[1.15rem]">
        Print World
      </span>
    </>
  ) : (
    <Image
      src={PRINT_WORLD_LOGO}
      alt="Print World"
      width={variant === "header" ? 140 : 120}
      height={variant === "header" ? 36 : 32}
      priority={priority}
      className={cn(
        variant === "header" ? "h-8 w-auto sm:h-9" : "h-7 w-auto",
        "object-contain object-left",
        className,
      )}
    />
  );

  if (!linked) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", withWordmark && "gap-2.5 sm:gap-3")}>
        {brand}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-w-0 shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:gap-3",
      )}
      aria-label="Print World — Home"
    >
      {brand}
    </Link>
  );
}
