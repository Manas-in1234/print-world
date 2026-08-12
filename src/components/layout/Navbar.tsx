"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { megaMenus, simpleNavLinks } from "@/data/mega-menu";
import { useCartItemCount, useCartHydrated } from "@/lib/cart/cart-context";
import { NavbarAuth } from "@/components/layout/NavbarAuth";
import { cn } from "@/lib/cn";

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.511 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      )}
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemCount = useCartItemCount();
  const isHydrated = useCartHydrated();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 z-50 border-b border-card-border/60 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="font-display text-lg font-semibold tracking-[0.15em] text-foreground transition-opacity hover:opacity-80 sm:text-xl">
          PRINT WORLD
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {megaMenus.map((menu) => (
            <li
              key={menu.key}
              className="relative"
              onMouseEnter={() => setActiveMenu(menu.key)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
                aria-expanded={activeMenu === menu.key}
                aria-haspopup="true"
                onClick={() => setActiveMenu(activeMenu === menu.key ? null : menu.key)}
              >
                {menu.label}
                <ChevronIcon open={activeMenu === menu.key} />
              </button>

              {activeMenu === menu.key && (
                <div className="absolute left-0 top-full z-50 pt-2">
                  <div className={cn(
                    "rounded-2xl border border-card-border bg-card p-4 shadow-soft-hover",
                    menu.key === "products" ? "w-[480px]" : "w-64",
                  )}>
                    <div className={cn(menu.key === "products" ? "grid grid-cols-2 gap-1" : "space-y-1")}>
                      {menu.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="block text-sm font-medium text-foreground">{item.label}</span>
                          {item.description && (
                            <span className="mt-0.5 block text-xs text-muted">{item.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}

          {simpleNavLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <NavbarAuth />
          <Link href="/cart" className="relative flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-accent hover:shadow-soft" aria-label="Shopping cart">
            <CartIcon />
            <span>Cart</span>
            {isHydrated && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-background">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </div>

        <button type="button" className="rounded-lg p-2 text-foreground transition-colors hover:bg-surface lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          <MenuIcon open={mobileOpen} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-card-border bg-background lg:hidden">
          <div className="max-h-[80vh] overflow-y-auto px-4 py-4">
            {megaMenus.map((menu) => (
              <div key={menu.key} className="border-b border-card-border/60 py-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground"
                  onClick={() => setMobileExpanded(mobileExpanded === menu.key ? null : menu.key)}
                  aria-expanded={mobileExpanded === menu.key}
                >
                  {menu.label}
                  <ChevronIcon open={mobileExpanded === menu.key} />
                </button>
                {mobileExpanded === menu.key && (
                  <ul className="mt-1 space-y-0.5 pb-2 pl-3">
                    {menu.items.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground" onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {simpleNavLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="mt-3 space-y-1 border-t border-card-border pt-3">
              <NavbarAuth onNavigate={() => setMobileOpen(false)} />
              <Link href="/cart" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>
                <CartIcon /> Cart {isHydrated && itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
