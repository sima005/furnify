-- Furnify / Toranj: persist carts and orders per authenticated user.
-- Run this migration in Supabase SQL Editor before using the user-linked cart/order features.

alter table public.cart_items add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.orders add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists cart_items_user_id_idx on public.cart_items(user_id);
create index if not exists orders_user_id_idx on public.orders(user_id);

-- Existing guest rows remain addressable by session_id. New authenticated rows are linked to auth.users.
