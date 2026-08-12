import { createAdminClient } from "@/lib/supabase/admin";
import { AdminOrdersTable } from "@/components/admin/AdminOrdersTable";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const admin = createAdminClient();
  const { data: orders } = admin
    ? await admin.from("orders").select("*").order("created_at", { ascending: false }).limit(100)
    : { data: [] };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Orders</h1>
      <div className="mt-6">
        <AdminOrdersTable orders={(orders ?? []).map((o) => ({ ...o, total: Number(o.total) }))} />
      </div>
    </div>
  );
}
