import { createAdminClient } from "@/lib/supabase/admin";
import { AdminCustomersTable } from "@/components/admin/AdminCustomersTable";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const admin = createAdminClient();
  const { data: profiles } = admin
    ? await admin.from("profiles").select("*").order("created_at", { ascending: false }).limit(100)
    : { data: [] };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Customers</h1>
      <div className="mt-6">
        <AdminCustomersTable customers={profiles ?? []} />
      </div>
    </div>
  );
}
