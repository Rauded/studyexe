import { Navbar } from "@/components/landing-ui/Sections";
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { MaterialIcon } from "@/components/landing-ui/MaterialIcon";

export default async function AboutPage() {
    const supabase = createClient();
    const user = await getUser(supabase);

    return (
        <main className="min-h-screen bg-black text-white">


            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                        About <span className="text-emerald-500">Us</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        We are not a "productivity app" company. We are an <span className="text-white font-semibold">anti-distraction militia</span>.
                    </p>
                </div>

                <div className="grid gap-12">
                    <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-500/10 rounded-xl">
                                <MaterialIcon name="target" className="text-red-500" size="lg" />
                            </div>
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-lg text-gray-300 leading-8">
                            The modern world is engineered to destroy your attention span. Social media algorithms,
                            notification pings, and infinite scroll feeds are Weapons of Mass Distraction targeting your dopamine receptors.
                            <br /><br />
                            StudyEXE is the counter-weapon. We build software that ruthlessly eliminates digital noise
                            so you can reclaim your brain and your future. We don't believe in "gentle nudges."
                            We believe in nuclear deterrence.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <MaterialIcon name="shield" className="text-emerald-500" />
                                No Mercy
                            </h3>
                            <p className="text-gray-400">
                                We prioritize results over feelings. If blocking your favorite game makes you angry, good.
                                Use that anger to study.
                            </p>
                        </section>

                        <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <MaterialIcon name="bolt" className="text-yellow-500" />
                                Extreme Focus
                            </h3>
                            <p className="text-gray-400">
                                Deep work is the only currency that matters in the knowledge economy. We protect it at all costs.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
