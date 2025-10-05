-- =========================
-- EXTENSIONS
-- =========================
create extension if not exists pgcrypto;

-- =========================
-- CORE TABLES
-- =========================

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users(id) on delete cascade,
  email text,
  full_name text,
  password_hash text,               -- placeholder (tidak dipakai Supabase Auth)
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  groom_name text not null,
  bride_name text not null,
  groom_nickname text,
  bride_nickname text,
  groom_parents text,
  bride_parents text,
  date_display text,
  theme_slug text default 'jawabiru',
  cover_photo_url text,
  music_url text,
  is_published boolean default true,
  user_id uuid references auth.users(id) on delete set null,
  custom_domain_suffix text,
  pages_enabled jsonb,
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  type text check (type in ('akad','resepsi','custom')) default 'custom',
  title text,
  date date,
  time text,
  date_display text,
  location text,
  map_url text,
  latitude numeric,
  longitude numeric,
  note text,
  created_at timestamptz default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  type text check (type in ('photo','music','video')) not null,
  url text not null,
  caption text,
  sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  name text not null,
  status text check (status in ('yes','no','pending')) default 'pending',
  message text,
  seats int,
  created_at timestamptz default now()
);

create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  bank_name text,
  account_number text,
  account_name text,
  qr_image_url text
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  title text,
  body text,
  date date,
  date_display text,
  photo_url text,
  sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists public.visit_logs (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references public.invitations(id) on delete cascade,
  ip text,
  ua text,
  created_at timestamptz default now()
);

create or replace function public.increment_view_count(inv_id uuid)
returns void language plpgsql as $$
begin
  update public.invitations
  set view_count = coalesce(view_count,0) + 1
  where id = inv_id;
end; $$;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author text,
  body text,
  rating int check (rating between 1 and 5),
  created_at timestamptz default now()
);

create table if not exists public.themes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  status text not null check (status in ('active','inactive')) default 'inactive',
  preview_url text,
  package_path text,
  created_at timestamptz default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null default 0,
  status text not null check (status in ('unpaid','paid')) default 'unpaid',
  invoice_no text,
  created_at timestamptz default now()
);

-- =========================
-- INDEXES (disarankan)
-- =========================
create index if not exists idx_invitations_user_id on public.invitations(user_id);
create index if not exists idx_events_invitation_id on public.events(invitation_id);
create index if not exists idx_media_invitation_id on public.media(invitation_id);
create index if not exists idx_guests_invitation_id on public.guests(invitation_id);
create index if not exists idx_gifts_invitation_id on public.gifts(invitation_id);
create index if not exists idx_stories_invitation_id on public.stories(invitation_id);
create index if not exists idx_visit_logs_invitation_id on public.visit_logs(invitation_id);
create index if not exists idx_payments_user_id on public.payments(user_id);

-- =========================
-- ENABLE RLS
-- =========================
alter table public.invitations enable row level security;
alter table public.events enable row level security;
alter table public.media enable row level security;
alter table public.guests enable row level security;
alter table public.gifts enable row level security;
alter table public.stories enable row level security;
alter table public.visit_logs enable row level security;
alter table public.testimonials enable row level security;
alter table public.profiles enable row level security;
alter table public.themes enable row level security;
alter table public.settings enable row level security;
alter table public.payments enable row level security;

-- =========================
-- PUBLIC READ (untuk pengunjung)
-- =========================
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='invitations' and policyname='public read invitations') then
    create policy "public read invitations" on public.invitations
      for select to anon, authenticated
      using (is_published = true);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='events' and policyname='public read events when parent published') then
    create policy "public read events when parent published" on public.events
      for select to anon, authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.is_published = true));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='media' and policyname='public read media when parent published') then
    create policy "public read media when parent published" on public.media
      for select to anon, authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.is_published = true));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='gifts' and policyname='public read gifts when parent published') then
    create policy "public read gifts when parent published" on public.gifts
      for select to anon, authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.is_published = true));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='stories' and policyname='public read stories when parent published') then
    create policy "public read stories when parent published" on public.stories
      for select to anon, authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.is_published = true));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='guests' and policyname='public read guests when parent published') then
    create policy "public read guests when parent published" on public.guests
      for select to anon, authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.is_published = true));
  end if;
end $$;

-- Pengunjung boleh isi buku tamu & visit log
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='guests' and policyname='public insert guests') then
    create policy "public insert guests" on public.guests
      for insert to anon, authenticated
      with check (true);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='visit_logs' and policyname='public insert visits') then
    create policy "public insert visits" on public.visit_logs
      for insert to anon, authenticated
      with check (true);
  end if;
end $$;

-- =========================
-- OWNER POLICIES (dashboard client)
-- =========================

-- invitations
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='invitations' and policyname='owner select invitations') then
    create policy "owner select invitations" on public.invitations
      for select to authenticated
      using (user_id = auth.uid());
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='invitations' and policyname='owner insert invitations') then
    create policy "owner insert invitations" on public.invitations
      for insert to authenticated
      with check (user_id = auth.uid());
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='invitations' and policyname='owner update invitations') then
    create policy "owner update invitations" on public.invitations
      for update to authenticated
      using (user_id = auth.uid())
      with check (user_id = auth.uid());
  end if;
end $$;

-- events, media, guests, gifts, stories → CRUD bila parent invitation miliknya
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='events' and policyname='owner crud events') then
    create policy "owner crud events" on public.events
      for all to authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()))
      with check (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='media' and policyname='owner crud media') then
    create policy "owner crud media" on public.media
      for all to authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()))
      with check (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='guests' and policyname='owner crud guests') then
    create policy "owner crud guests" on public.guests
      for all to authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()))
      with check (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='gifts' and policyname='owner crud gifts') then
    create policy "owner crud gifts" on public.gifts
      for all to authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()))
      with check (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='stories' and policyname='owner crud stories') then
    create policy "owner crud stories" on public.stories
      for all to authenticated
      using (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()))
      with check (exists (select 1 from public.invitations i where i.id = invitation_id and i.user_id = auth.uid()));
  end if;
end $$;

-- profiles: user hanya boleh baca profilnya sendiri
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='read own profile') then
    create policy "read own profile" on public.profiles
      for select to authenticated
      using (user_id = auth.uid());
  end if;
end $$;

-- payments: user boleh lihat miliknya
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='payments' and policyname='payments_select_own') then
    create policy "payments_select_own" on public.payments
      for select to authenticated
      using (auth.uid() = user_id);
  end if;
end $$;

-- =========================
-- THEMES & SETTINGS (public read; admin tulis via service role)
-- =========================
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='themes' and policyname='themes_select_public') then
    create policy "themes_select_public" on public.themes
      for select using (true);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='settings' and policyname='settings_select_all') then
    create policy "settings_select_all" on public.settings
      for select using (true);
  end if;
end $$;

-- =========================
-- STORAGE BUCKETS & POLICIES
-- =========================

-- Bucket tema (public read)
insert into storage.buckets (id, name, public) values ('themes','themes', true)
on conflict (id) do nothing;

-- (Opsional) Bucket media undangan (public read)
insert into storage.buckets (id, name, public) values ('invitation-media','invitation-media', true)
on conflict (id) do nothing;

-- Drop policies lama agar idempotent
drop policy if exists "themes_public_read"  on storage.objects;
drop policy if exists "themes_owner_write"  on storage.objects;
drop policy if exists "themes_owner_update" on storage.objects;
drop policy if exists "themes_owner_delete" on storage.objects;
drop policy if exists "themes_admin_write"  on storage.objects;
drop policy if exists "themes_admin_update" on storage.objects;
drop policy if exists "themes_admin_delete" on storage.objects;

drop policy if exists "invmedia_public_read"  on storage.objects;
drop policy if exists "invmedia_owner_write"  on storage.objects;
drop policy if exists "invmedia_owner_update" on storage.objects;
drop policy if exists "invmedia_owner_delete" on storage.objects;

-- themes: public SELECT
create policy "themes_public_read" on storage.objects
  for select
  using (bucket_id = 'themes');

-- INSERT harus pakai WITH CHECK (tanpa USING)
create policy "themes_owner_write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'themes');

-- UPDATE boleh pakai USING + WITH CHECK
create policy "themes_owner_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'themes')
  with check (bucket_id = 'themes');

-- (opsional) DELETE
-- create policy "themes_owner_delete" on storage.objects
--   for delete to authenticated
--   using (bucket_id = 'themes');

-- invitation-media (opsional): public read, authenticated write/update
create policy "invmedia_public_read" on storage.objects
  for select
  using (bucket_id = 'invitation-media');

create policy "invmedia_owner_write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'invitation-media');

create policy "invmedia_owner_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'invitation-media')
  with check (bucket_id = 'invitation-media');

-- =========================
-- SEED minimal
-- =========================

-- Tema default
insert into public.themes (slug, name, status, preview_url)
values ('jawabiru', 'Jawa Biru', 'active', null)
on conflict (slug) do nothing;

-- Setting default
insert into public.settings (key, value)
values ('global', jsonb_build_object(
  'trial_days', 7,
  'active_days', 365,
  'price', 250000,
  'payment_provider', jsonb_build_object('midtrans_enabled', false),
  'bank', jsonb_build_object('name','','number','','owner',''),
  'contact', jsonb_build_object(
    'host_email','','smtp_email','','smtp_password','',
    'wa_token','','wa_number','','wa_message',''
  )
))
on conflict (key) do nothing;

-- Contoh undangan (opsional)
insert into public.invitations (slug, title, groom_name, bride_name, groom_nickname, bride_nickname, date_display, theme_slug, is_published)
values ('contoh-rahmat-nisa', 'The Wedding of Rahmat & Nisa', 'Rahmat', 'Nisa', 'Aat', 'Nis', 'Sabtu, 25 Oktober 2025', 'jawabiru', true)
on conflict (slug) do nothing;

insert into public.events (invitation_id, type, title, date, time, date_display, location, map_url, latitude, longitude, note)
select id, 'akad', 'Akad Nikah', '2025-10-25', '09:00 WIB', 'Sabtu, 25 Okt 2025 • 09.00', 'Masjid Al-Ikhlas, Jakarta',
       'https://maps.google.com', -6.1754, 106.8272, 'Mohon hadir 15 menit sebelum acara'
from public.invitations where slug='contoh-rahmat-nisa';

insert into public.events (invitation_id, type, title, date, time, date_display, location, map_url, latitude, longitude, note)
select id, 'resepsi', 'Resepsi', '2025-10-25', '19:00 WIB', 'Sabtu, 25 Okt 2025 • 19.00', 'Gedung Serbaguna, Jakarta',
       'https://maps.google.com', -6.2000, 106.8166, null
from public.invitations where slug='contoh-rahmat-nisa';
