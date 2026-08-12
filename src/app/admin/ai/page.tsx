import { getOpenAIKey } from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminAIPage() {
  const configured = Boolean(getOpenAIKey());
  const admin = createAdminClient();
  const { data: generations } = admin
    ? await admin.from("ai_generations").select("*").order("created_at", { ascending: false }).limit(20)
    : { data: [] };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">AI Studio</h1>
      <div className="mt-4 rounded-2xl border border-card-border bg-card p-6">
        <p className="text-sm">OpenAI Status: <span className={configured ? "text-green-700" : "text-red-600"}>{configured ? "Configured" : "Not configured"}</span></p>
        {!configured && <p className="mt-2 text-sm text-muted">Add OPENAI_API_KEY to enable AI generation.</p>}
      </div>
      <h2 className="mt-8 font-semibold">Recent Generations</h2>
      <ul className="mt-4 space-y-2">
        {(generations ?? []).map((g) => (
          <li key={g.id} className="rounded-lg border border-card-border p-3 text-sm">
            <span className="font-medium capitalize">{g.generation_type}</span>
            <span className="text-muted"> — {g.prompt?.slice(0, 60) ?? "No prompt"}</span>
          </li>
        ))}
        {!generations?.length && <li className="text-muted text-sm">No generations yet.</li>}
      </ul>
    </div>
  );
}
