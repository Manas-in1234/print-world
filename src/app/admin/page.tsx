import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  let productCount = 0;
  let orderCount = 0;
  let customerCount = 0;
  let aiCount = 0;

  if (supabase) {
    const [products, orders, customers, aiGens] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("ai_generations").select("id", { count: "exact", head: true }),
    ]);
    productCount = products.count ?? 0;
    orderCount = orders.count ?? 0;
    customerCount = customers.count ?? 0;
    aiCount = aiGens.count ?? 0;
  }

  const stats = [
    { label: "Products", value: productCount },
    { label: "Orders", value: orderCount },
    { label: "Customers", value: customerCount },
    { label: "AI Generations", value: aiCount },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted">Manage your Print World store</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-card-border bg-card p-6 shadow-soft">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-2 text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
