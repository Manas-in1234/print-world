import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const admin = createAdminClient();
  const { data: coupons } = admin
    ? await admin.from("coupons").select("*").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Coupons</h1>
        <Link href="/admin/coupons/new" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">Add Coupon</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr><th className="p-4">Code</th><th className="p-4">Discount</th><th className="p-4">Expires</th><th className="p-4">Active</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {(coupons ?? []).map((c) => (
              <tr key={c.id} className="border-t border-card-border">
                <td className="p-4 font-mono">{c.code}</td>
                <td className="p-4">{c.discount_type === "percent" ? `${c.discount_value}%` : `₹${c.discount_value}`}</td>
                <td className="p-4">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : "—"}</td>
                <td className="p-4">{c.active ? "Yes" : "No"}</td>
                <td className="p-4"><Link href={`/admin/coupons/${c.id}/edit`} className="text-accent hover:underline">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
