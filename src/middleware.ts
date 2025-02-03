import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authenticateRequest } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to the home page without authentication
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next();
  }
  
  try {
    const user = await authenticateRequest();
  
    if (user) {
      // Attach user to request if needed
      request.headers.set('x-user-id', user.userId);
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};