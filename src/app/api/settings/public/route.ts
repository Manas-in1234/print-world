import { getSiteSettings } from "@/lib/site-settings";
import { NextResponse } from "next/server";

export async function GET() {
  const { shipping } = await getSiteSettings();
  return NextResponse.json({
    shipping: {
      flatRate: shipping.flatRate ?? 99,
      freeThreshold: shipping.freeThreshold ?? 999,
    },
  });
}
