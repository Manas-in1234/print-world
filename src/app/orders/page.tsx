import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format-price";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <>
        <Navbar />
        <main className="flex-1 py-16 text-center"><Container><p className="text-muted">Connect Supabase to view orders.</p></Container></main>
        <Footer />
      </>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12">
        <Container className="max-w-3xl">
          <h1 className="font-display text-3xl font-semibold">Your Orders</h1>
          {!orders?.length ? (
            <p className="mt-8 text-muted">No orders yet.</p>
          ) : (
            <ul className="mt-8 divide-y divide-card-border">
              {orders.map((order) => (
                <li key={order.id} className="py-4">
                  <Link href={`/orders/${order.id}`} className="flex items-center justify-between hover:text-accent">
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-muted">{new Date(order.created_at).toLocaleDateString()} · {order.status}</p>
                    </div>
                    <span className="font-semibold">{formatPrice(Number(order.total))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
