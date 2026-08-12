/**
 * One-off diagnostic — run: node scripts/test-products-query.mjs
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const env = {};
  try {
    let raw = readFileSync(".env.local", "utf8");
    if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  } catch (e) {
    console.error("loadEnv failed:", e.message);
  }
  return env;
}

const fileEnv = loadEnv();
const url = fileEnv.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  fileEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  fileEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL set:", Boolean(url));
console.log("Key set:", Boolean(key));
console.log("Key var:", fileEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? "PUBLISHABLE_KEY" : fileEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "ANON_KEY" : "none");

if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);

const all = await supabase.from("products").select("*").order("created_at");
console.log("\n--- SELECT * FROM products ---");
console.log("error:", all.error?.message ?? null);
console.log("count:", all.data?.length ?? 0);
if (all.data?.length) {
  console.log("sample:", all.data[0].name, "active=", all.data[0].active, "category=", all.data[0].category);
}

const active = await supabase.from("products").select("*").eq("active", true).order("sort_order");
console.log("\n--- active = true ---");
console.log("error:", active.error?.message ?? null);
console.log("count:", active.data?.length ?? 0);

const categories = await supabase.from("categories").select("*").eq("active", true);
console.log("\n--- categories ---");
console.log("error:", categories.error?.message ?? null);
console.log("count:", categories.data?.length ?? 0);
