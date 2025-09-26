# JadiUndangan — Next.js + TailwindCSS + Supabase (Blueprint v3)

## Setup
1) `cp .env.example .env.local` lalu isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2) Jalankan: `npm install` lalu `npm run dev`.
3) Di Supabase, buka **SQL Editor** dan jalankan `supabase/schema.sql` (buat bucket Storage `media` public).

## Fitur
- Undangan by slug `/undangan/[slug]` (SSR).
- Hero + Overlay "Buka Undangan" (scroll lock + autoplay musik).
- Section: Our Story, Acara (+ peta Leaflet bila ada lat/lng), Galeri, Gifts, RSVP + daftar ucapan (terbaru).
- Tracking kunjungan via `/api/track-visit` + fungsi `increment_view_count`.
- Dashboard Client (website settings, buku tamu, metrik, testimoni, support).
- Dashboard Admin (users, themes, payments, settings).

© 2025 JadiUndangan
