"use client";

import { Button } from "./button";
import { MaterialIcon } from "./MaterialIcon";
import { ScrollAnimation } from "../ui/ScrollAnimation";

// CTA Section
export function CTASection() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <ScrollAnimation animation="scale-in">
                    <div className="relative bg-gradient-to-br from-zinc-800/50 via-card to-card border border-zinc-700/50 rounded-3xl p-12 text-center overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">Study.</h2>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">
                                <span className="text-gradient">Or Die Trying.</span>
                            </h2>

                            <Button size="lg" className="bg-white hover:bg-zinc-100 text-black text-lg px-8 gap-2">
                                <MaterialIcon name="download" className="text-black" />
                                Download StudyEXE
                            </Button>

                            <p className="text-sm text-muted-foreground mt-4">
                                50K+ warriors
                            </p>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
