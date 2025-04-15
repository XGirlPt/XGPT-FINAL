// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const isDev = process.env.NODE_ENV === 'development';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rotas sensíveis
  if (
    ['/admin/:path*', '/api/:path*', '/login', '/register'].some((path) =>
      pathname.match(path.replace(':path*', '.*'))
    )
  ) {
    return new Response(JSON.stringify({ error: 'Acesso não autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Content-Security-Policy',
    isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.supabase.co; connect-src 'self' https://*.supabase.co ws://localhost:*; frame-ancestors 'none'; font-src 'self' data: https://*.supabase.co; media-src 'self' https://dzwjathgqfvjbqjtthjh.supabase.co https://ulcggrutwonkxbiuigdu.supabase.co"
      : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.supabase.co; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'; font-src 'self' data: https://*.supabase.co; media-src 'self' https://dzwjathgqfvjbqjtthjh.supabase.co https://ulcggrutwonkxbiuigdu.supabase.co"
  );
  response.headers.delete('refresh');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/:path*', '/admin/:path*', '/api/:path*', '/login', '/register', '/anuncios/:path*', '/escort/:path*'],
};