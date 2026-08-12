"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { inspirationItems, inspirationCategories } from "@/data/inspiration";

export function InspirationGallery() {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? inspirationItems
      : inspirationItems.filter((item) => item.category === filter);

  return (
    <>
      <section className="border-b border-card-border bg-surface/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Inspiration"
            title="Design Ideas & Creative Inspiration"
            description="Browse curated styles across our product lines and create something similar with your own photos and text."
            align="left"
          />
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter inspiration by category">
            {inspirationCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  filter === cat
                    ? "border-foreground bg-foreground text-background"
                    : "border-card-border bg-card text-foreground hover:border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-hover"
              >
                <Link href={item.href} className="block">
                  <div className="relative aspect-square overflow-hidden bg-surface">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-accent">{item.category}</p>
                    <h2 className="mt-1 font-display text-base font-semibold text-foreground">{item.title}</h2>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <Button href={item.href} variant="secondary" size="sm" className="w-full">
                    Create Something Similar
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
