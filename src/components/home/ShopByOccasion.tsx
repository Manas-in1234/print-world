import Link from "next/link";
import { Container } from "@/components/ui/Container";

const occasions = [
  {
    name: "Birthday",
    icon: "🎂",
    desc: "Custom t-shirts, mugs & photo clocks",
    href: "/products?search=birthday",
    color: "from-pink-500/10 to-rose-500/5 text-rose-700 border-rose-200",
  },
  {
    name: "Anniversary",
    icon: "💑",
    desc: "Acrylic frames & couple portrait prints",
    href: "/acrylic-frames",
    color: "from-purple-500/10 to-indigo-500/5 text-purple-700 border-purple-200",
  },
  {
    name: "Wedding",
    icon: "💍",
    desc: "Framed portrait prints & luxury keepsakes",
    href: "/wedding-gifts",
    color: "from-amber-500/10 to-yellow-500/5 text-amber-800 border-amber-200",
  },
  {
    name: "Diwali Special",
    icon: "🪔",
    desc: "Diwali gifts, puja clocks & festive hampers",
    href: "/diwali",
    color: "from-orange-500/10 to-amber-500/5 text-orange-800 border-orange-200",
  },
  {
    name: "Rakhi Gifts",
    icon: "🌸",
    desc: "Personalized sibling tees, mugs & frames",
    href: "/raksha-bandhan",
    color: "from-pink-500/10 to-rose-500/5 text-pink-800 border-pink-200",
  },
  {
    name: "Baby Gifts",
    icon: "👶",
    desc: "Baby photo frames & milestone custom prints",
    href: "/acrylic-frames",
    color: "from-blue-500/10 to-cyan-500/5 text-blue-800 border-blue-200",
  },
  {
    name: "Corporate Events",
    icon: "👔",
    desc: "Branded cards, team tees & conference gifts",
    href: "/business",
    color: "from-slate-500/10 to-gray-500/5 text-slate-800 border-slate-200",
  },
];

export function ShopByOccasion() {
  return (
    <section className="bg-[#F8F8FA] py-12 sm:py-16">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Shop by Occasion
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Handcrafted personalized items curated for life’s special Indian milestones
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-block text-xs font-bold text-[#E5007D] hover:text-[#C70068] hover:underline sm:text-sm"
          >
            Explore All Gifts →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:gap-4">
          {occasions.map((occ) => (
            <Link
              key={occ.name}
              href={occ.href}
              className={`group flex flex-col items-center rounded-2xl border bg-gradient-to-b ${occ.color} p-4 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-xs transition-transform duration-300 group-hover:scale-110">
                {occ.icon}
              </div>
              <h3 className="mt-3 text-xs font-bold text-gray-900 group-hover:text-[#E5007D] transition-colors sm:text-sm">
                {occ.name}
              </h3>
              <p className="mt-1 text-[11px] leading-tight text-gray-600 line-clamp-2">
                {occ.desc}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
