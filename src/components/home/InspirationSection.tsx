import Image from "next/image";
import Link from "next/link";
import { inspirationItems } from "@/data/inspiration";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function InspirationSection() {
  const preview = inspirationItems.slice(0, 6);

  return (
    <section id="inspiration" className="bg-surface/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Inspiration"
          title="Ideas to Spark Your Creativity"
          description="Browse real product styles and start creating something similar."
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {preview.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-card-border shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-hover"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-background/80">
                  {item.category}
                </p>
                <p className="font-display text-sm font-semibold text-background sm:text-base">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/inspiration" variant="secondary" size="lg">
            Explore Inspiration
          </Button>
        </div>
      </Container>
    </section>
  );
}
