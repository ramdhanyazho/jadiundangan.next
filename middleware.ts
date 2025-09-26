import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isAuthenticated = (request: NextRequest) => {
  return (
    Boolean(request.cookies.get('sb-access-token')?.value) ||
    Boolean(request.cookies.get('sb:token')?.value) ||
    Boolean(request.cookies.get('sb-refresh-token')?.value)
  );
};

export const config = {
  matcher: ['/login', '/admin/:path*', '/dashboard/:path*'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = isAuthenticated(request);

  if (pathname.startsWith('/login')) {
    if (!loggedIn) {
      return NextResponse.next();
    }

    const isAdmin = request.cookies.get('is_admin')?.value === 'true';
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = isAdmin ? '/admin' : '/dashboard';
    redirectUrl.search = '';

    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/admin')) {
    if (!loggedIn) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!loggedIn) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}