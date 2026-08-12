import type { Metadata } from "next";
import { getOpenAIKey } from "@/lib/supabase/env";
import { AIStudioClient } from "@/components/ai/AIStudioClient";

export const metadata: Metadata = {
  title: "AI Design Studio — Print World",
  description:
    "Generate logos, t-shirt designs, artwork, and get AI design assistance for your custom products.",
};

export default function AIStudioPage() {
  const isConfigured = Boolean(getOpenAIKey());

  return <AIStudioClient isConfigured={isConfigured} />;
}
