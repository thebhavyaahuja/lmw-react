import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname);
  const googleId = request.cookies.get('googleId')?.value;
  console.log('Google ID Cookie:', googleId);

  if (!googleId && !request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (googleId && request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
