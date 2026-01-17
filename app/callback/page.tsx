'use client';

import { useEffect } from 'react';

/**
 * AuthCallback Component
 *
 * This page handles the redirect back to the local StudyExe application
 * after a successful authentication flow on the website.
 * It extracts Supabase tokens from the URL hash and passes them to
 * the local server at http://localhost:54321.
 */
export default function AuthCallback() {
    useEffect(() => {
        // Extract tokens from the URL hash (Supabase default behavior for implicit flow)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
            // Redirect to the local StudyExe app
            // We pass the tokens as query parameters to our local server
            const localRedirectUrl = new URL('http://localhost:54321/callback');
            localRedirectUrl.searchParams.set('access_token', accessToken);
            if (refreshToken) {
                localRedirectUrl.searchParams.set('refresh_token', refreshToken);
            }

            window.location.href = localRedirectUrl.toString();
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-4">
            <div className="flex flex-col items-center space-y-6 max-w-md text-center">
                {/* Loading Spinner */}
                <div className="w-12 h-12 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>

                <h1 className="text-2xl font-semibold tracking-tight">
                    Completing Authentication
                </h1>

                <p className="text-gray-400">
                    We're securely passing your session back to the StudyExe application. This should only take a moment.
                </p>

                <div className="pt-8 text-sm text-gray-500">
                    Not redirecting? <a href="http://localhost:54321" className="text-white hover:underline">Click here</a> to try manually.
                </div>
            </div>
        </div>
    );
}
