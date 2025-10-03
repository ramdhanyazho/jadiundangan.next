import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/client/:path*', '/admin/:path*'],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('sb-access-token')?.value;

 if (!accessToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    if (request.nextUrl.pathname !== '/login') {
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    }
    redirectUrl.search = redirectUrl.searchParams.toString();
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}