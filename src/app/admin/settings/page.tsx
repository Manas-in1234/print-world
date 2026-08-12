import { createAdminClient } from "@/lib/supabase/admin";
import { AdminSettingsEditor } from "@/components/admin/AdminSettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const admin = createAdminClient();
  const { data: settings } = admin
    ? await admin.from("site_settings").select("*").eq("key", "shipping").maybeSingle()
    : { data: null };

  const shipping = (settings?.value ?? {}) as { flatRate?: number; freeThreshold?: number };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Settings</h1>
      <p className="mt-2 text-muted">Store configuration.</p>
      <div className="mt-6">
        <AdminSettingsEditor initialShipping={shipping} />
      </div>
    </div>
  );
}
