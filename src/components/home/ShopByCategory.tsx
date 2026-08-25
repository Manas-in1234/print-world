import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const categories = [
  {
    name: "T-Shirts",
    image: "/product-assets/tshirt.jpg",
    href: "/t-shirts",
  },
  {
    name: "Mugs",
    image: "/product-assets/mug.jpg",
    href: "/mugs",
  },
  {
    name: "Photo Frames",
    image: "/product-assets/acrylic-frame.jpg",
    href: "/acrylic-frames",
  },
  {
    name: "Clocks",
    image: "/product-assets/clock.jpg",
    href: "/clocks",
  },
  {
    name: "Posters",
    image: "/product-assets/poster.jpg",
    href: "/posters",
  },
  {
    name: "Business Cards",
    image: "/product-assets/business-card.jpg",
    href: "/business-cards",
  },
  {
    name: "Gifts",
    image: "/product-assets/hero-products.jpg",
    href: "/services#personalized-products",
  },
  {
    name: "Corporate",
    image: "/product-assets/custom-t-shirt.jpg",
    href: "/business",
  },
];

export function ShopByCategory() {
  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-950">
            Shop by Category
          </h2>
          <Link
            href="/products"
            className="rounded-lg border border-pink-200 bg-white px-3.5 py-1 text-xs font-bold text-[#E5007D] shadow-2xs hover:bg-pink-50 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* 8-Column Grid on Desktop, responsive scroll on mobile */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50/80 p-1.5">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-106"
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 120px"
                  />
                </div>
              </div>
              <span className="mt-2 block text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E5007D] transition-colors line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
