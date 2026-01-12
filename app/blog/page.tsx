import { Navbar } from "@/components/landing-ui/Sections";
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { MaterialIcon } from "@/components/landing-ui/MaterialIcon";
import Link from 'next/link';
import { Button } from "@/components/landing-ui/button";

export default async function BlogPage() {
    const supabase = createClient();
    const user = await getUser(supabase);

    const posts = [
        {
            slug: "dopamine-fasting",
            title: "The Science of Dopamine Fasting: Why You Feel Empty",
            excerpt: "Your brain is fried. Constant stimulation has down-regulated your receptors. Here is how to fix it in 24 hours.",
            date: "Jan 10, 2026",
            readTime: "5 min read",
            category: "Science"
        },
        {
            slug: "phone-addiction",
            title: "Why Your Phone Is Destroying Your Ability to Think",
            excerpt: "It's not just a distraction; it's physically reshaping your neural pathways. We analyze the latest MRI studies.",
            date: "Jan 05, 2026",
            readTime: "8 min read",
            category: "Health"
        },
        {
            slug: "deep-work",
            title: "Deep Work: How to Study for 12 Hours Straight",
            excerpt: "The specific protocol used by elite medical students and top engineers to enter a flow state on command.",
            date: "Dec 28, 2025",
            readTime: "12 min read",
            category: "Guide"
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar user={user} />

            <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-widest mb-6">
                        StudyEXE Journal
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                        Restoring <span className="text-emerald-500">Focus</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights on neuroscience, productivity, and the war for your attention.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <article key={i} className="group flex flex-col h-full bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/20 transition-all hover:bg-zinc-900/40">
                            {/* Placeholder for image */}
                            <div className="h-48 bg-zinc-900/50 w-full flex items-center justify-center border-b border-white/5 group-hover:bg-zinc-900/80 transition-colors">
                                <MaterialIcon name="article" className="text-zinc-700 group-hover:text-zinc-500 transition-colors" size="2xl" />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono text-emerald-500">{post.category}</span>
                                    <span className="text-xs text-zinc-500">{post.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-xs text-zinc-600">{post.date}</span>
                                    <Button variant="link" size="sm" className="text-white p-0 h-auto gap-1 group-hover:gap-2 transition-all">
                                        Read <MaterialIcon name="arrow_forward" size="sm" />
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
