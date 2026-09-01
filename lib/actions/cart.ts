"use client";
import { createClient } from "@/utils/supabase/client";
import type { CartItem, CartItemWithProduct, Product } from "@/types/database";

type CartItemRow = CartItem & { products?: Product | null };

async function identity(sessionId: string) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return { supabase, userId: data.user?.id ?? null, sessionId };
}

export async function getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
  if (!sessionId) return [];
  const { supabase, userId } = await identity(sessionId);
  let query = supabase.from("cart_items").select("*, products(*)");
  query = userId ? query.or(`user_id.eq.${userId},session_id.eq.${sessionId}`) : query.eq("session_id", sessionId);
  const { data, error } = await query;
  if (error) { console.error("getCartItems error:", error.message); return []; }
  return ((data ?? []) as CartItemRow[]).map(item => ({ ...item, product: item.products as Product })).filter(item => !!item.product) as CartItemWithProduct[];
}

export async function addToCart(sessionId: string, productId: string): Promise<void> {
  const { supabase, userId } = await identity(sessionId);
  let lookup = supabase.from("cart_items").select("id, quantity").eq("product_id", productId);
  lookup = userId ? lookup.eq("user_id", userId) : lookup.eq("session_id", sessionId);
  const { data } = await lookup.maybeSingle();
  if (data) { await supabase.from("cart_items").update({ quantity: data.quantity + 1 }).eq("id", data.id); return; }
  await supabase.from("cart_items").insert({ session_id: sessionId, user_id: userId, product_id: productId, quantity: 1 });
}

export async function updateCartItemQuantity(sessionId: string, productId: string, quantity: number): Promise<void> {
  if (quantity <= 0) return removeFromCart(sessionId, productId);
  const { supabase, userId } = await identity(sessionId);
  let q = supabase.from("cart_items").update({ quantity }).eq("product_id", productId);
  q = userId ? q.eq("user_id", userId) : q.eq("session_id", sessionId);
  await q;
}
export async function removeFromCart(sessionId: string, productId: string): Promise<void> {
  const { supabase, userId } = await identity(sessionId);
  let q = supabase.from("cart_items").delete().eq("product_id", productId);
  q = userId ? q.eq("user_id", userId) : q.eq("session_id", sessionId);
  await q;
}
export async function clearCart(sessionId: string): Promise<void> {
  const { supabase, userId } = await identity(sessionId);
  let q = supabase.from("cart_items").delete();
  q = userId ? q.eq("user_id", userId) : q.eq("session_id", sessionId);
  await q;
}

export async function claimGuestCart(sessionId: string): Promise<void> {
  if (!sessionId) return;
  const { supabase, userId } = await identity(sessionId);
  if (!userId) return;
  const { data: guestItems } = await supabase.from("cart_items").select("id, product_id, quantity").eq("session_id", sessionId).is("user_id", null);
  for (const item of guestItems ?? []) {
    const { data: existing } = await supabase.from("cart_items").select("id, quantity").eq("user_id", userId).eq("product_id", item.product_id).maybeSingle();
    if (existing) await supabase.from("cart_items").update({ quantity: existing.quantity + item.quantity }).eq("id", existing.id);
    else await supabase.from("cart_items").update({ user_id: userId }).eq("id", item.id);
    if (existing) await supabase.from("cart_items").delete().eq("id", item.id);
  }
}
