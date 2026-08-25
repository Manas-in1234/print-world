"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { useCartItemCount, useCartHydrated } from "@/lib/cart/cart-context";
import { NavbarAuth } from "@/components/layout/NavbarAuth";
import { PrintWorldLogo } from "@/components/brand/PrintWorldLogo";
import { cn } from "@/lib/cn";

const categoryNavLinks = [
  { label: "All Categories", href: "/products" },
  { label: "T-Shirts", href: "/t-shirts" },
  { label: "Mugs", href: "/mugs" },
  { label: "Photo Frames", href: "/acrylic-frames" },
  { label: "Clocks", href: "/clocks" },
  { label: "Posters", href: "/posters" },
  { label: "Business Cards", href: "/business-cards" },
  {
    label: "Gifts & Occasions",
    href: "/services#personalized-products",
    hasDropdown: true,
    subItems: [
      { label: "🪔 Diwali Offers", href: "/diwali", badge: "Up to 40% OFF" },
      { label: "🌸 Raksha Bandhan", href: "/raksha-bandhan", badge: "Up to 30% OFF" },
      { label: "💍 Wedding Gifts", href: "/wedding-gifts", badge: "Up to 40% OFF" },
      { label: "🎁 All Personalized Gifts", href: "/services#personalized-products" },
    ],
  },
  { label: "Corporate", href: "/business" },
  { label: "AI Studio", href: "/ai-studio", badge: "AI" },
  { label: "🔥 Deals", href: "/products?sort=price-asc", isDeal: true },
];

const popularSearches = [
  "Custom T-Shirts",
  "Acrylic Photo Frame",
  "Custom Clock",
  "Custom Mug",
  "Business Cards",
  "Posters",
  "AI Studio",
];

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
  );
}

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.511 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      )}
    </svg>
  );
}

export function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const itemCount = useCartItemCount();
  const isHydrated = useCartHydrated();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    setSearchFocused(false);
    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/products");
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSearchQuery(term);
    setSearchFocused(false);
    router.push(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full font-sans shadow-md">
      {/* ============================================================ */}
      {/* ROW 1 — TRUST BAR (Small white strip at the very top)       */}
      {/* ============================================================ */}
      <div className="border-b border-gray-200/90 bg-white px-4 py-1 text-xs font-medium text-gray-700">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6 gap-y-1 sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-start sm:gap-x-5">
            <span className="inline-flex items-center gap-1.5 hover:text-[#E5007D] transition-colors">
              <span>🎁</span>
              <span>Free Delivery on orders above ₹999</span>
            </span>
            <span className="hidden text-gray-300 sm:inline" aria-hidden="true">|</span>
            <span className="hidden items-center gap-1.5 md:inline-flex hover:text-[#E5007D] transition-colors">
              <span>🚀</span>
              <span>Express Dispatch Across India</span>
            </span>
            <span className="hidden text-gray-300 md:inline" aria-hidden="true">|</span>
            <span className="hidden items-center gap-1.5 lg:inline-flex hover:text-[#E5007D] transition-colors">
              <span>💳</span>
              <span>UPI / Card / COD</span>
            </span>
          </div>

          <div className="hidden items-center gap-4 text-gray-600 sm:flex">
            <Link
              href="/business"
              className="inline-flex items-center gap-1 hover:text-[#E5007D] transition-colors"
            >
              <span>🎁</span>
              <span>Bulk & Corporate Orders</span>
            </Link>
            <span className="text-gray-300" aria-hidden="true">|</span>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-1 hover:text-[#E5007D] transition-colors"
            >
              <span>🎧</span>
              <span>Help & Support</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ROW 2 — MAIN HEADER (Purple gradient background)             */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-r from-[#4B1FA8] via-[#6C2BD9] to-[#4B1FA8] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-6 sm:px-6 sm:py-3 lg:px-8">
          {/* Left: Mobile Menu Toggle & ORIGINAL PRINT WORLD LOGO */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>

            <PrintWorldLogo variant="header" priority />
          </div>

          {/* Center: Large Search Bar */}
          <div ref={searchContainerRef} className="relative hidden flex-1 max-w-2xl lg:block">
            <form onSubmit={handleSearchSubmit} className="relative flex w-full items-center">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search for products, gifts, photos & more..."
                className="w-full rounded-l-xl border-0 bg-white py-2.5 pl-4 pr-4 text-sm text-gray-900 shadow-inner placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E5007D]"
                aria-label="Search for products, gifts, photos & more..."
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 rounded-r-xl bg-[#E5007D] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#C70068] active:scale-95 shadow-sm"
                aria-label="Search"
              >
                <SearchIcon className="h-4 w-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl text-gray-900">
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Popular Searches</span>
                  <span className="text-[#E5007D] text-[11px] font-semibold lowercase">trending in India</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onMouseDown={() => handleSuggestionClick(term)}
                      className="rounded-full bg-gray-100 px-3.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-[#F3E8FF] hover:text-[#6C2BD9]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Account & Cart Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <NavbarAuth variant="purple" />
            </div>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#6C2BD9] active:scale-95 border border-white/20"
              aria-label="Shopping Cart"
            >
              <CartIcon className="h-5 w-5" />
              <span className="hidden sm:inline">My Cart</span>
              {isHydrated && itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFD200] px-1.5 text-[11px] font-extrabold text-gray-950 shadow-xs">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Underneath */}
        <div className="px-4 pb-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex w-full items-center">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, gifts, photos & more..."
              className="w-full rounded-l-lg border-0 bg-white py-2 pl-3.5 pr-2 text-xs sm:text-sm text-gray-900 shadow-inner placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E5007D]"
              aria-label="Search for products, gifts, photos & more..."
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-1 rounded-r-lg bg-[#E5007D] px-3.5 py-2 text-xs font-bold text-white shadow-xs"
              aria-label="Search"
            >
              <SearchIcon className="h-3.5 w-3.5" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ROW 3 — CATEGORY NAVIGATION (White background)              */}
      {/* ============================================================ */}
      <div className="border-b border-gray-200 bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav
            className="flex w-full items-center gap-1 overflow-x-auto py-2 scrollbar-none sm:gap-2"
            aria-label="Product categories"
          >
            {categoryNavLinks.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="group relative shrink-0">
                    <Link
                      href={item.href}
                      className="relative flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-[#F3E8FF] hover:text-[#6C2BD9] sm:px-3 sm:text-sm"
                    >
                      <span>{item.label}</span>
                      <svg
                        className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#6C2BD9] transition-transform group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </Link>

                    {/* Desktop Dropdown Popover */}
                    <div className="pointer-events-none absolute left-0 top-full z-50 min-w-[220px] rounded-xl border border-gray-200 bg-white p-2 shadow-xl opacity-0 translate-y-2 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Campaigns & Occasions
                      </div>
                      <div className="mt-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-[#F3E8FF] hover:text-[#6C2BD9] transition-colors"
                          >
                            <span>{sub.label}</span>
                            {sub.badge && (
                              <span className="rounded bg-pink-100 px-1.5 py-0.5 text-[9px] font-bold text-[#E5007D]">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3 sm:text-sm",
                    item.isDeal
                      ? "bg-[#FFD200]/20 text-amber-950 font-bold hover:bg-[#FFD200]/30"
                      : "text-gray-700 hover:bg-[#F3E8FF] hover:text-[#6C2BD9]",
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-sm bg-[#6C2BD9] px-1 py-0.2 text-[9px] font-bold uppercase text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[116px] z-50 overflow-y-auto bg-white shadow-2xl lg:hidden">
          <div className="divide-y divide-gray-100 p-4">
            {/* Account on mobile */}
            <div className="pb-4">
              <div className="flex items-center justify-between">
                <NavbarAuth variant="light" onNavigate={() => setMobileOpen(false)} />
                <Link
                  href="/cart"
                  className="flex items-center gap-1.5 rounded-lg bg-[#F3E8FF] px-3 py-1.5 text-xs font-semibold text-[#6C2BD9]"
                  onClick={() => setMobileOpen(false)}
                >
                  <CartIcon className="h-4 w-4" />
                  <span>My Cart ({isHydrated ? itemCount : 0})</span>
                </Link>
              </div>
            </div>

            {/* Festive Campaign Highlights on Mobile */}
            <div className="py-3">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#E5007D] flex items-center gap-1">
                <span>✨ Festive Specials</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="/diwali"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center justify-center rounded-xl bg-purple-50 border border-purple-100 p-2.5 text-center text-xs font-bold text-purple-900 hover:bg-purple-100"
                >
                  <span className="text-lg mb-1">🪔</span>
                  <span>Diwali</span>
                  <span className="text-[9px] text-[#E5007D] font-extrabold">40% OFF</span>
                </Link>
                <Link
                  href="/raksha-bandhan"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center justify-center rounded-xl bg-pink-50 border border-pink-100 p-2.5 text-center text-xs font-bold text-pink-900 hover:bg-pink-100"
                >
                  <span className="text-lg mb-1">🌸</span>
                  <span>Rakhi</span>
                  <span className="text-[9px] text-[#E5007D] font-extrabold">30% OFF</span>
                </Link>
                <Link
                  href="/wedding-gifts"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center justify-center rounded-xl bg-amber-50 border border-amber-100 p-2.5 text-center text-xs font-bold text-amber-950 hover:bg-amber-100"
                >
                  <span className="text-lg mb-1">💍</span>
                  <span>Wedding</span>
                  <span className="text-[9px] text-[#E5007D] font-extrabold">40% OFF</span>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="py-3">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Browse Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categoryNavLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-2.5 text-xs font-medium transition-colors",
                      item.isDeal
                        ? "border-amber-300 bg-[#FFD200]/15 text-amber-950 font-bold"
                        : "border-gray-100 bg-gray-50 text-gray-800 hover:bg-[#F3E8FF] hover:text-[#6C2BD9]",
                    )}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded bg-[#6C2BD9] px-1 py-0.5 text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* More info */}
            <div className="py-3 space-y-2">
              <Link
                href="/business"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#E5007D]"
                onClick={() => setMobileOpen(false)}
              >
                🏢 Bulk & Corporate Printing
              </Link>
              <Link
                href="/ai-studio"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#6C2BD9]"
                onClick={() => setMobileOpen(false)}
              >
                ✨ AI Studio Designer
              </Link>
              <Link
                href="/about"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                ℹ️ About Print World
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
