// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the session cookie from the request
  const sessionCookie = request.cookies.get('session')?.value;

  // URL of the login page
  const loginUrl = new URL('/index.html', request.url);

  // Define paths that require authentication
  const protectedPaths = ['/dashboard', '/account'];
  
  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // If it's a protected path and there's no session cookie, redirect to login
  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(loginUrl);
  }

  // Allow all other requests to proceed (home page, contact, etc.)
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // This middleware runs on all paths EXCEPT for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - index.html (our login page)
  // - signup.html (our signup page)
  // - and other static assets in /public
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|index.html|signup.html|.*\\.png$).*)',
  ],
}
