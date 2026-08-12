import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { getProductsList } from "@/lib/catalog/products";
import { DesignsList } from "@/components/account/DesignsList";
import type { DbSavedDesign } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AccountDesignsPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/login");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/account/designs");

  const { data: designs } = await supabase
    .from("saved_designs")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const products = await getProductsList();
  const priceBySlug = Object.fromEntries(products.map((p) => [p.slug, p.startingPrice]));

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <Container className="max-w-4xl">
          <Link href="/account" className="text-sm text-muted hover:text-foreground">
            ← Back to account
          </Link>
          <h1 className="mt-4 font-display text-3xl font-semibold">Saved Designs</h1>
          <p className="mt-2 text-muted">Reopen, edit, or add your designs to cart.</p>
          <div className="mt-8">
            <DesignsList designs={(designs ?? []) as DbSavedDesign[]} priceBySlug={priceBySlug} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
