import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { AccountActions } from "@/components/account/AccountActions";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="flex-1 py-16">
          <Container className="max-w-lg text-center">
            <p className="text-muted">Connect Supabase to enable account features.</p>
            <Link href="/login" className="mt-4 inline-block text-accent hover:underline">Go to Login</Link>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Customer";

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Account</p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-foreground">
                Hello, {displayName}
              </h1>
              <p className="mt-1 text-sm text-muted">{user.email}</p>
            </div>
            <AccountActions />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <LinkCard title="Saved Designs" description="View, edit, and reuse your saved designs." href="/account/designs" />
            <LinkCard title="Order History" description="View and track your orders." href="/orders" />
            <PlaceholderCard title="Saved Addresses" description="Manage delivery addresses at checkout." />
            <PlaceholderCard title="Account Settings" description="Profile and notification settings coming soon." />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function PlaceholderCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}

function LinkCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="block rounded-2xl border border-card-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-hover">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Link>
  );
}
