'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, ShieldCheck, Laptop } from 'lucide-react';

export default function AuthCallback() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const handleRedirect = async () => {
            try {
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
                    // Redirect to the desktop app's local listener at 127.0.0.1
                    const localRedirectUrl = new URL('http://127.0.0.1:54321/callback');
                    localRedirectUrl.searchParams.set('access_token', accessToken);
                    if (refreshToken) {
                        localRedirectUrl.searchParams.set('refresh_token', refreshToken);
                    }

                    // Add user ID for identification
                    const supabase = createClient();
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                        localRedirectUrl.searchParams.set('user_id', user.id);
                    }

                    setStatus('success');

                    // Small delay to let the user see the success state
                    setTimeout(() => {
                        window.location.href = localRedirectUrl.toString();
                    }, 1500);
                } else {
                    setStatus('error');
                    console.error("No authentication tokens found in URL");
                }
            } catch (err) {
                setStatus('error');
                console.error("Authentication handover failed:", err);
            }
        };

        handleRedirect();
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] font-sans selection:bg-white/10 selection:text-white">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[120px]"></div>

            <div className="relative z-10 w-full max-w-sm px-6">
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        {/* Logo/Icon Section */}
                        <div className="relative">
                            <div className="absolute -inset-4 animate-pulse rounded-full bg-white/5 blur-xl"></div>
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                                {status === 'loading' && (
                                    <Loader2 className="h-10 w-10 animate-spin text-white/50" />
                                )}
                                {status === 'success' && (
                                    <div className="flex items-center justify-center">
                                        <Laptop className="h-10 w-10 text-white animate-pulse" />
                                        <ShieldCheck className="absolute -bottom-1 -right-1 h-6 w-6 text-emerald-500" />
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="flex items-center justify-center">
                                        <span className="text-3xl">⚠️</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tighter text-white">
                                STUDY.EXE
                            </h1>
                            <div className="space-y-2">
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                                    {status === 'loading' ? 'Authenticating' : status === 'success' ? 'Session Secured' : 'Error'}
                                </p>
                                <p className="text-balance text-sm leading-relaxed text-white/60">
                                    {status === 'loading' && "Synchronizing your secure session with the desktop app..."}
                                    {status === 'success' && "Authentication successful. Returning you to the desktop application."}
                                    {status === 'error' && "We couldn't find your session. Please try signing in again."}
                                </p>
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="w-full pt-4">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                            <div className="mt-4 flex items-center justify-between px-2 text-[10px] font-medium uppercase tracking-widest text-white/30">
                                <span>Secured by Supabase</span>
                                <span className="flex items-center gap-1.5">
                                    <div className={`h-1.5 w-1.5 rounded-full ${status === 'loading' ? 'bg-amber-500 animate-pulse' : status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                    {status}
                                </span>
                            </div>
                        </div>

                        {status === 'error' && (
                            <button
                                onClick={() => window.location.href = '/signin'}
                                className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-95"
                            >
                                Back to Sign In
                            </button>
                        )}
                    </div>
                </div>

                {/* Manual Link */}
                <div className="mt-6 text-center">
                    <p className="text-[11px] text-white/20">
                        Not redirecting?{' '}
                        <a
                            href="http://127.0.0.1:54321/callback"
                            className="text-white/40 decoration-white/20 underline-offset-4 hover:text-white hover:underline transition-colors"
                        >
                            Click to transfer manually
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
