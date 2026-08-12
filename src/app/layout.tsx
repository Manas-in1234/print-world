import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { CartProvider } from "@/lib/cart/cart-context";
import { PRINT_WORLD_LOGO } from "@/components/brand/PrintWorldLogo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Print World — Personalized Printing & Custom Products",
  description:
    "Premium personalized printing, custom products, and AI-powered design. Turn your ideas into something real.",
  icons: {
    icon: [{ url: PRINT_WORLD_LOGO, type: "image/jpeg" }],
    apple: [{ url: PRINT_WORLD_LOGO, type: "image/jpeg" }],
  },
  openGraph: {
    title: "Print World — Personalized Printing & Custom Products",
    description:
      "Premium personalized printing, custom products, and AI-powered design.",
    type: "website",
    siteName: "Print World",
  },
  twitter: {
    card: "summary_large_image",
    title: "Print World — Personalized Printing & Custom Products",
    description:
      "Premium personalized printing, custom products, and AI-powered design.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
