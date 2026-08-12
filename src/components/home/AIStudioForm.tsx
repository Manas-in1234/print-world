"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const AI_NOT_CONFIGURED =
  "AI is not configured yet. Add OPENAI_API_KEY to enable AI generation.";

export function AIStudioForm() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "unconfigured">("idle");
  const [message, setMessage] = useState("");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "artwork", prompt: prompt.trim(), style: "modern" }),
      });
      const data = await res.json();
      if (res.status === 503) {
        setStatus("unconfigured");
        setMessage(data.error ?? AI_NOT_CONFIGURED);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Generation failed. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data.text ?? "Design generated successfully. Open a product to apply your artwork.");
    } catch {
      setStatus("error");
      setMessage("Could not reach AI service. Please try again.");
    }
  }

  return (
    <div className="mb-10 overflow-hidden rounded-2xl border border-card-border bg-card p-6 shadow-soft sm:p-8">
      <form onSubmit={handleGenerate} className="space-y-4">
        <label htmlFor="ai-prompt" className="block text-sm font-medium text-foreground">
          Describe your vision
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="ai-prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className="flex-1 rounded-xl border border-card-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <Button type="submit" size="lg" className="shrink-0" disabled={status === "loading"}>
            {status === "loading" ? "Generating…" : "Generate Design"}
          </Button>
        </div>
        {message && (
          <p
            className={`text-sm ${status === "success" ? "text-accent" : status === "unconfigured" ? "text-muted" : "text-red-600"}`}
            role="status"
          >
            {message}
          </p>
        )}
        {(status === "error" || status === "unconfigured") && (
          <button
            type="button"
            className="text-sm text-accent underline"
            onClick={() => { setStatus("idle"); setMessage(""); }}
          >
            Try again
          </button>
        )}
      </form>
    </div>
  );
}
