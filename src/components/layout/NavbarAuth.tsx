"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientIfConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

function UserIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  );
}

export function NavbarAuth({
  variant = "purple",
  onNavigate,
}: {
  variant?: "purple" | "light";
  onNavigate?: () => void;
}) {
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

  const isPurple = variant === "purple";

  if (!ready) {
    return (
      <Link
        href="/login"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          isPurple
            ? "bg-white/10 text-white hover:bg-white hover:text-[#6C2BD9]"
            : "text-foreground/80 hover:bg-surface hover:text-foreground",
        )}
      >
        <UserIcon className="h-4 w-4" />
        <span>Login</span>
      </Link>
    );
  }

  if (!email) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all",
          isPurple
            ? "border border-white/20 bg-white/10 text-white backdrop-blur-xs hover:border-white hover:bg-white hover:text-[#6C2BD9] shadow-xs"
            : "text-foreground/80 hover:bg-surface hover:text-foreground",
        )}
      >
        <UserIcon className="h-4 w-4" />
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        onClick={onNavigate}
        className={cn(
          "inline-flex max-w-[150px] items-center gap-1.5 truncate rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          isPurple
            ? "border border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-[#6C2BD9]"
            : "text-foreground/80 hover:bg-surface hover:text-foreground",
        )}
        title={email}
      >
        <UserIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">Account</span>
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
            isPurple
              ? "bg-[#FFB000] text-gray-950 hover:bg-[#FFB000]/90"
              : "bg-accent/10 text-accent hover:bg-accent/20",
          )}
        >
          Admin
        </Link>
      )}
    </div>
  );
}
