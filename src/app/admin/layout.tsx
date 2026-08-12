import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/shapes", label: "Shapes" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/coupons", label: "Coupons" },
  { href: "/admin/designs", label: "Designs" },
  { href: "/admin/ai", label: "AI" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await requireAdmin();
  if (!user) redirect("/login?redirect=/admin");
  if (!isAdmin) redirect("/");

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <aside className="w-full border-r border-card-border bg-card p-4 lg:block lg:w-64 lg:p-6">
        <Link href="/" className="font-display text-sm font-semibold tracking-[0.15em]">PRINT WORLD</Link>
        <p className="mt-1 text-xs text-accent">Admin</p>
        <nav className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="block shrink-0 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground lg:shrink">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
