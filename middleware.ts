// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const path = request.nextUrl.pathname

  // Public paths
  const isPublicPath = path === '/login' || path === '/sign_up' || path === '/'

  // If no token and trying to access protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If has token and trying to access auth pages
  if (token && isPublicPath && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/my-shop/:path*',
    '/profile/:path*',
    '/login',
    '/sign_up',
  ],
}