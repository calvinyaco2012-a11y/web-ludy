-- Run this script in your Supabase SQL Editor

-- 1. Create the Products Table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  stock integer not null default 0,
  category text,
  images text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Set Row Level Security (RLS)
alter table public.products enable row level security;

-- Everyone can read products
create policy "Products are viewable by everyone" 
  on public.products for select using (true);

-- Only authenticated users (Admin) can insert, update, or delete
create policy "Admins can insert products" 
  on public.products for insert with check (auth.role() = 'authenticated');

create policy "Admins can update products" 
  on public.products for update using (auth.role() = 'authenticated');

create policy "Admins can delete products" 
  on public.products for delete using (auth.role() = 'authenticated');

-- 3. Create Storage Bucket for product images
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- 4. Storage Policies
create policy "Public Access" 
  on storage.objects for select 
  using (bucket_id = 'product-images');

create policy "Admin Upload" 
  on storage.objects for insert 
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "Admin Update" 
  on storage.objects for update 
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "Admin Delete" 
  on storage.objects for delete 
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');
