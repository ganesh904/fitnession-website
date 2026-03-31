import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Simple middleware - just pass through for now
  // Auth is handled in API routes
  return NextResponse.next()
}

// Specify which routes to run middleware on
export const config = {
  matcher: [
    '/premium/:path*',
    '/api/:path*',
  ],
}
