import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const personalizedGifts = [
  {
    title: "Acrylic Photo Frames",
    description: "High-gloss, frameless acrylic that brings wedding & family photos to life with depth and shine.",
    image: "/product-assets/acrylic-frame.jpg",
    slug: "acrylic-photo-frame",
    badge: "Most Loved",
  },
  {
    title: "Custom Photo Mugs",
    description: "Ceramic & color-changing magic mugs perfect for morning coffee and cherished birthday memories.",
    image: "/product-assets/mug.jpg",
    slug: "custom-mug",
    badge: "Starting ₹299",
  },
  {
    title: "Personalized T-Shirts",
    description: "100% bio-washed cotton apparel customized with names, quotes, family moments, or original artwork.",
    image: "/product-assets/tshirt.jpg",
    slug: "custom-t-shirt",
    badge: "100% Cotton",
  },
  {
    title: "Customized Wall Clocks",
    description: "Unique round, square, oval and custom silhouette clocks featuring your unforgettable moments.",
    image: "/product-assets/clock.jpg",
    slug: "custom-clock",
    badge: "Handcrafted",
  },
];

export function PersonalizedGifts() {
  return (
    <section className="bg-white py-12 sm:py-16 border-y border-gray-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5007D]">
            Thoughtful & Custom
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-950 sm:text-4xl">
            Made Personal. Made Special.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Turn your favourite photos, names and ideas into gifts they’ll cherish forever.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {personalizedGifts.map((gift) => (
            <div
              key={gift.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F8FA] p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E5007D]/50 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                <Image
                  src={gift.image}
                  alt={gift.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute right-2.5 top-2.5 rounded-md bg-[#E5007D] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  {gift.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E5007D] transition-colors">
                  {gift.title}
                </h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-gray-500">
                  {gift.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                  <Link
                    href={`/customize/${gift.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#E5007D] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#C70068] active:scale-95 shadow-xs"
                  >
                    <span>Create Your Gift</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href={`/products/${gift.slug}`}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
