export type ProductCategory = "clothing" | "home" | "business" | "gifts";

export type ProductShape =
  | "round"
  | "square"
  | "rectangle"
  | "hexagon"
  | "heart"
  | "star"
  | "bean"
  | "egg"
  | "floral";

export type ProductPlaceholder =
  | "tshirt"
  | "frame"
  | "mug"
  | "card"
  | "poster"
  | "clock";

export type Currency = "INR" | "USD";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  startingPrice: number;
  currency: Currency;
  category: ProductCategory;
  imagePlaceholder: ProductPlaceholder;
  shapes?: ProductShape[];
  featured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}
