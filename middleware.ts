import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard"]
  const authRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"]

  // Check if accessing protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // In a real app, check for auth token
    // For now, allow access (implement actual auth check)
    return NextResponse.next()
  }

  // If accessing auth routes while logged in, redirect to dashboard
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    // In a real app, check for auth token
    // For now, allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
