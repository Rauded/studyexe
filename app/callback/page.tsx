'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';


// wowzes
export default function AuthCallback() {
    useEffect(() => {
        const handleRedirect = async () => {
            // 1. Try to extract from URL hash first (Implicit Flow)
            const hash = window.location.hash.substring(1);
            const hashParams = new URLSearchParams(hash);
            let accessToken = hashParams.get('access_token');
            let refreshToken = hashParams.get('refresh_token');

            // 2. If not in hash, try to get from Supabase session (Code Exchange Flow)
            if (!accessToken) {
                const supabase = createClient();
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    accessToken = session.access_token;
                    refreshToken = session.refresh_token;
                }
            }

            if (accessToken) {
                const localRedirectUrl = new URL('http://localhost:54321/callback');
                localRedirectUrl.searchParams.set('access_token', accessToken);
                if (refreshToken) {
                    localRedirectUrl.searchParams.set('refresh_token', refreshToken);
                }

                // Also helpful to pass the user ID if available
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    localRedirectUrl.searchParams.set('user_id', user.id);
                }

                window.location.href = localRedirectUrl.toString();
            }
        };

        handleRedirect();
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
