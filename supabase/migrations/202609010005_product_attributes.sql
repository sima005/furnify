-- Furnify: product attributes for admin product editor

alter table public.products
  add column if not exists discount_percent numeric(5,2) not null default 0,
  add column if not exists color text,
  add column if not exists fabric_type text,
  add column if not exists material text,
  add column if not exists dimensions text;

alter table public.products
  drop constraint if exists products_discount_percent_check;

alter table public.products
  add constraint products_discount_percent_check
  check (discount_percent >= 0 and discount_percent <= 100);

-- Keep the public/app roles able to read the new product fields.
grant select on public.products to anon, authenticated;
