import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CustomizationPromo() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-card-border bg-gradient-to-br from-surface via-card to-accent/5 p-6 shadow-soft sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <SectionHeading
              eyebrow="Customization"
              title="Make It Yours."
              description="Upload photos, add text, move and resize elements, and preview your design before ordering — all in our intuitive editor."
              align="left"
              className="mb-0"
            />
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Upload photos and artwork
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Add and style text
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Move, resize, and layer elements
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Preview before you order
              </li>
            </ul>
            <div className="mt-8">
              <Button href="/customize/custom-t-shirt" size="lg">
                Start Designing
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border shadow-soft">
            <Image
              src="/product-assets/hero-products.jpg"
              alt="Customization editor preview showing personalized products"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
