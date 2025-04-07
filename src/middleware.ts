import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { rateLimit } from '@/lib/rate-limit'
import { logError } from '@/lib/logger'

export default withAuth(
  async function middleware(req) {
    try {
      // Rate limiting
      const ip = req.ip ?? '127.0.0.1'
      const { success } = await rateLimit.limit(ip)
      
      if (!success) {
        return new NextResponse('Too Many Requests', { status: 429 })
      }

      // Verificar token
      const token = await getToken({ req })
      
      // Redirecionar usuários autenticados da página de login
      if (token && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      
      // Proteger rotas administrativas
      if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!token) {
          return NextResponse.redirect(new URL('/login', req.url))
        }
        
        if (token.role !== 'admin') {
          return NextResponse.redirect(new URL('/login', req.url))
        }
      }

      // Headers de segurança
      const response = NextResponse.next()
      
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('X-Content-Type-Options', 'nosniff')
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
      response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
      response.headers.set('X-XSS-Protection', '1; mode=block')
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
      
      return response
    } catch (error) {
      logError(error as Error, { path: req.nextUrl.pathname })
      return NextResponse.redirect(new URL('/error', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/api/:path*'
  ]
} 