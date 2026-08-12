import { createAdminClient } from "@/lib/supabase/admin";
import { AdminHomepageEditor } from "@/components/admin/AdminHomepageEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const admin = createAdminClient();
  const { data: settings } = admin
    ? await admin.from("site_settings").select("*")
    : { data: [] };

  const map = Object.fromEntries((settings ?? []).map((s) => [s.key, s.value]));
  const hero = (map.hero ?? {}) as { headline?: string; subheadline?: string };
  const featured = (map.featured_products ?? []) as string[];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Homepage</h1>
      <p className="mt-2 text-muted">Manage hero content and featured products.</p>
      <div className="mt-6">
        <AdminHomepageEditor initialHero={hero} initialFeatured={featured} />
      </div>
    </div>
  );
}
