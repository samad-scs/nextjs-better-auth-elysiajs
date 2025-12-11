import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/profile']

const AUTH_ROUTES = ['/sign-in', '/sign-up']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const cookies = getSessionCookie(request)

  if (PROTECTED_ROUTES.includes(pathname)) {
    if (!!cookies) {
      return NextResponse.redirect(new URL('/', request.url))
    } else {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  } else if (AUTH_ROUTES.includes(pathname)) {
    if (!!cookies) {
      return NextResponse.redirect(new URL('/', request.url))
    } else {
      return NextResponse.next()
    }
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/:path*'
}
