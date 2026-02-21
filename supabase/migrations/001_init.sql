-- GermanyStudyTracker initial schema

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create table if not exists public.user_checklist_items (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  checklist_item_key text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  notes text,
  proof_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique(user_id, checklist_item_key)
);

create trigger set_user_checklist_items_updated_at
before update on public.user_checklist_items
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id)
  do update set
    full_name = excluded.full_name,
    email = excluded.email,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_checklist_items enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "checklist_select_own" on public.user_checklist_items;
create policy "checklist_select_own"
on public.user_checklist_items
for select
using (auth.uid() = user_id);

drop policy if exists "checklist_insert_own" on public.user_checklist_items;
create policy "checklist_insert_own"
on public.user_checklist_items
for insert
with check (auth.uid() = user_id);

drop policy if exists "checklist_update_own" on public.user_checklist_items;
create policy "checklist_update_own"
on public.user_checklist_items
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "checklist_delete_own" on public.user_checklist_items;
create policy "checklist_delete_own"
on public.user_checklist_items
for delete
using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('user-documents', 'user-documents', false)
on conflict (id) do nothing;

drop policy if exists "storage_select_own" on storage.objects;
create policy "storage_select_own"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'user-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "storage_insert_own" on storage.objects;
create policy "storage_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'user-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "storage_update_own" on storage.objects;
create policy "storage_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'user-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'user-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "storage_delete_own" on storage.objects;
create policy "storage_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'user-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);
