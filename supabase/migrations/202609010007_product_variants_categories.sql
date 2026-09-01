-- Furnify: real product variants (color + price) and product categories.

alter table public.products
  add column if not exists category text;

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  color_name text not null,
  color_hex text not null default '#D9AE62',
  price numeric(14,2) not null default 0,
  original_price numeric(14,2),
  discount_percent numeric(5,2) not null default 0,
  created_at timestamptz not null default now(),
  constraint product_variants_price_check check (price >= 0),
  constraint product_variants_discount_check check (discount_percent >= 0 and discount_percent <= 100),
  constraint product_variants_color_name_check check (length(trim(color_name)) > 0),
  unique(product_id, color_name)
);

alter table public.cart_items
  add column if not exists variant_id uuid references public.product_variants(id) on delete set null,
  add column if not exists selected_color text,
  add column if not exists unit_price numeric(14,2);

alter table public.order_items
  add column if not exists variant_id uuid references public.product_variants(id) on delete set null,
  add column if not exists selected_color text;

grant select on public.product_variants to anon, authenticated;
grant select, insert, update, delete on public.product_variants to service_role;
grant select, insert, update, delete on public.cart_items to anon, authenticated, service_role;
grant select, insert, update, delete on public.order_items to authenticated, service_role;
grant usage, select on all sequences in schema public to service_role;

alter table public.product_variants enable row level security;
drop policy if exists "public can read product variants" on public.product_variants;
create policy "public can read product variants" on public.product_variants for select using (true);
