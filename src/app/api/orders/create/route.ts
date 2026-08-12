import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/site-settings";

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Order service not configured. Add SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 },
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  const body = await request.json();
  const {
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    items,
    couponCode,
  } = body;

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!customerName?.trim() || !customerEmail?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const { shipping } = await getSiteSettings();
  const flatRate = shipping.flatRate ?? 99;
  const freeThreshold = shipping.freeThreshold ?? 999;

  const subtotal = items.reduce(
    (sum: number, i: { unitPrice: number; quantity: number }) =>
      sum + i.unitPrice * i.quantity,
    0,
  );
  const shippingCost = subtotal >= freeThreshold ? 0 : flatRate;
  const total = subtotal + shippingCost;
  const orderNumber = `PW-${Date.now().toString(36).toUpperCase()}`;

  // Derive user_id ONLY from verified session — never trust client-supplied user_id
  const userId = user?.id ?? null;

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: userId,
      order_number: orderNumber,
      status: "Pending",
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim(),
      customer_phone: customerPhone?.trim() ?? null,
      shipping_address: shippingAddress ?? {},
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_provider: "razorpay",
      payment_status: "unpaid",
      coupon_code: couponCode ?? null,
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      { error: orderError?.message ?? "Order creation failed" },
      { status: 500 },
    );
  }

  const orderItems = items.map((item: {
    productId: string;
    productName: string;
    productSlug: string;
    variantName?: string;
    shapeName?: string;
    quantity: number;
    unitPrice: number;
    customizationData?: object;
    savedDesignId?: string;
  }) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    product_slug: item.productSlug,
    variant_name: item.variantName ?? null,
    shape_name: item.shapeName ?? null,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    customization_data: item.customizationData ?? {},
    saved_design_id: item.savedDesignId ?? null,
  }));

  const { error: itemsError } = await admin.from("order_items").insert(orderItems);
  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({
    orderId: order.id,
    orderNumber,
    subtotal,
    shipping: shippingCost,
    total,
  });
}
