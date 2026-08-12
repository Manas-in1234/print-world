"use client";

import { useMemo, useState } from "react";

type Customer = {
  id: string;
  full_name: string | null;
  email: string | null;
  is_admin: boolean;
  created_at: string;
};

export function AdminCustomersTable({ customers }: { customers: Customer[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        (c.full_name ?? "").toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q),
    );
  }, [customers, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search customers…"
        className="mb-4 w-full max-w-md rounded-lg border border-card-border px-4 py-2 text-sm"
      />
      <div className="overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Admin</th><th className="p-4">Joined</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-card-border">
                <td className="p-4">{p.full_name ?? "—"}</td>
                <td className="p-4">{p.email}</td>
                <td className="p-4">{p.is_admin ? "Yes" : "No"}</td>
                <td className="p-4">{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
