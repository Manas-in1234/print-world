import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGuestOrderIds } from "@/lib/orders/guest-access";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format-price";

export const dynamic = "force-dynamic";

interface OrderPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pending?: string }>;
}

export default async function OrderDetailPage({ params, searchParams }: OrderPageProps) {
  const { id } = await params;
  const { pending } = await searchParams;
  const supabase = await createClient();
  if (!supabase) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  const guestOrderIds = await getGuestOrderIds();
  const guestAllowed = guestOrderIds.includes(id);

  if (!user && !guestAllowed) {
    redirect(`/login?redirect=/orders/${id}`);
  }

  let query = supabase.from("orders").select("*").eq("id", id);
  if (user) {
    query = query.eq("user_id", user.id);
  }

  const { data: order } = await query.maybeSingle();

  if (!order) notFound();

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  const address = order.shipping_address as { address?: string; city?: string; pincode?: string };

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12">
        <Container className="max-w-3xl">
          {user ? (
            <Link href="/orders" className="text-sm text-muted hover:text-foreground">← Back to orders</Link>
          ) : (
            <Link href="/products" className="text-sm text-muted hover:text-foreground">← Continue shopping</Link>
          )}
          {pending === "true" && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Payment is not configured yet. Your order was saved as Pending.
            </p>
          )}
          <h1 className="mt-4 font-display text-3xl font-semibold">{order.order_number}</h1>
          <p className="mt-1 text-sm text-muted">Status: <span className="font-medium text-foreground">{order.status}</span></p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-card-border bg-card p-6">
              <h2 className="font-semibold">Shipping</h2>
              <p className="mt-2 text-sm text-muted">{order.customer_name}</p>
              <p className="text-sm text-muted">{address.address}</p>
              <p className="text-sm text-muted">{address.city} {address.pincode}</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card p-6">
              <h2 className="font-semibold">Payment</h2>
              <p className="mt-2 text-sm">{order.payment_status ?? "unpaid"}</p>
              <p className="text-lg font-semibold mt-2">{formatPrice(Number(order.total))}</p>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-card-border rounded-2xl border border-card-border bg-card">
            {(items ?? []).map((item) => (
              <li key={item.id} className="flex justify-between p-4 text-sm">
                <div>
                  <p className="font-medium">{item.product_name}</p>
                  {(item.variant_name || item.shape_name) && (
                    <p className="text-muted">{[item.variant_name, item.shape_name].filter(Boolean).join(" · ")}</p>
                  )}
                  <p className="text-muted">Qty: {item.quantity}</p>
                  {item.customization_data && (
                    <p className="mt-1 text-xs text-accent">Custom design included</p>
                  )}
                </div>
                <span>{formatPrice(Number(item.unit_price) * item.quantity)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer />
    </>
  );
}
