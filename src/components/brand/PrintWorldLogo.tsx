import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export const PRINT_WORLD_LOGO_SVG = "/brand/print-world-logo.svg";
export const PRINT_WORLD_LOGO_IMG = "/brand/print-world-logo.jpg";
export const PRINT_WORLD_LOGO = "/brand/print-world-logo.svg";

interface PrintWorldLogoProps {
  variant?: "header" | "footer" | "standalone";
  linked?: boolean;
  className?: string;
  priority?: boolean;
}

export function PrintWorldLogo({
  variant = "header",
  linked = true,
  className,
  priority = true,
}: PrintWorldLogoProps) {
  const logoElement = (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-xs transition-transform duration-200 hover:scale-[1.02]",
        variant === "header" && "h-9 sm:h-10 px-2 sm:px-2.5",
        variant === "footer" && "h-9 sm:h-10 px-2 sm:px-2.5",
        variant === "standalone" && "h-12 px-3",
        className,
      )}
    >
      <Image
        src={PRINT_WORLD_LOGO_SVG}
        alt="Print World"
        width={180}
        height={42}
        priority={priority}
        className={cn(
          "h-full w-auto object-contain",
          variant === "header" && "max-h-7 sm:max-h-8",
          variant === "footer" && "max-h-7 sm:max-h-8",
          variant === "standalone" && "max-h-10",
        )}
      />
    </div>
  );

  if (!linked) {
    return logoElement;
  }

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      aria-label="Print World — Home"
    >
      {logoElement}
    </Link>
  );
}
