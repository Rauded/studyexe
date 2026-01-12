"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOWNLOAD_LINK } from "@/utils/constants";

export default function Footer() {
    const pathname = usePathname();

    // Don't show footer on landing page because it already has it in AsciiArtSection
    if (pathname === "/") return null;

    const links = [
        { name: 'Download', href: DOWNLOAD_LINK },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Press Kit', href: '/press-kit' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Use', href: '/terms-of-use' }
    ];

    return (
        <footer className="w-full bg-black py-12 px-4 border-t border-zinc-900 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-left">
                    <h3 className="text-white font-bold tracking-widest text-xl mb-1">study.exe</h3>
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">Anti-Distraction Militia</p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
                    {links.map((link) => {
                        const isExternal = link.href.startsWith('http');
                        const className = "text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-wider group flex items-center gap-2";

                        if (isExternal) {
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={className}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>{link.name}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </a>
                            );
                        }
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={className}
                            >
                                <span>{link.name}</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
                <p>© {new Date().getFullYear()} study.exe. all rights reserved.</p>
                <p>built for those who refuse to lose.</p>
            </div>
        </footer>
    );
}
