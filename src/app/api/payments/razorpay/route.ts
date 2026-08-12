import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRazorpayKeys, getPublicRazorpayKeyId } from "@/lib/supabase/env";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  const keys = getRazorpayKeys();
  if (!keys.isConfigured) {
    return NextResponse.json(
      { error: "Payment is not configured yet." },
      { status: 503 },
    );
  }

  const { amount, orderId } = await request.json() as { amount: number; orderId: string };

  const razorpay = new Razorpay({
    key_id: keys.keyId!,
    key_secret: keys.keySecret!,
  });

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: orderId,
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      keyId: getPublicRazorpayKeyId(),
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment order creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const keys = getRazorpayKeys();
  if (!keys.isConfigured) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
  }

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } =
    await request.json();

  const crypto = await import("crypto");
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto
    .createHmac("sha256", keys.keySecret!)
    .update(body)
    .digest("hex");

  if (expected !== razorpaySignature) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  await supabase
    .from("orders")
    .update({ status: "Paid", payment_status: "paid", payment_id: razorpayPaymentId })
    .eq("id", orderId);

  return NextResponse.json({ success: true });
}
