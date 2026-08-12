import { cookies } from "next/headers";

const COOKIE_NAME = "pw_order_access";

export async function getGuestOrderIds(): Promise<string[]> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function guestOrderCookieHeader(orderId: string): string {
  return `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify([orderId]))}; Path=/; Max-Age=2592000; SameSite=Lax`;
}
