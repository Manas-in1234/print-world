import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();
  return Boolean(data?.is_admin);
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return { user: null, isAdmin: false as const };
  const admin = await isAdmin(user.id);
  return { user, isAdmin: admin };
}

export async function requireAuth() {
  const user = await getCurrentUser();
  return user;
}
