import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "magenta"
  | "secondary"
  | "purple"
  | "white"
  | "outline-white"
  | "ghost";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: undefined;
  "aria-label"?: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  // Primary Print World Magenta CTA
  primary:
    "bg-[#E5007D] text-white font-semibold hover:bg-[#C70068] shadow-sm hover:shadow-md active:scale-[0.99]",
  magenta:
    "bg-[#E5007D] text-white font-semibold hover:bg-[#C70068] shadow-sm hover:shadow-md active:scale-[0.99]",
  // Purple brand button
  purple:
    "bg-[#6C2BD9] text-white font-semibold hover:bg-[#4B1FA8] shadow-sm hover:shadow-md active:scale-[0.99]",
  // Clean secondary outline / surface
  secondary:
    "border border-gray-300 bg-white text-gray-900 font-semibold hover:border-[#6C2BD9] hover:text-[#6C2BD9] hover:bg-[#F3E8FF]/40 active:scale-[0.99] shadow-xs",
  // Solid White with Magenta Text
  white:
    "bg-white text-[#E5007D] font-bold hover:bg-gray-50 active:scale-[0.99] shadow-md",
  // Outline White for dark/purple backgrounds
  "outline-white":
    "border border-white/80 bg-white/10 text-white font-semibold hover:bg-white hover:text-[#4B1FA8] active:scale-[0.99] backdrop-blur-xs",
  // Minimal ghost button
  ghost:
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:scale-[0.99]",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3.5 py-2 text-xs sm:text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-7 py-3 text-base sm:px-8 sm:py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5007D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      aria-label={buttonProps["aria-label"]}
    >
      {children}
    </button>
  );
}
