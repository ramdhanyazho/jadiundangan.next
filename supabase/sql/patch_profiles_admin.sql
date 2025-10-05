-- Pastikan kolom ada
alter table public.profiles
  add column if not exists is_admin boolean default false,
  add column if not exists password_hash text;

-- RLS baca profil sendiri (aman dijalankan berulang)
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='read own profile') then
    create policy "read own profile" on public.profiles
      for select to authenticated
      using (user_id = auth.uid());
  end if;
end $$;

-- Sinkronkan row profil untuk admin@gmail.com jika user Auth-nya sudah ada
insert into public.profiles (user_id, email, full_name, is_admin)
select u.id, u.email, 'Admin Supabase', true
from auth.users u
where lower(u.email) = lower('admin@gmail.com')
on conflict (user_id) do update
  set email = excluded.email,
      full_name = excluded.full_name,
      is_admin = true;

-- Verifikasi
select u.id as auth_id, u.email, p.is_admin
from auth.users u
left join public.profiles p on p.user_id = u.id
where lower(u.email) = lower('admin@gmail.com');
