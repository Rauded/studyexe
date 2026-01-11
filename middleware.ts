import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { getTierForCountry } from '@/utils/pricing-tiers';

export async function middleware(request: NextRequest) {
  // Detect country from Vercel headers or local development
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  // Set a cookie for the pricing tier
  const response = await updateSession(request);
  const tier = getTierForCountry(country);

  response.cookies.set('pricing-tier', tier.toString(), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax'
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
