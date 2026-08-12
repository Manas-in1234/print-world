"use client";

import { useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductCatalogProps {
  products: CatalogProduct[];
  categories: { slug: string; name: string }[];
  queryError?: string | null;
}

type SortOption = "default" | "price-asc" | "price-desc" | "name";

export function ProductCatalog({ products, categories, queryError }: ProductCatalogProps) {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = category === "all"
      ? products
      : products.filter((p) => p.categorySlug === category);

    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return list;
  }, [products, category, sort, search]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:max-w-md"
          aria-label="Search products"
        />
      </div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterButton active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterButton>
          {categories.map((cat) => (
            <FilterButton
              key={cat.slug}
              active={category === cat.slug}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </FilterButton>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          aria-label="Sort products"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">
          {queryError
            ? "Products could not be loaded. See the error above."
            : products.length === 0
              ? "No products in the catalog yet."
              : category === "all"
                ? "No products match your search."
                : "No products found in this category."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-card-border bg-card text-foreground hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}
