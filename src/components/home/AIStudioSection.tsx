import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const aiPromptExamples = [
  "Minimal floral design",
  "Birthday illustration",
  "Travel artwork",
  "Cute pet illustration",
  "Corporate pattern",
];

export function AIStudioSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#4B1FA8] via-[#6C2BD9] to-[#4B1FA8] py-14 sm:py-20 text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#FFB000]/15 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading & Explanation */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-purple-100 backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#FFB000]" />
              <span>AI-Powered Custom Artwork</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Have an Idea? Let AI Design It.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-purple-100 sm:text-lg">
              Turn a simple prompt into artwork for your next personalized product. Describe what you imagine and preview it on t-shirts, mugs, frames and clocks.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/ai-studio"
                size="lg"
                className="bg-white text-[#6C2BD9] hover:bg-white/90 hover:text-[#4B1FA8] shadow-md"
              >
                Try AI Studio
              </Button>
              <Button
                href="/customize/custom-t-shirt"
                variant="secondary"
                size="lg"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
              >
                Design Editor
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Prompt Showcase */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-xl sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                <span>Prompt Ideas to Try</span>
                <span className="text-[#FFB000]">Live AI Generation</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {aiPromptExamples.map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/ai-studio?prompt=${encodeURIComponent(prompt)}`}
                    className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all hover:border-[#FFB000] hover:bg-white hover:text-[#6C2BD9]"
                  >
                    <span>✨</span>
                    <span>{prompt}</span>
                    <span className="text-purple-300 group-hover:text-[#6C2BD9]">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-black/20 p-4 text-xs text-purple-200 border border-white/5">
                <p className="font-semibold text-white">How it works:</p>
                <p className="mt-1 leading-relaxed">
                  Type your prompt in AI Studio, generate custom visuals using Gemini AI, and apply your favorites directly onto custom products in one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
