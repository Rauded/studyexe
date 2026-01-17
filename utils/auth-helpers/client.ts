'use client';

import { createClient } from '@/utils/supabase/client';
import { type Provider } from '@supabase/supabase-js';
import { getURL } from '@/utils/helpers';
import { redirectToPath } from './server';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  // Prevent default form submission refresh
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Prevent default form submission refresh
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get('provider')).trim() as Provider;

  // Create client-side supabase client and call signInWithOAuth
  const supabase = createClient();

  // 1. Get the 'next' parameter from the current URL (?next=/callback)
  const searchParams = new URLSearchParams(window.location.search);
  const next = searchParams.get('next') || '/account';

  // 2. Tell Supabase to redirect back to your website's HANDOVER logic
  // We explicitly use window.location.origin to ensure the absolute URL is correct
  const redirectURL = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL
    }
  });
}
