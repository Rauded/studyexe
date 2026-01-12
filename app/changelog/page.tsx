import { Navbar } from "@/components/landing-ui/Sections";
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { Badge } from "@/components/landing-ui/badge";

export default async function ChangelogPage() {
    const supabase = createClient();
    const user = await getUser(supabase);

    const changes = [
        {
            version: "v1.0.1",
            date: "January 14, 2026",
            type: "patch",
            title: "Stability & Performance",
            items: [
                "Fixed an issue where the eye-tracking algorithm was too sensitive to low light.",
                "Optimized kernel driver for faster startup times.",
                "Added 'Emergency Unlock' verification for verified medical emergencies."
            ]
        },
        {
            version: "v1.0.0",
            date: "January 1, 2026",
            type: "major",
            title: "Initial Public Release",
            items: [
                "Released StudyEXE to the public.",
                "Kernel-level app blocking enabled for Windows 10/11.",
                "Integrated Stripe subscription management.",
                "Deployed global leaderboard for 'Focus Hours'."
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar user={user} />

            <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-5xl font-bold mb-6 tracking-tighter">Changelog</h1>
                    <p className="text-xl text-muted-foreground">
                        Tracking the evolution of the ultimate focus tool.
                    </p>
                </div>

                <div className="space-y-12 relative border-l border-zinc-800 ml-3 pl-8 md:pl-12">
                    {changes.map((change, i) => (
                        <div key={i} className="relative">
                            {/* Dot on timeline */}
                            <div className="absolute -left-[43px] md:-left-[59px] top-2 w-5 h-5 rounded-full bg-zinc-900 border-4 border-zinc-800" />

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-white">{change.version}</h2>
                                    <Badge variant={change.type === 'major' ? 'default' : 'outline'} className={change.type === 'major' ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/50" : "text-zinc-400"}>
                                        {change.type}
                                    </Badge>
                                </div>
                                <span className="text-zinc-500 text-sm font-mono">{change.date}</span>
                            </div>

                            <h3 className="text-lg font-medium text-zinc-300 mb-4">{change.title}</h3>

                            <ul className="space-y-2">
                                {change.items.map((item, j) => (
                                    <li key={j} className="text-zinc-400 leading-relaxed list-disc list-inside marker:text-zinc-600">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
