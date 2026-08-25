import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface PromoItem {
  icon: string;
  text: string;
  href?: string;
}

const promoItems: PromoItem[] = [
  { icon: "🚚", text: "Free Delivery Above ₹999", href: "/products" },
  { icon: "⚡", text: "Express Dispatch Across India", href: "/about#shipping" },
  { icon: "💳", text: "UPI / Card / COD Available", href: "/about#payments" },
  { icon: "🏢", text: "Bulk & Corporate Orders", href: "/business" },
];

export function PromotionalStrip() {
  return (
    <div className="border-b border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 shadow-xs">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center sm:justify-between">
          {promoItems.map((item, idx) => {
            const content = (
              <span className="inline-flex items-center gap-1.5 hover:text-[#6C2BD9] transition-colors">
                <span className="text-sm" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </span>
            );

            return (
              <div key={item.text} className="flex items-center gap-4">
                {item.href ? <Link href={item.href}>{content}</Link> : content}
                {idx < promoItems.length - 1 && (
                  <span className="hidden text-gray-300 sm:inline" aria-hidden="true">
                    |
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
