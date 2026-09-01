-- Fix permissions for Furnify products and related tables.
-- This is needed when tables were created manually in SQL Editor.

grant usage on schema public to anon, authenticated, service_role;

grant select on public.products to anon, authenticated;
grant select, insert, update, delete on public.products to service_role;

grant select, insert, update, delete on public.cart_items to authenticated, service_role;
grant select, insert, update, delete on public.orders to authenticated, service_role;
grant select, insert, update, delete on public.order_items to authenticated, service_role;

-- Ensure sequences (if any identity/serial columns are added later) are usable by the admin role.
grant usage, select on all sequences in schema public to service_role;
