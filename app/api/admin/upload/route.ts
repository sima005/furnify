import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

async function guard() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  const creator = process.env.FURNIFY_CREATOR_EMAIL?.trim().toLowerCase();
  if (!user || !creator || user.email?.toLowerCase() !== creator) return false;
  return true;
}

export async function POST(req: NextRequest) {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    const kind = form.get("kind");
    if (!(file instanceof File) || !["image", "model"].includes(String(kind))) {
      return NextResponse.json({ error: "فایل نامعتبر است." }, { status: 400 });
    }

    const maxSize = kind === "image" ? 8 * 1024 * 1024 : 40 * 1024 * 1024;
    if (file.size > maxSize) return NextResponse.json({ error: kind === "image" ? "حجم تصویر نباید بیشتر از ۸ مگابایت باشد." : "حجم مدل نباید بیشتر از ۴۰ مگابایت باشد." }, { status: 400 });

    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const allowedImage = ["jpg", "jpeg", "png", "webp", "avif"];
    const allowedModel = ["glb"];
    if (kind === "image" && !allowedImage.includes(ext)) return NextResponse.json({ error: "فرمت تصویر باید JPG، PNG، WEBP یا AVIF باشد." }, { status: 400 });
    if (kind === "model" && !allowedModel.includes(ext)) return NextResponse.json({ error: "برای مدل سه‌بعدی فعلاً فقط فایل GLB قابل قبول است." }, { status: 400 });

    const bucket = "product-assets";
    const path = `${kind === "image" ? "images" : "models"}/${crypto.randomUUID()}.${ext}`;
    const admin = createAdminClient();
    const { error } = await admin.storage.from(bucket).upload(path, file, { contentType: file.type || undefined, upsert: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const { data } = admin.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "خطا در آپلود فایل." }, { status: 500 });
  }
}
