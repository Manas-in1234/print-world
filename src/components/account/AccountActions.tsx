"use client";

import { useRouter } from "next/navigation";
import { createClientIfConfigured } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function AccountActions() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClientIfConfigured();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
}
