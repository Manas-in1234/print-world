"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/lib/cart/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format-price";

declare global {
  interface Window {
    Razorpay?: new (options: object) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [shippingRate, setShippingRate] = useState(99);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(999);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentConfigured, setPaymentConfigured] = useState(true);

  useEffect(() => {
    fetch("/api/settings/public")
      .then((r) => r.json())
      .then((data) => {
        if (data.shipping?.flatRate != null) setShippingRate(data.shipping.flatRate);
        if (data.shipping?.freeThreshold != null) setFreeShippingThreshold(data.shipping.freeThreshold);
      })
      .catch(() => {});
  }, []);

  const shipping = subtotal >= freeShippingThreshold ? 0 : shippingRate;
  const total = subtotal + shipping;

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: { address, city, pincode },
          items,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error ?? "Order failed");

      const payRes = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, orderId: orderData.orderId }),
      });
      const payData = await payRes.json();

      if (!payRes.ok) {
        setPaymentConfigured(false);
        setError(payData.error ?? "Payment is not configured yet.");
        document.cookie = `pw_order_access=${encodeURIComponent(JSON.stringify([orderData.orderId]))}; path=/; max-age=2592000; samesite=lax`;
        clearCart();
        router.push(`/orders/${orderData.orderId}?pending=true`);
        return;
      }

      if (!window.Razorpay) throw new Error("Payment SDK not loaded");

      const rzp = new window.Razorpay({
        key: payData.keyId,
        amount: payData.amount,
        currency: payData.currency,
        name: "Print World",
        description: orderData.orderNumber,
        order_id: payData.razorpayOrderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          await fetch("/api/payments/razorpay", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderData.orderId,
            }),
          });
          clearCart();
          document.cookie = `pw_order_access=${encodeURIComponent(JSON.stringify([orderData.orderId]))}; path=/; max-age=2592000; samesite=lax`;
          router.push(`/orders/${orderData.orderId}`);
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#2c2c2c" },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 py-16 text-center">
          <Container>
            <p className="text-muted">Your cart is empty.</p>
            <Button href="/products" className="mt-4">Browse Products</Button>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Navbar />
      <main id="main-content" className="flex-1 py-12">
        <Container className="max-w-4xl">
          <h1 className="font-display text-3xl font-semibold">Checkout</h1>
          <form onSubmit={handleCheckout} className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <input required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm" />
              <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm" />
              <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm" />
              <textarea required placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm" rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-card-border px-4 py-3 text-sm" />
                <input required placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="rounded-xl border border-card-border px-4 py-3 text-sm" />
              </div>
            </div>
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-soft">
              <h2 className="font-semibold">Order Summary</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>{i.productName} × {i.quantity}</span>
                    <span>{formatPrice(i.unitPrice * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-card-border pt-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
                <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              {!paymentConfigured && (
                <p className="mt-2 text-xs text-muted">Payment not configured — order saved as Pending.</p>
              )}
              <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
                {loading ? "Processing..." : "Pay with Razorpay"}
              </Button>
            </div>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
}
