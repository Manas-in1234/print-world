export interface NavLink {
  label: string;
  href: string;
  menuKey?: "products" | "services" | "aiStudio";
}

export interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuGroup {
  key: "products" | "services" | "aiStudio";
  label: string;
  href: string;
  items: MegaMenuItem[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface CategoryItem {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface ShapeItem {
  id: ProductShapeId;
  label: string;
}

export type ProductShapeId =
  | "round"
  | "square"
  | "rectangle"
  | "hexagon"
  | "heart"
  | "star"
  | "bean"
  | "egg"
  | "floral";

export type AcrylicVariant =
  | "bean-portrait"
  | "egg-portrait"
  | "bean-landscape"
  | "egg-landscape"
  | "photo-collage-5"
  | "large-square-collage"
  | "couple-acrylic"
  | "hexagon-7-photo";

export interface AcrylicItem {
  id: string;
  slug: string;
  label: string;
  description: string;
  startingPrice: number;
  variant: AcrylicVariant;
}

export interface ClockItem {
  id: string;
  slug: string;
  label: string;
  shape: string;
  startingPrice: number;
}

export interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: "logo" | "tshirt" | "artwork" | "assistant";
}

export interface DesignStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: "quality" | "customize" | "delivery" | "secure" | "designed";
}
