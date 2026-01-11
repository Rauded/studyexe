"use client";

import { useEffect } from "react";

export default function DownloadPage() {
    // Cloudflare R2/S3 download URL - update this with your actual URL
    const DOWNLOAD_URL = "https://pub-xxxxx.r2.dev/studyexe_Setup.exe";

    useEffect(() => {
        // Auto-start download after a brief delay
        const timer = setTimeout(() => {
            window.location.href = DOWNLOAD_URL;
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-mono">
            {/* Grid background */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        study<span className="text-[#30D158]">.exe</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">
                        Windows Desktop Application
                    </p>
                </div>

                {/* Download indicator */}
                <div className="mb-12">
                    <div className="w-16 h-16 mx-auto mb-6 relative">
                        {/* Spinning ring */}
                        <div className="absolute inset-0 border-4 border-gray-800 rounded-full" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-[#30D158] rounded-full animate-spin" />
                        {/* Download icon */}
                        <svg
                            className="absolute inset-0 w-8 h-8 m-auto text-[#30D158]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Your download is starting...</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        The installer should begin automatically. If it doesn't,{" "}
                        <a
                            href={DOWNLOAD_URL}
                            className="text-[#30D158] hover:underline font-medium"
                        >
                            click here to download manually
                        </a>
                        .
                    </p>
                </div>

                {/* File info */}
                <div className="bg-[#121214] rounded-xl p-6 max-w-sm mx-auto border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1C1C1E] rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📦</span>
                        </div>
                        <div className="text-left">
                            <p className="font-bold">studyexe_Setup.exe</p>
                            <p className="text-gray-500 text-sm">Windows 10/11 • ~150 MB</p>
                        </div>
                    </div>
                </div>

                {/* Requirements */}
                <div className="mt-12 text-sm text-gray-500">
                    <p className="mb-2 font-semibold text-gray-400">System Requirements</p>
                    <ul className="space-y-1">
                        <li>Windows 10 or Windows 11</li>
                        <li>4 GB RAM minimum</li>
                        <li>Webcam (for eye-tracking features)</li>
                    </ul>
                </div>

                {/* Back link */}
                <div className="mt-12">
                    <a
                        href="/"
                        className="text-gray-500 hover:text-white transition-colors text-sm"
                    >
                        ← Back to studyexe.com
                    </a>
                </div>
            </div>
        </div>
    );
}
