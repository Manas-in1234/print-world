import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminCouponForm } from "@/components/admin/AdminCouponForm";

interface Props { params: Promise<{ id: string }> }

export default async function EditCouponPage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: coupon } = admin
    ? await admin.from("coupons").select("*").eq("id", id).maybeSingle()
    : { data: null };

  if (!coupon) {
    return <div><p>Not found</p><Link href="/admin/coupons">Back</Link></div>;
  }

  return <AdminCouponForm coupon={coupon} />;
}
