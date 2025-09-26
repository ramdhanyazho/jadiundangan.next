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
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists themes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists global_settings (
  id int primary key default 1,
  trial_days int default 7,
  active_days int default 180,
  price numeric default 250000,
  bank_name text,
  bank_number text,
  bank_owner text,
  midtrans_enabled boolean default false,
  midtrans_server_key text,
  smtp_host text,
  smtp_email text,
  smtp_password text,
  wa_token text,
  whatsapp_number text,
  whatsapp_message text
);
insert into global_settings (id) values (1) on conflict (id) do nothing;

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
  user_id uuid,
  user_email text,
  invitation_id uuid references invitations(id) on delete set null,
  amount numeric,
  method text,
  status text,
  snap_token text,
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
alter table global_settings enable row level security;
alter table visit_logs enable row level security;
alter table testimonials enable row level security;
alter table payments enable row level security;

-- public read published
create policy "public read invitations" on invitations for select to anon, authenticated using (is_published = true);
create policy "public read events when parent published" on events for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read media when parent published" on media for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read gifts when parent published" on gifts for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read stories when parent published" on stories for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public read themes" on themes for select to anon, authenticated using (is_active = true);
create policy "public read settings" on global_settings for select to anon, authenticated using (true);
create policy "public read guests when parent published" on guests for select to anon, authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.is_published = true) );
create policy "public insert guests" on guests for insert to anon, authenticated with check (true);
create policy "public insert visits" on visit_logs for insert to anon, authenticated with check (true);

-- owner rules (simplified for demo)
create policy "owner update invitations" on invitations for update to authenticated using (user_id = auth.uid());
create policy "owner read visits" on visit_logs for select to authenticated using ( exists (select 1 from invitations i where i.id = invitation_id and i.user_id = auth.uid()) );
create policy "read own profile" on profiles for select to authenticated using (user_id = auth.uid());
create policy "public read payments" on payments for select to anon, authenticated using (true);

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
