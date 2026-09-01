-- Product media stored in Supabase Storage.
alter table public.products add column if not exists model_url text;
-- The app uploads through a creator-only server route using the server secret key.
-- Create a PUBLIC bucket named product-assets in Supabase Storage so product images
-- and GLB models can be displayed by the storefront.
