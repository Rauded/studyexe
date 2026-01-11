"use client";

import { useState } from "react";
import { Button } from "./button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion";
import { Badge } from "./badge";
import { MaterialIcon } from "./MaterialIcon";
import {
    Check,
    ChevronRight,
    LogOut,
    Skull,
    User as UserIcon,
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import type { Tables } from "@/types_db";
import { SignOut } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import Link from "next/link";
import { ScrollAnimation } from "../ui/ScrollAnimation";

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
    prices: Price[];
}
interface PriceWithProduct extends Price {
    products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
    prices: PriceWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';


// Navbar Component
export function Navbar({ user }: { user: User | null }) {
    const router = useRouter();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl text-white tracking-[0.3em] font-thin" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 100 }}>study.exe</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                            How it works
                        </a>
                        <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                            Pricing
                        </a>
                        <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                            FAQ
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="https://pub-ab1914aff12b4b61b8a0760d08df8c48.r2.dev/StudyExe.7z" download>
                            <Button size="sm" className="bg-white hover:bg-zinc-100 text-black border-none hidden sm:flex">
                                Download
                            </Button>
                        </a>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/account">
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        Account
                                    </Button>
                                </Link>
                                <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
                                    <input type="hidden" name="pathName" value={usePathname()} />
                                    <Button type="submit" variant="ghost" size="sm" className="gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <Link href="/signin">
                                <Button variant="ghost" size="sm" className="text-white hover:text-white">Sign in</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Hero Section
export function HeroSection() {
    const rotatingWords = ["procrastination", "distractions", "excuses", "social media", "your weakness", "procrastination"];

    return (
        <section id="hero" className="pt-32 pb-20 px-4 relative overflow-hidden aurora-bg">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-40 right-1/4 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl animate-float-delayed" />

            <div className="max-w-5xl mx-auto text-center relative">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-pulse-glow">
                    <MaterialIcon name="bolt" className="text-white" size="sm" />
                    <span className="text-sm font-light tracking-wide">47,291 distractions killed this week</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6 text-white tracking-tight">
                    Kill your ADHD
                    <br />
                    <span className="text-gradient-shimmer">destroying your </span>
                    <span className="inline-block h-[1.15em] overflow-hidden align-bottom relative">
                        <span className="flex flex-col animate-text-rotate">
                            {rotatingWords.map((word, i) => (
                                <span key={i} className="highlight-box px-3 py-1 rounded-lg h-[1.15em] flex items-center">{word}</span>
                            ))}
                        </span>
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                    <span className="text-foreground font-semibold text-white">You will study or you will suffer.</span>{" "}
                    StudyEXE locks your computer, blocks everything, and forces you to focus.
                    No escape. No mercy. Average users gain{" "}
                    <span className="text-white font-bold">4.2 hours/day</span> of focus time.
                </p>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                    <div className="flex items-center glass-strong rounded-2xl p-2 w-full max-w-md">
                        <div className="flex items-center gap-2 px-3 text-muted-foreground">
                            <MaterialIcon name="computer" size="sm" />
                        </div>
                        <input
                            type="email"
                            placeholder="Enter your email for download link"
                            className="flex-1 bg-transparent border-none outline-none text-sm py-3 px-2 text-white placeholder:text-muted-foreground"
                        />
                        <a href="https://pub-ab1914aff12b4b61b8a0760d08df8c48.r2.dev/StudyExe.7z" download>
                            <Button className="bg-white hover:bg-zinc-100 text-black gap-2 btn-premium rounded-xl">
                                <MaterialIcon name="target" className="text-black" size="sm" />
                                Kill ADHD
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="font-light">12,847 active warriors</span>
                    </span>
                    <span className="text-white font-medium">8.4M hours reclaimed</span>
                </div>
            </div>
        </section>
    );
}

// Stats Section
export function StatsSection() {
    const stats = [
        { value: "98%", label: "Focus Rate" },
        { value: "<2min", label: "Setup Time" },
        { value: "4.2hrs", label: "Daily Focus Gained" },
        { value: "50K+", label: "ADHD Brains Saved" },
    ];

    return (
        <section id="stats" className="py-20 px-4 border-y border-border/50 glass">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-4xl md:text-5xl font-semibold text-white mb-2 tracking-tight group-hover:text-gradient transition-all duration-300">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground font-light">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


// Who This Is NOT For Section
export function WhoNotForSection() {
    const notForList = [
        "People with good grades",
        "Teacher's pets",
        "Those who never struggled",
        "Morning people who enjoy 5am runs",
        "People who color-code notes for fun",
        "Anyone satisfied with mediocrity"
    ];

    return (
        <section id="who-not-for" className="py-20 px-4 relative overflow-hidden">
            {/* Big Sad Face decoration */}
            <div className="absolute top-1/2 -right-20 lg:right-10 -translate-y-1/2 opacity-10 pointer-events-none select-none">
                <MaterialIcon name="sentiment_very_dissatisfied" className="text-red-500 !text-[300px]" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium tracking-wide uppercase mb-6">
                    <Skull className="w-3 h-3" />
                    Warning: Read Before Downloading
                </div>

                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white tracking-tight">
                    Who this app is <span className="text-red-500">NOT</span> for
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notForList.map((item, i) => (
                        <div key={i} className="group flex items-center gap-3 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                                <span className="text-red-500 text-sm font-bold">✕</span>
                            </div>
                            <span className="text-muted-foreground font-light text-sm text-left group-hover:text-red-200/80">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Reality Check Section
export function RealityCheckSection() {
    return (
        <section id="reality-check" className="py-24 px-4 bg-red-950/10 border-y border-red-900/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 mb-6">
                    <MaterialIcon name="timer" className="text-red-500 animate-pulse" size="lg" />
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                    Study or <span className="text-red-500 underline decoration-red-900/50 decoration-4 underline-offset-4">Die</span>
                </h2>

                <p className="text-xl text-red-100/70 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                    Your "potential" means nothing if you don't execute. Every scroll, every distraction, every "I'll do it later" is a vote for a mediocre future.
                </p>

                <div className="inline-block p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                    <p className="text-lg font-mono text-red-400">
                        "The graveyard is full of people who had potential."
                    </p>
                </div>
            </div>
        </section>
    );
}

// Truth Section
export function TruthSection() {
    return (
        <section className="py-32 px-4 bg-black overflow-hidden select-none">
            <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-24 relative z-10">
                <ScrollAnimation animation="fade-in-up" delay={100}>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 tracking-tighter text-left">
                        Speak truth to <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>your power</span>
                    </h2>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-in-up" delay={300}>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter text-right">
                        Lock in <br />
                        <span className="text-emerald-500">your focus</span>
                    </h2>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-in-up" delay={500}>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white/90 tracking-tighter text-center">
                        Be honest with <br />
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">your focus</span>
                    </h2>
                </ScrollAnimation>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />
        </section>
    );
}

// No Mercy Section
export function NoMercySection() {
    return (
        <section id="no-mercy" className="py-24 px-4 bg-zinc-950 border-y border-red-900/20 relative">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="flex flex-col gap-6">
                            {[
                                { title: "Kernel-Level Blocking", desc: "We dig deep into the OS. You can't just 'close' the app." },
                                { title: "No Alt-Tab", desc: "We block access to alt-tabbing. You are locked in." },
                                { title: "Restart Protection", desc: "Restart your computer? We launch immediately on startup." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                                    <MaterialIcon name="lock" className="text-red-500 mt-1" />
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                                        <p className="text-red-200/50 text-sm font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 md:order-2 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium tracking-wide uppercase mb-6">
                            <MaterialIcon name="shield" size="sm" />
                            Strict Policy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                            No Escape. <br />
                            <span className="text-red-600">No Mercy.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            We don't care about your excuses. We care about your future. That's why we built a digital prison you can't escape from physically.
                        </p>
                        <a href="https://pub-ab1914aff12b4b61b8a0760d08df8c48.r2.dev/StudyExe.7z" download>
                            <Button className="bg-red-600 hover:bg-red-700 text-white border-none rounded-xl h-12 px-8">
                                I Accept The Challenge
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// How It Works Section
export function HowItWorksSection() {
    const steps = [
        {
            icon: "download",
            title: "Download",
            description: "Install StudyEXE on Windows, Mac, or Linux in 60 seconds",
        },
        {
            icon: "settings",
            title: "Configure",
            description: "Set your study hours, blocked apps, and punishment level",
        },
        {
            icon: "lock",
            title: "Lock In",
            description: "Start a session. There's no going back. No escape.",
        },
        {
            icon: "emoji_events",
            title: "Dominate",
            description: "Watch your productivity skyrocket. Become unstoppable.",
        },
    ];

    return (
        <section id="how-it-works" className="py-28 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white tracking-tight">How StudyEXE works</h2>
                    <p className="text-muted-foreground font-light">Download, configure, lock in, dominate life</p>
                </div>

                {/* Steps with connecting line */}
                <div className="relative">
                    {/* Connection line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center relative group">
                                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl glass group-hover:glow-subtle transition-all duration-300 mb-4">
                                    <MaterialIcon name={step.icon} className="text-white icon-float" size="lg" />
                                </div>
                                <div className="mb-3">
                                    <Badge variant="outline" className="font-light">0{i + 1}</Badge>
                                </div>
                                <h3 className="text-xl font-medium mb-2 text-white">{step.title}</h3>
                                <p className="text-muted-foreground text-sm font-light leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Features Section
export function FeaturesSection() {
    const features = [
        {
            icon: "block",
            title: "Nuclear App Blocker",
            description: "Blocks apps at the kernel level. Task manager won't save you. Nothing will.",
        },
        {
            icon: "psychology",
            title: "Eye-Tracking Focus",
            description: "Tracks your eyes to make sure you are locked in. Alerts you when you lose focus.",
        },
        {
            icon: "timer",
            title: "Pomodoro on Steroids",
            description: "Customizable focus sessions with breaks. Skip a break? Get punished.",
        },
        {
            icon: "schedule",
            title: "Scheduled Lockdowns",
            description: "Pre-schedule study sessions. Your past self will force your future self to work.",
        },
        {
            icon: "target",
            title: "Goal Tracking",
            description: "Set daily, weekly, monthly goals. Watch your progress or face the consequences.",
        },
        {
            icon: "shield",
            title: "Anti-Cheat System",
            description: "Detects when you try to bypass. Adds penalty time. Resistance is futile.",
        },
    ];

    return (
        <section id="features" className="py-28 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            <div className="max-w-6xl mx-auto relative">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white tracking-tight">Weapons of Mass Focus</h2>
                    <p className="text-muted-foreground font-light">Every tool you need to annihilate distractions</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="card-premium card-spotlight p-6"
                        >
                            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 icon-float">
                                <MaterialIcon name={feature.icon} className="text-white" />
                            </div>
                            <h3 className="text-lg font-medium mb-2 text-white">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm font-light leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Testimonials Section
export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Alex Chen",
            text: "I have severe ADHD. This app literally saved my career. Went from 2 hours of focus to 8. I'm not joking.",
        },
        {
            name: "Sarah Miller",
            text: "Was about to fail out of med school. StudyEXE forced me to study 6 hours daily. Graduated top 10%.",
        },
        {
            name: "Jake Thompson",
            text: "The nuclear blocker is no joke. I literally couldn't cheat. First time I've ever finished a project early.",
        },
        {
            name: "Maria Garcia",
            text: "My screen time went from 9 hours to 2. I wrote a book. AN ACTUAL BOOK. Thank you StudyEXE.",
        },
        {
            name: "David Kim",
            text: "The punishment system sounds harsh but it works. I fear this app. And that fear makes me productive.",
        },
        {
            name: "Emma Wilson",
            text: "Finally passed the bar exam after 3 failed attempts. StudyEXE was the difference. Worth every penny.",
        },
    ];

    return (
        <section id="testimonials" className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Loved by survivors</h2>
                    <p className="text-muted-foreground">See what reformed procrastinators are saying</p>
                </div>
            </div>

            {/* Marquee */}
            <div className="relative">
                <div className="flex gap-4 animate-marquee">
                    {[...testimonials, ...testimonials].map((testimonial, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-white">
                                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm text-white">{testimonial.name}</div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Pricing Section
export function PricingSection({
    user,
    products,
    subscription,
    tier = 7
}: {
    user: User | null;
    products: ProductWithPrices[];
    subscription: SubscriptionWithProduct | null;
    tier?: number;
}) {
    const intervals = Array.from(
        new Set(
            products.flatMap((product) =>
                product?.prices?.map((price) => price?.interval)
            )
        )
    );
    const router = useRouter();
    const currentPath = usePathname();
    const [billingInterval, setBillingInterval] = useState<BillingInterval>('year');
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const handleStripeCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return router.push('/signin/signup');
        }

        const { errorRedirect, sessionId } = await checkoutWithStripe(
            price,
            currentPath
        );

        if (errorRedirect) {
            setPriceIdLoading(undefined);
            return router.push(errorRedirect);
        }

        if (!sessionId) {
            setPriceIdLoading(undefined);
            return router.push(
                getErrorRedirect(
                    currentPath,
                    'An unknown error occurred.',
                    'Please try again later or contact a system administrator.'
                )
            );
        }

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });

        setPriceIdLoading(undefined);
    };

    if (!products.length) {
        return (
            <section id="pricing" className="py-24 px-4 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">No pricing plans found.</h2>
                <p className="text-muted-foreground">Please configure your products in Stripe.</p>
            </section>
        );
    }

    return (
        <section id="pricing" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Simple, brutal pricing</h2>
                    <p className="text-muted-foreground mb-8">Choose your weapon. Cancel anytime (if you dare).</p>
                    {tier !== 7 && (
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                            Localized Pricing Active (Tier {tier})
                        </div>
                    )}

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center p-1 bg-secondary rounded-xl border border-border mb-8">
                        {intervals.includes('month') && (
                            <button
                                onClick={() => setBillingInterval('month')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${billingInterval === 'month'
                                    ? "bg-white text-black shadow-lg shadow-white/10"
                                    : "text-muted-foreground hover:text-white"
                                    }`}
                            >
                                Monthly
                            </button>
                        )}
                        {intervals.includes('year') && (
                            <button
                                onClick={() => setBillingInterval('year')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${billingInterval === 'year'
                                    ? "bg-white text-black shadow-lg shadow-white/10"
                                    : "text-muted-foreground hover:text-white"
                                    }`}
                            >
                                Yearly
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, i) => {
                        // Find price that matches interval AND tier lookup key
                        const price = product?.prices?.find(p => {
                            const priceAny = p as any;
                            const isInterval = p.interval === billingInterval;
                            const tierSuffix = tier === 7 ? '' : `_tier${tier}`;

                            // Check if lookup_key matches the pattern [base]_tier[n]
                            // If p.lookup_key is null, we might have to fallback to default logic
                            if (!priceAny.lookup_key) return isInterval && tier === 7;

                            // If tier is 7, we want prices without _tier suffix
                            if (tier === 7) return isInterval && !priceAny.lookup_key.includes('_tier');

                            // If tier is not 7, we want exact matches for the suffix
                            return isInterval && priceAny.lookup_key.endsWith(tierSuffix);
                        });

                        if (!price) return null;

                        const tierSuffix = tier === 7 ? '' : `_tier${tier}`;
                        const monthlyPrice = product?.prices?.find(p => {
                            const priceAny = p as any;
                            return p.interval === 'month' && (tier === 7 ? !priceAny.lookup_key?.includes('_tier') : priceAny.lookup_key?.endsWith(tierSuffix));
                        })?.unit_amount || 0;

                        const yearlyPrice = product?.prices?.find(p => {
                            const priceAny = p as any;
                            return p.interval === 'year' && (tier === 7 ? !priceAny.lookup_key?.includes('_tier') : priceAny.lookup_key?.endsWith(tierSuffix));
                        })?.unit_amount || 0;

                        const monthsFree = monthlyPrice > 0 ? Math.round(12 - (yearlyPrice / monthlyPrice)) : 0;

                        const unitAmount = price?.unit_amount || 0;
                        const displayPrice = billingInterval === 'year' ? unitAmount / 12 : unitAmount;
                        const priceString = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: price.currency!,
                            minimumFractionDigits: 0
                        }).format(displayPrice / 100);

                        const isPopular = product.name?.toLowerCase().includes('pro');
                        const isCurrent = subscription ? product.id === subscription?.prices?.products?.id : false;

                        return (
                            <div
                                key={product.id}
                                className={`relative bg-card border rounded-xl p-6 ${isPopular ? "border-white/30 glow-white" : "border-border"}`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-white text-black">Popular</Badge>
                                    </div>
                                )}
                                {isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge variant="outline">Current</Badge>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">{priceString}</span>
                                            <span className="text-muted-foreground text-sm">/month</span>
                                            {billingInterval === 'year' && (
                                                <div className="flex gap-2 ml-2">
                                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                        Best Value
                                                    </Badge>
                                                    {monthsFree > 0 && (
                                                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                            {monthsFree} months free
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                                </div>

                                <Button
                                    loading={priceIdLoading === price.id}
                                    onClick={() => handleStripeCheckout(price)}
                                    className={`w-full mb-6 ${isPopular
                                        ? "bg-white hover:bg-zinc-100 text-black"
                                        : isCurrent
                                            ? "bg-secondary"
                                            : "bg-secondary hover:bg-secondary/80"
                                        }`}
                                    variant={isCurrent ? "outline" : "default"}
                                >
                                    {subscription ? 'Manage' : 'Subscribe'}
                                </Button>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">
                                            {product.name === 'Starter' ? 'Basic focus enforcement' : 'Nuclear-level app blocking'}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">
                                            {product.name === 'Starter' ? '1 device support' : 'Sync across all devices'}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">
                                            {product.name === 'Elite' ? 'Priority human support' : 'ADHD mode algorithms'}
                                        </span>
                                    </li>
                                    {isPopular && (
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground font-medium text-white">Full eye-tracking analytics</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}

export function GlobalStatsSection() {
    return (
        <section id="global-stats" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                Warriors worldwide
                                <br />
                                <span className="text-gradient">trust StudyEXE</span>
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Join thousands of reformed procrastinators who use StudyEXE to destroy
                                distractions, demolish ADHD, and dominate their goals.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-white">50K+</div>
                                <div className="text-sm text-muted-foreground">Warriors</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">8.4M</div>
                                <div className="text-sm text-muted-foreground">Hours Reclaimed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">127+</div>
                                <div className="text-sm text-muted-foreground">Countries</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border-4 border-white/20 flex items-center justify-center">
                            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border-2 border-white/30 flex items-center justify-center">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/5 border border-white/40 flex items-center justify-center">
                                    <Skull className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// FAQ Section
export function FAQSection() {
    const faqs = [
        {
            question: "Can I really not escape during a session?",
            answer: "Correct. StudyEXE uses kernel-level blocking. Task manager, restarting, nothing will save you. You set the timer, you live with it. That's the point.",
        },
        {
            question: "What if there's an emergency?",
            answer: "You can set an emergency password that adds 30 minutes penalty time to use. True emergencies won't mind the penalty. Your 'need' to check Instagram will.",
        },
        {
            question: "Does it actually help with ADHD?",
            answer: "Yes. Our ADHD mode was designed with input from neuroscientists and ADHD specialists. It uses variable reward systems and hyperfocus triggers specifically for the ADHD brain.",
        },
        {
            question: "What platforms do you support?",
            answer: "Windows 10/11, macOS 12+, and most Linux distributions. Mobile blocking requires our companion app.",
        },
        {
            question: "Can I get a refund?",
            answer: "Yes, 30-day money-back guarantee. But honestly? Most people see results in the first session and never look back.",
        },
        {
            question: "Is this legal?",
            answer: "You're installing it on your own computer and consenting to block yourself. That's called discipline. Yes, it's legal.",
        },
        {
            question: "What's the 'punishment' system?",
            answer: "If you try to bypass or quit early, penalty time is added to your session. Try to cheat 3 times? Your session doubles. We're serious about your success.",
        },
    ];

    return (
        <section id="faq" className="py-24 px-4 bg-secondary/30">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Frequently asked questions</h2>
                    <p className="text-muted-foreground">Everything you need to know about StudyEXE</p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="bg-card border border-border rounded-xl px-6"
                        >
                            <AccordionTrigger className="text-left hover:no-underline py-4 text-white">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

// CTA Section
export function CTASection() {
    return (
        <section id="cta" className="py-24 px-4">
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

                            <a href="https://pub-ab1914aff12b4b61b8a0760d08df8c48.r2.dev/StudyExe.7z" download>
                                <Button size="lg" className="bg-white hover:bg-zinc-100 text-black text-lg px-8 gap-2">
                                    <MaterialIcon name="download" className="text-black" />
                                    Download StudyEXE
                                </Button>
                            </a>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}

// Footer
export function LandingFooter() {
    return (
        <footer id="footer" className="border-t border-border py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <MaterialIcon name="grid_view" className="text-black" size="sm" />
                        </div>
                        <span className="font-medium text-lg text-white tracking-tight">StudyEXE</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Roadmap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                            <li><a href="mailto:apply@studyexe.com" className="hover:text-foreground transition-colors">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                            <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    © 2026 StudyEXE. All rights reserved. Study or die.
                </div>
            </div>
        </footer>
    );
}
