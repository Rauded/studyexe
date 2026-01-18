import { Navbar } from "@/components/landing-ui/Sections";
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { BLOG_POSTS } from '@/utils/blog-data';
import { notFound } from 'next/navigation';
import { MaterialIcon } from "@/components/landing-ui/MaterialIcon";
import Link from "next/link";
import { Button } from "@/components/landing-ui/button";
import { DOWNLOAD_LINK } from "@/utils/constants";

interface BlogPostPageProps {
    params: {
        slug: string;
    }
}

// Generate static params for build time (if using static export, or just optimization)
export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white">


            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 text-zinc-400 hover:text-white pl-0 gap-2">
                        <MaterialIcon name="arrow_left" size="sm" />
                        Back to Journal
                    </Button>
                </Link>

                <article>
                    <div className="mb-10 text-center">
                        <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                            <span className="text-zinc-400 font-mono uppercase tracking-wider">{post.category}</span>
                            <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                            <span className="text-zinc-500">{post.date}</span>
                            <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                            <span className="text-zinc-500">{post.readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    <div className="w-full h-px bg-white/10 mb-12"></div>

                    <div
                        className="prose prose-invert prose-lg max-w-none text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                <div className="mt-20 pt-10 border-t border-white/5 text-center">
                    <p className="text-zinc-500 mb-6">Ready to stop reading and start doing?</p>
                    <a href={DOWNLOAD_LINK}>
                        <Button className="bg-white hover:bg-zinc-200 text-black rounded-full px-8 h-12 text-base font-semibold">
                            Download StudyEXE
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
}
