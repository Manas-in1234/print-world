import { NextResponse } from "next/server";
import { getOpenAIKey } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const AI_NOT_CONFIGURED =
  "AI is not configured yet. Add OPENAI_API_KEY to enable AI generation.";

export async function POST(request: Request) {
  const apiKey = getOpenAIKey();
  if (!apiKey) {
    return NextResponse.json({ error: AI_NOT_CONFIGURED }, { status: 503 });
  }

  const body = await request.json();
  const { type, prompt, businessName, industry, style, colors, theme, context } = body as {
    type: "logo" | "artwork" | "tshirt" | "assistant";
    prompt?: string;
    businessName?: string;
    industry?: string;
    style?: string;
    colors?: string;
    theme?: string;
    context?: string;
  };

  const openai = new OpenAI({ apiKey });

  try {
    if (type === "assistant") {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a premium print design assistant for Print World. Give concise, actionable design advice for custom printing products.",
          },
          {
            role: "user",
            content: [
              context ? `Product context: ${context}` : "",
              prompt ?? "Help me design a custom product.",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
        max_tokens: 500,
      });
      const text = response.choices[0]?.message?.content ?? "No response generated.";
      await logGeneration(type, prompt);
      return NextResponse.json({ type: "assistant", text });
    }

    let resultPrompt = "";
    if (type === "logo") {
      resultPrompt = `Professional logo design for "${businessName ?? "Business"}", industry: ${industry ?? "general"}, style: ${style ?? "modern minimal"}, colors: ${colors ?? "neutral"}. Clean vector-style logo on white background, print-ready.`;
    } else if (type === "tshirt") {
      resultPrompt = `T-shirt graphic design: ${prompt ?? theme ?? "creative design"}. Style: ${style ?? "bold modern"}. Theme: ${theme ?? "custom"}. Print-ready centered composition on plain background.`;
    } else {
      resultPrompt = `Original artwork: ${prompt ?? "abstract art"}. Style: ${style ?? "contemporary"}. Colors: ${colors ?? "vibrant"}. High quality print illustration.`;
    }

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: resultPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const url = image.data?.[0]?.url;
    if (!url) {
      return NextResponse.json({ error: "AI returned no image. Please try again." }, { status: 502 });
    }

    await logGeneration(type, resultPrompt, url);
    return NextResponse.json({ type, url, prompt: resultPrompt });
  } catch (err) {
    const message =
      err instanceof Error && !messageLooksLikeSecret(err.message)
        ? err.message
        : "AI generation failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function messageLooksLikeSecret(msg: string): boolean {
  return /sk-[a-zA-Z0-9]+/i.test(msg) || msg.includes("api_key");
}

async function logGeneration(type: string, prompt?: string, url?: string) {
  const supabase = await createClient();
  if (!supabase) return;
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("ai_generations").insert({
    user_id: user?.id ?? null,
    generation_type: type,
    prompt: prompt ?? null,
    result_url: url ?? null,
    metadata: {},
  });
}
