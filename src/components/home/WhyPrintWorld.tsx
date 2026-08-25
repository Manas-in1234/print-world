import { Container } from "@/components/ui/Container";

const pillars = [
  {
    title: "High Definition Printing",
    desc: "Crisp, vivid prints on premium materials with fade-resistant Japanese inks and bio-washed cotton.",
    icon: "💎",
  },
  {
    title: "Instant Live Preview",
    desc: "What you see is what you get. Interactive 3D/2D live simulator ensures zero design surprises.",
    icon: "👁️",
  },
  {
    title: "Pan-India Shipping",
    desc: "Fast, reliable doorstep delivery across 19,000+ pin codes in India with real-time SMS tracking.",
    icon: "🇮🇳",
  },
  {
    title: "Safe & Secure Payments",
    desc: "UPI, Cards, NetBanking & Cash on Delivery supported via 256-bit encrypted Razorpay gateways.",
    icon: "🔒",
  },
];

export function WhyPrintWorld() {
  return (
    <section className="bg-[#F8F8FA] py-12 sm:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5007D]">
            The Print World Difference
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-950 sm:text-4xl">
            Why Print World?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Trusted by thousands of creators, families, and businesses across India
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#E5007D]/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E8FF] text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-4 font-display text-base sm:text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
