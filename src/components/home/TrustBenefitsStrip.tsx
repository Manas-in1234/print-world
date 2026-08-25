import { Container } from "@/components/ui/Container";

const trustItems = [
  {
    icon: "✅",
    title: "100% Quality Guaranteed",
    subtitle: "Precision color & material standards",
  },
  {
    icon: "📍",
    title: "19,000+ Pin Codes Covered",
    subtitle: "Express dispatch across all of India",
  },
  {
    icon: "⭐",
    title: "4.9★ Rated Customer Trust",
    subtitle: "50,000+ happy personalized orders",
  },
  {
    icon: "🔄",
    title: "Easy Replacement Policy",
    subtitle: "Hassle-free support for any transit issue",
  },
];

export function TrustBenefitsStrip() {
  return (
    <section className="border-y border-gray-200 bg-white py-8">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F8FA] text-xl border border-gray-200">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
