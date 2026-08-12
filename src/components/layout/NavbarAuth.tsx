"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientIfConfigured } from "@/lib/supabase/client";

export function NavbarAuth({ onNavigate }: { onNavigate?: () => void }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClientIfConfigured();
    if (!supabase) {
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }

    let cancelled = false;

    async function loadSession() {
      const { data: { user } } = await supabase!.auth.getUser();
      if (cancelled) return;
      setEmail(user?.email ?? null);
      if (user) {
        const { data } = await supabase!
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .maybeSingle();
        if (!cancelled) setIsAdmin(Boolean(data?.is_admin));
      }
      if (!cancelled) setReady(true);
    }

    void loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      void loadSession();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  if (!ready) {
    return (
      <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80">
        Login
      </Link>
    );
  }

  if (!email) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        onClick={onNavigate}
        className="hidden max-w-[140px] truncate rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground sm:block"
        title={email}
      >
        Account
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className="rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wide text-accent transition-colors hover:bg-surface"
        >
          Admin
        </Link>
      )}
    </div>
  );
}
