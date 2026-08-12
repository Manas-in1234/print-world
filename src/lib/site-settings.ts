import { cache } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateCatalogEnv } from "@/lib/catalog/catalog-client";

export interface HeroSettings {
  headline?: string;
  subheadline?: string;
}

export interface ShippingSettings {
  flatRate?: number;
  freeThreshold?: number;
}

const DEFAULTS = {
  hero: {} as HeroSettings,
  featuredSlugs: [] as string[],
  shipping: { flatRate: 99, freeThreshold: 999 } as ShippingSettings,
};

export const getSiteSettings = cache(async function getSiteSettings() {
  if (!validateCatalogEnv().ok) {
    return DEFAULTS;
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return DEFAULTS;
  }

  const { data } = await supabase.from("site_settings").select("key, value");
  const map = Object.fromEntries((data ?? []).map((s) => [s.key, s.value]));

  const hero = (map.hero ?? {}) as HeroSettings;
  const featuredSlugs = (map.featured_products ?? []) as string[];
  const shipping = (map.shipping ?? { flatRate: 99, freeThreshold: 999 }) as ShippingSettings;

  return { hero, featuredSlugs, shipping };
});
