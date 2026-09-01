-- Furnify: selectable product color variants
alter table public.products
  add column if not exists color_options jsonb not null default '[]'::jsonb;

grant select on public.products to anon, authenticated;
