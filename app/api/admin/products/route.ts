import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export const dynamic = "force-dynamic";

async function isCreator() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  const creator = process.env.FURNIFY_CREATOR_EMAIL?.trim().toLowerCase();
  return !!user && !!creator && user.email?.trim().toLowerCase() === creator;
}

export async function POST(req: NextRequest) {
  if (!(await isCreator())) return NextResponse.json({ error: "دسترسی غیرمجاز. فقط Creator می‌تواند محصول اضافه کند." }, { status: 403 });
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const price = Number(body.price);
    if (!name || !Number.isFinite(price) || price < 0) return NextResponse.json({ error: "نام و قیمت معتبر وارد کنید." }, { status: 400 });

    const admin = createAdminClient();
    const { data, error } = await admin.from("products").insert({
      name, price,
      original_price: body.original_price === null || body.original_price === "" ? null : Number(body.original_price),
      image: body.image || null,
      model_url: body.model_url || null,
      tag: body.tag ? String(body.tag).trim() : null,
      rating: Number(body.rating) || 5,
      reviews: body.reviews ? String(body.reviews).trim() : "0",
      has_3d: Boolean(body.has_3d),
    }).select().single();

    if (error) return NextResponse.json({ error: `خطای دیتابیس: ${error.message}` }, { status: 500 });
    return NextResponse.json({ product: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "افزودن محصول ناموفق بود." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isCreator())) return NextResponse.json({ error: "دسترسی غیرمجاز." }, { status: 403 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "شناسه محصول ارسال نشده است." }, { status: 400 });
  const { error } = await createAdminClient().from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
