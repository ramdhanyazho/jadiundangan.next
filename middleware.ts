import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options: CookieOptions) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options: CookieOptions) => {
          res.cookies.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  const publicPaths = new Set(['/admin', '/admin/login', '/client/login', '/client/register', '/auth/callback']);
  if (publicPaths.has(path)) {
    return res;
  }

  // ===== Admin rules =====
  // /admin  -> public (login page)
  // /admin/* (kecuali /admin & /admin/login) -> perlu user admin
  if (path.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  // ===== Client rules =====
  // /client/login & /client/register -> selalu boleh diakses (jangan auto-redirect)
  // /client (dashboard) & /client/* selain dua di atas -> butuh user
  if (path.startsWith('/client')) {
    if (path === '/client' || path.startsWith('/client/')) {
      if (!user) {
        return NextResponse.redirect(new URL('/client/login', req.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
