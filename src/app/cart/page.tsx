"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format-price";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-foreground">Your Cart</h1>

          {items.length === 0 ? (
            <div className="mt-12 text-center">
              <p className="text-muted">Your cart is empty.</p>
              <Button href="/products" size="lg" className="mt-6">
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              <ul className="mt-8 divide-y divide-card-border">
                {items.map((item) => (
                  <li key={item.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Link href={`/products/${item.productSlug}`} className="font-medium text-foreground hover:text-accent">
                        {item.productName}
                      </Link>
                      {(item.variantName || item.shapeName) && (
                        <p className="mt-1 text-sm text-muted">
                          {[item.variantName, item.shapeName].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-medium">{formatPrice(item.unitPrice)} each</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border hover:border-accent"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border hover:border-accent"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="min-w-[5rem] text-right font-medium">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-muted hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-card-border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-xl font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-2 text-sm text-muted">Taxes and shipping calculated at checkout (Stage 4).</p>
              <Button size="lg" className="mt-6 w-full" variant="primary" href="/checkout">
                Proceed to Checkout
              </Button>
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
