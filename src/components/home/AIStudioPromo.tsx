import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const promptExamples = [
  "✨ Cyberpunk tiger in neon neon gradient",
  "🎨 Indian mandala art with gold accents",
  "🚀 Vintage astronaut drinking chai in space",
];

export function AIStudioPromo() {
  return (
    <section className="bg-white py-12 sm:py-16 border-y border-gray-200">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-[#F3E8FF]/60 via-white to-[#FDF2F8]/60 p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#6C2BD9]/10 px-3 py-1 text-xs font-bold text-[#6C2BD9]">
                <span>✨</span>
                <span>Powered by Generative AI</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold text-gray-950 sm:text-4xl">
                Create Designs with <span className="text-[#6C2BD9]">AI Studio</span>
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
                Generate original artwork, custom logos, graphics, and personalized print ideas in seconds using AI. Apply them directly to T-shirts, mugs, posters, and clocks.
              </p>

              {/* Sample Prompts */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Instant Prompt Inspirations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {promptExamples.map((prompt) => (
                    <span
                      key={prompt}
                      className="rounded-lg border border-purple-200/80 bg-white px-3 py-1.5 text-xs font-medium text-purple-950 shadow-xs"
                    >
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/ai-studio"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#6C2BD9] px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#4B1FA8] active:scale-95"
                >
                  <span>Try AI Studio</span>
                  <span>→</span>
                </Link>
                <span className="text-xs font-semibold text-gray-500">
                  ⚡ 100% Free Live Previews
                </span>
              </div>
            </div>

            {/* Right Graphic Preview */}
            <div className="relative lg:col-span-5 flex justify-center">
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-purple-200 bg-white p-3 shadow-lg">
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src="/product-assets/tshirt.jpg"
                    alt="AI Generated Apparel Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 380px"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-gray-900/80 p-2.5 text-white backdrop-blur-xs text-xs">
                    <span className="text-[#FFD200] font-bold">Generated in 1.4s:</span> &quot;Cosmic peacock art print&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
