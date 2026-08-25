import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const collections = [
  {
    category: "Custom Apparel",
    title: "T-Shirts, Hoodies & More",
    description: "Design custom clothing with high-quality printing, vibrant colors, and durable bio-washed cotton.",
    cta: "Customize Apparel",
    href: "/t-shirts",
    image: "/product-assets/custom-t-shirt.jpg",
    badge: "100% Bio-Washed",
  },
  {
    category: "Home & Living",
    title: "Custom Clocks & Frames",
    description: "Elevate your home with personalized decor, custom acrylic portraits, and designer shape clocks.",
    cta: "Explore Home Decor",
    href: "/clocks",
    image: "/product-assets/acrylic-photo-frame.jpg",
    badge: "Frameless Acrylic",
  },
  {
    category: "Business Printing",
    title: "Cards, Flyers & Merch",
    description: "Professional printing for growing businesses, startups, and corporate events across India.",
    cta: "Shop Business",
    href: "/business",
    image: "/product-assets/business-card.jpg",
    badge: "Bulk Discounts",
  },
];

export function FeaturedCollections() {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-gray-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5007D]">
            Curated For You
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-950 sm:text-4xl">
            Featured Collections
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Engineered with precision materials and ultra HD printing technology
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((col) => (
            <div
              key={col.title}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F8FA] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E5007D]/40 hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-[#4B1FA8] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    {col.badge}
                  </span>
                </div>

                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#E5007D]">
                  {col.category}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-gray-950">
                  {col.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                  {col.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href={col.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E5007D] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-[#C70068] active:scale-98"
                >
                  <span>{col.cta}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
