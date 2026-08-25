import { Container } from "@/components/ui/Container";

const steps = [
  {
    step: "01",
    title: "1. Choose Your Product",
    desc: "Pick from T-shirts, mugs, acrylic frames, clocks, posters & business merchandise.",
    icon: "🛍️",
  },
  {
    step: "02",
    title: "2. Customize & Preview",
    desc: "Upload photos, add names, crop, adjust layers, and preview in real-time before ordering.",
    icon: "🎨",
  },
  {
    step: "03",
    title: "3. We Print & Ship Across India",
    desc: "High-definition precision printing, protective packaging, and insured doorstep delivery.",
    icon: "🚀",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-gray-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5007D]">
            Simple & Seamless
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-950 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            From your screen to your hands in three easy steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="relative flex flex-col items-start rounded-2xl border border-gray-200 bg-[#F8F8FA] p-6 shadow-xs transition-all duration-300 hover:border-[#6C2BD9]/30 hover:shadow-md"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-xs">
                  {item.icon}
                </div>
                <span className="font-display text-3xl font-extrabold text-gray-200">
                  {item.step}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                {item.desc}
              </p>

              {idx < 2 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-300 font-bold text-xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
