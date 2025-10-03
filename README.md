# JadiUndangan — Next.js + TailwindCSS + Supabase (Blueprint v3)

## Setup
1) `cp .env.example .env.local` lalu isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, dan `BOOTSTRAP_TOKEN`.
2) Jalankan: `npm install` lalu `npm run dev`.
3) Di Supabase, buka **SQL Editor** dan jalankan `supabase/schema.sql` lalu `supabase/trigger_profiles.sql` (buat bucket Storage `media` public)

### Kredensial Admin Supabase
- Password **tidak** disimpan di tabel `profiles`. Supabase Auth menyimpan hash password secara terpisah di sistem autentikasinya.
- Untuk membuat/ubah password admin, buka **Authentication → Users** di dashboard Supabase, pilih user yang diinginkan, lalu atur password atau kirim tautan reset.
- Pastikan entri pada tabel `profiles` memiliki `is_admin = true` (atau `role = 'admin'` jika kolom tersebut ada) supaya pengguna diarahkan ke `/admin` setelah login.
- Berkas `supabase/schema.sql` juga menambahkan profil admin contoh dengan email `admin@example.com` dan password `P@ssw0rd!` untuk kebutuhan testing lokal.


## Fitur
- Undangan by slug `/undangan/[slug]` (SSR).
- Hero + Overlay "Buka Undangan" (scroll lock + autoplay musik).
- Section: Our Story, Acara (+ peta Leaflet bila ada lat/lng), Galeri, Gifts, RSVP + daftar ucapan (terbaru).
- Tracking kunjungan via `/api/track-visit` + fungsi `increment_view_count`.
- Dashboard Client (website settings, buku tamu, metrik, testimoni, support).
- Dashboard Admin (users, themes, payments, settings).

## Debug Kit Supabase
- **Health check**: buka `/api/_debug/auth` dan pastikan respons JSON menampilkan `hasUrl: true`, `hasAnon: true`, dan `authSettings.emailEnabled: true` untuk provider email Supabase.
- **Seed admin pertama (sekali saja)**:

```bash
curl -X POST https://<domain>/api/_admin/create-user \
  -H "x-bootstrap-token: $BOOTSTRAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"Admin#123","is_admin":true}'
```

- Setelah seeding, login memakai kredensial tersebut di `/login`.


© 2025 JadiUndangan
