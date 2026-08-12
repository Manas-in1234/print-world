"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MarketingImage } from "@/components/ui/MarketingImage";
import { aiFeatures } from "@/data/ai-features";
import { pageHeroImages } from "@/data/page-heroes";

type AiType = "logo" | "artwork" | "tshirt" | "assistant";

interface AIStudioClientProps {
  isConfigured: boolean;
}

export function AIStudioClient({ isConfigured }: AIStudioClientProps) {
  const [activeType, setActiveType] = useState<AiType>("logo");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("modern");
  const [colors, setColors] = useState("");
  const [prompt, setPrompt] = useState("");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleGenerate() {
    if (!isConfigured) {
      setIsError(true);
      setMessage("AI Studio is currently being configured.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setResultUrl(null);
    setIsError(false);

    const body: Record<string, string> = { type: activeType, style };
    if (activeType === "logo") {
      body.businessName = businessName;
      body.industry = industry;
      body.colors = colors;
      body.prompt = `${businessName} ${industry} logo`;
    } else if (activeType === "assistant") {
      body.prompt = prompt;
      body.context = "Print World product customization";
    } else {
      body.prompt = prompt;
      body.theme = theme;
      body.colors = colors;
    }

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.status === 503) {
        setIsError(true);
        setMessage(data.error ?? "AI Studio is currently being configured.");
        return;
      }
      if (!res.ok) {
        setIsError(true);
        setMessage(data.error ?? "Generation failed.");
        return;
      }
      if (data.text) {
        setMessage(data.text);
      }
      if (data.url) {
        setResultUrl(data.url);
        setMessage("Design generated! Use it in the customization studio.");
      }
    } catch {
      setIsError(true);
      setMessage("Could not reach AI service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <section className="border-b border-card-border bg-surface/40 py-12 sm:py-16">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <SectionHeading
                eyebrow="AI Studio"
                title="AI Design Studio"
                description="Generate logos, artwork, and design guidance powered by AI — then use your creations in the customization editor."
                align="left"
                className="mb-0"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border shadow-soft">
                <MarketingImage
                  src={pageHeroImages["ai-studio"].primaryImage}
                  fallbackSrc={pageHeroImages["ai-studio"].fallbackImages[0]}
                  alt={pageHeroImages["ai-studio"].alt}
                  priority
                  sizes="50vw"
                />
              </div>
            </div>
          </Container>
        </section>

        <Container className="py-12 sm:py-16">

          {!isConfigured && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
              AI Studio is currently being configured.
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {(["logo", "tshirt", "artwork", "assistant"] as AiType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveType(t)}
                className={`rounded-full border px-4 py-2 text-sm font-medium capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeType === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-card-border bg-card"
                }`}
              >
                {t === "tshirt" ? "T-Shirt" : t === "assistant" ? "Assistant" : t}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-card-border bg-card p-6 shadow-soft">
              {activeType === "logo" && (
                <>
                  <input placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Business name" />
                  <input placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Industry" />
                  <input placeholder="Colors (optional)" value={colors} onChange={(e) => setColors(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Colors" />
                </>
              )}
              {(activeType === "artwork" || activeType === "tshirt") && (
                <>
                  <textarea placeholder="Describe your design..." value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Design description" />
                  <input placeholder="Theme (optional)" value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Theme" />
                  <input placeholder="Colors (optional)" value={colors} onChange={(e) => setColors(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Colors" />
                </>
              )}
              {activeType === "assistant" && (
                <textarea placeholder="Ask for design help..." value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={5} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Design question" />
              )}
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full rounded-xl border border-card-border px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Style">
                <option value="modern">Modern</option>
                <option value="minimal">Minimal</option>
                <option value="vintage">Vintage</option>
                <option value="bold">Bold</option>
              </select>
              <Button onClick={handleGenerate} disabled={loading} size="lg" className="w-full">
                {loading ? "Generating…" : "Generate"}
              </Button>
            </div>

            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold">Result</h2>
              {message && (
                <p className={`mt-4 text-sm ${isError ? "text-red-600" : "text-muted"}`} role="status">{message}</p>
              )}
              {resultUrl && (
                <div className="mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resultUrl} alt="AI generated design" className="max-h-80 w-full rounded-xl object-contain" />
                  <Button href={`/customize/custom-t-shirt?aiImage=${encodeURIComponent(resultUrl)}`} variant="secondary" className="mt-4">
                    Use in Customizer
                  </Button>
                </div>
              )}
              {!message && !resultUrl && (
                <p className="mt-4 text-sm text-muted">Generated artwork or assistant responses appear here.</p>
              )}
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {aiFeatures.map((f) => (
              <article key={f.id} className="rounded-2xl border border-card-border bg-card p-6">
                <h3 className="font-display font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-card-border bg-gradient-to-br from-surface to-card px-6 py-10 text-center shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-foreground">Ready to create?</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted">Use AI-generated artwork in our customization editor on any product.</p>
            <Button href="/customize/custom-t-shirt" size="lg" className="mt-6">
              Start Designing
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
