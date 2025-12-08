import { getSession } from '@libs/auth-client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

const PROTECTED_ROUTES = ['/profile']

const AUTH_ROUTES = ['/sign-in', '/sign-up']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const session = await getSession({
    headers: await headers()
  })

  if (PROTECTED_ROUTES.includes(pathname)) {
    if (session?.data) {
      return NextResponse.redirect(new URL('/', request.url))
    } else {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  } else if (AUTH_ROUTES.includes(pathname)) {
    if (session?.data) {
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
