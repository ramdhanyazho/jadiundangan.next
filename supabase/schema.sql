create extension if not exists pgcrypto;

-- Core tables
create table if not exists invitations (
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
  user_id uuid,
  custom_domain_suffix text,
  pages_enabled jsonb,
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade,
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

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade,
  type text check (type in ('photo','music','video')) not null,
  url text not null,
  caption text,
  sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade,
  name text not null,
  status text check (status in ('yes','no','pending')) default 'pending',
  message text,
  seats int,
  created_at timestamptz default now()
);

create table if not exists gifts (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade,
  bank_name text,
  account_number text,
  account_name text,
  qr_image_url text
);

-- Stories
create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade,
  title text,
  body text,
  date date,
  date_display text,
  photo_url text,
  sort_index int default 0,
  created_at timestamptz default now()
);

-- Profiles & Themes & Global settings
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  email text,
  full_name text,
  password_hash text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists themes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  status text not null check (status in ('active','inactive')) default 'inactive',
  preview_url text,
  package_path text,
  created_at timestamptz default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Visits, Testimonials, Payments
create table if not exists visit_logs (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid references invitations(id) on delete cascade,
  ip text,
  ua text,
  created_at timestamptz default now()
);
create or replace function increment_view_count(inv_id uuid) returns void language plpgsql as $$ begin update invitations set view_count = coalesce(view_count,0) + 1 where id = inv_id; end; $$;

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author text,
  body text,
  rating int check (rating between 1 and 5),
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null default 0,
  status text not null check (status in ('unpaid','paid')) default 'unpaid',
  invoice_no text,
  created_at timestamptz default now()
);

-- RLS
alter table invitations enable row level security;
alter table events enable row level security;
alter table media enable row level security;
alter table guests enable row level security;
alter table gifts enable row level security;
alter table stories enable row level security;
alter table profiles enable row level security;
alter table themes enable row level security;
alter table settings enable row level security;
alter table visit_logs enable row level security;
alter table testimonials enable row level security;
alter table payments enable row level security;

-- User boleh melihat payment miliknya
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'payments' and policyname = 'payments_select_own'
  ) then
    create policy "payments_select_own" on public.payments
      for select using (auth.uid() = user_id);
  end if;
end
$$;

-- Semua user boleh melihat tema aktif
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'themes' and policyname = 'themes_select_public'
  ) then
    create policy "themes_select_public" on public.themes
      for select using (true);
  end if;
end
$$;

-- Semua orang boleh membaca settings
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'settings' and policyname = 'settings_select_all'
  ) then
    create policy "settings_select_all" on public.settings
      for select using (true);
  end if;
end
$$;

-- public read published
create policy "public read invitations" on invitations for select to anon, authenticated using (is_published = true);
create policy "public read events when parent published" on events for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read media when parent published" on media for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read gifts when parent published" on gifts for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read stories when parent published" on stories for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read guests when parent published" on guests for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public insert guests" on guests for insert to anon, authenticated with check (true);
create policy "public insert visits" on visit_logs for insert to anon, authenticated with check (true);

-- owner rules (simplified for demo)
create policy "owner update invitations" on invitations for update to authenticated using (user_id = auth.uid());
create policy "owner read visits" on visit_logs for select to authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.user_id = auth.uid()) );
create policy "read own profile" on profiles for select to authenticated using (user_id = auth.uid());

-- Seed example
insert into invitations (slug, title, groom_name, bride_name, groom_nickname, bride_nickname, date_display, theme_slug, is_published)
values ('contoh-rahmat-nisa', 'The Wedding of Rahmat & Nisa', 'Rahmat', 'Nisa', 'Aat', 'Nis', 'Sabtu, 25 Oktober 2025', 'jawabiru', true)
on conflict (slug) do nothing;

insert into events (invitation_id, type, title, date, time, date_display, location, map_url, latitude, longitude, note)
select id, 'akad', 'Akad Nikah', '2025-10-25', '09:00 WIB', 'Sabtu, 25 Okt 2025 • 09.00', 'Masjid Al-Ikhlas, Jakarta', 'https://maps.google.com', -6.1754, 106.8272, 'Mohon hadir 15 menit sebelum acara'
from invitations where slug='contoh-rahmat-nisa';

insert into events (invitation_id, type, title, date, time, date_display, location, map_url, latitude, longitude, note)
select id, 'resepsi', 'Resepsi', '2025-10-25', '19:00 WIB', 'Sabtu, 25 Okt 2025 • 19.00', 'Gedung Serbaguna, Jakarta', 'https://maps.google.com', -6.2000, 106.8166, null
from invitations where slug='contoh-rahmat-nisa';

insert into media (invitation_id, type, url, caption, sort_index)
select id, 'photo', 'https://images.unsplash.com/photo-1522673607200-164d1b6ee97d', 'Engagement', 1
from invitations where slug='contoh-rahmat-nisa';

insert into stories (invitation_id, title, body, date, date_display, photo_url, sort_index)
select id, 'Pertama Bertemu', 'Kami berkenalan melalui seorang teman, tidak disangka jadi awal cerita kami.', '2023-06-01', 'Juni 2023', null, 1
from invitations where slug='contoh-rahmat-nisa' on conflict do nothing;

insert into stories (invitation_id, title, body, date, date_display, photo_url, sort_index)
select id, 'Lamaran', 'Momen hangat bersama keluarga sebagai langkah keseriusan.', '2025-05-12', '12 Mei 2025', null, 2
from invitations where slug='contoh-rahmat-nisa' on conflict do nothing;

-- Seed admin profile
insert into profiles (user_id, email, full_name, password_hash, is_admin)
values (
  '00000000-0000-0000-0000-000000000001',
  'admin@example.com',
  'Admin Supabase',
  crypt(' P@ssw0rd!', gen_salt('bf')),
  true
)
on conflict (user_id) do update set
  email = excluded.email,
  full_name = excluded.full_name,
  password_hash = excluded.password_hash,
  is_admin = true;

-- STORAGE bucket untuk tema
insert into storage.buckets (id, name, public) values ('themes','themes', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'themes_public_read'
  ) then
    create policy "themes_public_read" on storage.objects
      for select using (bucket_id = 'themes');
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'themes_owner_write'
  ) then
    create policy "themes_owner_write" on storage.objects
      for insert to authenticated using (bucket_id = 'themes')
      with check (bucket_id = 'themes');
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'themes_owner_update'
  ) then
    create policy "themes_owner_update" on storage.objects
      for update to authenticated using (bucket_id = 'themes')
      with check (bucket_id = 'themes');
  end if;
end
$$;
