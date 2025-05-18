import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the root path and not already redirected
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/profile-setup';
    
    // Preserve any query parameters
    url.search = request.nextUrl.search;
    
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run middleware on the root path
export const config = {
  matcher: ['/'],
}; 