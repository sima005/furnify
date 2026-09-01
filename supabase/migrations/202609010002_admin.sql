-- Creator-only admin foundation.
-- Set FURNIFY_CREATOR_EMAIL in the server environment to the creator account.
-- Keep SUPABASE_SERVICE_ROLE_KEY server-only (never NEXT_PUBLIC_*).

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.cart_items enable row level security;

-- The creator-only Next.js admin routes use the server service-role client for
-- privileged operations. Public clients must not receive the service-role key.
