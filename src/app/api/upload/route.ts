import { NextResponse } from "next/server";
import sharp from "sharp";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Upload service not configured. Check Supabase environment variables." },
      { status: 503 },
    );
  }

  const { data: { user } } = await supabase.auth.getUser();

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file selected. Choose a JPG, PNG, or WEBP image." }, { status: 400 });
  }

  const mimeType = file.type || "application/octet-stream";
  if (!ALLOWED_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed formats: JPG, JPEG, PNG, WEBP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large. Maximum size is 10 MB." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Upload storage not configured. Add SUPABASE_SERVICE_ROLE_KEY on the server." },
      { status: 503 },
    );
  }

  const ext = mimeType === "image/jpeg" || mimeType === "image/jpg" ? "jpg" : mimeType.split("/")[1] ?? "bin";
  const userPrefix = user?.id ?? "guest";
  const fileId = crypto.randomUUID();
  const originalPath = `${userPrefix}/originals/${fileId}.${ext}`;

  let buffer: Buffer;
  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch {
    return NextResponse.json({ error: "Could not read the selected file." }, { status: 400 });
  }

  const { error: uploadError } = await admin.storage
    .from("uploads")
    .upload(originalPath, buffer, { contentType: mimeType, upsert: false });

  if (uploadError) {
    const msg = uploadError.message.includes("Bucket not found")
      ? "Storage bucket missing. Run supabase/storage_setup.sql in Supabase."
      : uploadError.message || "Upload failed. Please try again.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const { data: signedOriginal } = await admin.storage
    .from("uploads")
    .createSignedUrl(originalPath, 60 * 60 * 24 * 7);

  let previewUrl = signedOriginal?.signedUrl ?? "";

  try {
    const avifBuffer = await sharp(buffer)
      .rotate()
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .avif({ quality: 65 })
      .toBuffer();

    const previewPath = `${userPrefix}/previews/${fileId}.avif`;
    const { error: previewError } = await admin.storage
      .from("previews")
      .upload(previewPath, avifBuffer, { contentType: "image/avif", upsert: false });

    if (!previewError) {
      const { data: previewUrlData } = admin.storage.from("previews").getPublicUrl(previewPath);
      previewUrl = previewUrlData.publicUrl;
    } else if (!previewUrl) {
      return NextResponse.json(
        { error: "Preview upload failed. Ensure the previews bucket exists." },
        { status: 500 },
      );
    }
  } catch {
    if (!previewUrl) {
      return NextResponse.json(
        { error: "Could not process image preview. Try a different JPG or PNG file." },
        { status: 422 },
      );
    }
  }

  return NextResponse.json({
    originalUrl: signedOriginal?.signedUrl ?? previewUrl,
    originalPath,
    previewUrl,
  });
}
