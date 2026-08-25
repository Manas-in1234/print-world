import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const corporateCards = [
  {
    title: "Business Cards",
    description: "Premium 350 GSM matte & gloss cards that establish trust.",
    image: "/product-assets/business-card.jpg",
    href: "/products/business-card",
  },
  {
    title: "Corporate Gifts",
    description: "Personalized mugs, frames and clocks branded for clients & employees.",
    image: "/product-assets/custom-mug.jpg",
    href: "/business#corporate-gifts",
  },
  {
    title: "Branded Apparel",
    description: "Custom polo & round neck t-shirts printed with company logos.",
    image: "/product-assets/custom-t-shirt.jpg",
    href: "/business#apparel",
  },
  {
    title: "Bulk Printing",
    description: "Volume price discounts and dedicated dispatch for events & offices.",
    image: "/product-assets/hero-products.jpg",
    href: "/business#bulk-orders",
  },
];

export function CorporateSection() {
  return (
    <section className="bg-[#F6F7FB] py-14 sm:py-20 border-b border-gray-200">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-[#6C2BD9]">
              <span>🏢</span>
              <span>B2B & Enterprise Solutions</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold text-gray-950 sm:text-4xl">
              Print More. Brand Better.
            </h2>
            <p className="mt-2 text-base text-[#6B7280]">
              Custom merchandise, business cards, corporate gifts and bulk printing for growing businesses.
            </p>
          </div>

          <Button href="/business" size="lg">
            Explore Business Solutions
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {corporateCards.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#6C2BD9]/50 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-[#6C2BD9] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
