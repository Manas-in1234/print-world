import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface HeroSettings {
  headline?: string;
  subheadline?: string;
}

export interface ShippingSettings {
  flatRate?: number;
  freeThreshold?: number;
}

export const getSiteSettings = cache(async function getSiteSettings() {
  const supabase = await createClient();
  if (!supabase) {
    return {
      hero: {} as HeroSettings,
      featuredSlugs: [] as string[],
      shipping: { flatRate: 99, freeThreshold: 999 } as ShippingSettings,
    };
  }

  const { data } = await supabase.from("site_settings").select("key, value");
  const map = Object.fromEntries((data ?? []).map((s) => [s.key, s.value]));

  const hero = (map.hero ?? {}) as HeroSettings;
  const featuredSlugs = (map.featured_products ?? []) as string[];
  const shipping = (map.shipping ?? { flatRate: 99, freeThreshold: 999 }) as ShippingSettings;

  return { hero, featuredSlugs, shipping };
});
