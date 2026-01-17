import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }

    // URL to redirect to after sign in process completes
    const next = requestUrl.searchParams.get('next');

    // If we're redirecting to the callback page, pass the tokens in the hash
    if (next && next.startsWith('/callback') && data?.session) {
      const { access_token, refresh_token } = data.session;
      const redirectUrl = new URL(`${requestUrl.origin}${next}`);
      // Supabase / Google auth returns tokens in hash, so we mimic that structure
      // or we can pass them as search params for our bridge to read.
      // The bridge logic reads from hash OR session. Let's start with hash to match implicit flow.
      // But URL searchParams is easier for server-side construction.
      // The bridge reads `window.location.hash` AND also checks session.
      // Let's explicitly put them in the hash so the bridge sees them immediately.
      // construct the hash string
      redirectUrl.hash = `access_token=${access_token}&refresh_token=${refresh_token}`;

      return NextResponse.redirect(redirectUrl);
    }

    if (next) {
      return NextResponse.redirect(`${requestUrl.origin}${next}`);
    }
  }

  // URL to redirect to after sign in process completes
  const next = requestUrl.searchParams.get('next');

  if (next) {
    return NextResponse.redirect(`${requestUrl.origin}${next}`);
  }

  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/account`,
      'Success!',
      'You are now signed in.'
    )
  );
}
