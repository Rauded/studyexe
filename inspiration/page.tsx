"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Skull,
  Zap,
  Shield,
  Lock,
  Timer,
  Download,
  Settings,
  Target,
  Trophy,
  Check,
  ChevronRight,
  Monitor,
  Ban,
  Brain,
  Clock,
} from "lucide-react";

// Navbar Component
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Skull className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">StudyEXE</span>
          </div>

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
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Download Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const rotatingWords = ["procrastination", "distractions", "excuses", "social media", "your weakness"];

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/80 border border-border rounded-full px-4 py-2 mb-8 animate-pulse-glow">
          <Zap className="w-4 h-4 text-red-500" />
          <span className="text-sm">47,291 distractions killed this week</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
          Kill your ADHD
          <br />
          <span className="text-gradient">destroying </span>
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
          <span className="text-foreground font-semibold">You will study or you will suffer.</span>{" "}
          StudyEXE locks your computer, blocks everything, and forces you to focus.
          No escape. No mercy. Average users gain{" "}
          <span className="text-red-500 font-bold">4.2 hours/day</span> of focus time.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <div className="flex items-center bg-secondary/60 rounded-xl p-2 w-full max-w-md border border-border">
            <div className="flex items-center gap-2 px-3 text-muted-foreground">
              <Monitor className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="Enter your email for download link"
              className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2"
            />
            <Button className="bg-red-600 hover:bg-red-700 gap-2">
              <Skull className="w-4 h-4" />
              Kill ADHD
            </Button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            12,847 active warriors
          </span>
          <span className="text-red-500 font-semibold">8.4M hours reclaimed</span>
          <span>Free forever tier</span>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "98%", label: "Focus Rate" },
    { value: "<2min", label: "Setup Time" },
    { value: "4.2hrs", label: "Daily Focus Gained" },
    { value: "50K+", label: "ADHD Brains Saved" },
  ];

  return (
    <section className="py-16 px-4 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      icon: Download,
      title: "Download",
      description: "Install StudyEXE on Windows, Mac, or Linux in 60 seconds",
    },
    {
      icon: Settings,
      title: "Configure",
      description: "Set your study hours, blocked apps, and punishment level",
    },
    {
      icon: Lock,
      title: "Lock In",
      description: "Start a session. There's no going back. No escape.",
    },
    {
      icon: Trophy,
      title: "Dominate",
      description: "Watch your productivity skyrocket. Become unstoppable.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How StudyEXE works</h2>
          <p className="text-muted-foreground">Download, configure, lock in, dominate life</p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary border border-border mb-4">
                  <step.icon className="w-7 h-7 text-red-500" />
                </div>
                <Badge variant="outline" className="mb-3">0{i + 1}</Badge>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Ban,
      title: "Nuclear App Blocker",
      description: "Blocks apps at the kernel level. Task manager won't save you. Nothing will.",
    },
    {
      icon: Timer,
      title: "Pomodoro on Steroids",
      description: "Customizable focus sessions with breaks. Skip a break? Get punished.",
    },
    {
      icon: Shield,
      title: "Anti-Cheat System",
      description: "Detects when you try to bypass. Adds penalty time. Resistance is futile.",
    },
    {
      icon: Brain,
      title: "ADHD Mode",
      description: "Special algorithms designed for the ADHD brain. We understand the struggle.",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set daily, weekly, monthly goals. Watch your progress or face the consequences.",
    },
    {
      icon: Clock,
      title: "Scheduled Lockdowns",
      description: "Pre-schedule study sessions. Your past self will force your future self to work.",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Weapons of Mass Focus</h2>
          <p className="text-muted-foreground">Every tool you need to annihilate distractions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Chen",
      handle: "@alexcodes",
      text: "I have severe ADHD. This app literally saved my career. Went from 2 hours of focus to 8. I'm not joking.",
    },
    {
      name: "Sarah Miller",
      handle: "@sarahstudies",
      text: "Was about to fail out of med school. StudyEXE forced me to study 6 hours daily. Graduated top 10%.",
    },
    {
      name: "Jake Thompson",
      handle: "@jakethompson",
      text: "The nuclear blocker is no joke. I literally couldn't cheat. First time I've ever finished a project early.",
    },
    {
      name: "Maria Garcia",
      handle: "@mariag",
      text: "My screen time went from 9 hours to 2. I wrote a book. AN ACTUAL BOOK. Thank you StudyEXE.",
    },
    {
      name: "David Kim",
      handle: "@davidkim",
      text: "The punishment system sounds harsh but it works. I fear this app. And that fear makes me productive.",
    },
    {
      name: "Emma Wilson",
      handle: "@emmawilson",
      text: "Finally passed the bar exam after 3 failed attempts. StudyEXE was the difference. Worth every penny.",
    },
  ];

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by survivors</h2>
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
                <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-sm font-bold">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-muted-foreground text-xs">{testimonial.handle}</div>
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
function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Start killing distractions today",
      features: [
        "3 focus sessions per day",
        "Basic app blocking",
        "Simple timer",
        "Community support",
        "StudyEXE watermark",
      ],
      cta: "Current Plan",
      popular: false,
      current: true,
    },
    {
      name: "Warrior",
      price: "$9",
      description: "For serious students and workers",
      features: [
        "Unlimited focus sessions",
        "Nuclear app blocker",
        "Custom punishment levels",
        "No watermark",
        "Priority support",
      ],
      cta: "Get Warrior",
      popular: false,
      current: false,
    },
    {
      name: "Killer",
      price: "$19",
      description: "Maximum destruction mode",
      features: [
        "Everything in Warrior",
        "ADHD mode algorithms",
        "Scheduled lockdowns",
        "Website blocker",
        "Analytics dashboard",
        "Multi-device sync",
      ],
      cta: "Get Killer",
      popular: true,
      current: false,
    },
    {
      name: "Team",
      price: "$49",
      description: "For study groups and teams",
      features: [
        "Everything in Killer",
        "Up to 10 team members",
        "Accountability partners",
        "Team challenges",
        "Admin controls",
        "Dedicated support",
      ],
      cta: "Get Team",
      popular: false,
      current: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, brutal pricing</h2>
          <p className="text-muted-foreground">Choose your weapon. Cancel anytime (if you dare).</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-card border rounded-xl p-6 ${plan.popular ? "border-red-600 glow-red" : "border-border"
                }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600">
                  Popular
                </Badge>
              )}
              {plan.current && (
                <Badge variant="outline" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Current
                </Badge>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <Button
                className={`w-full mb-6 ${plan.popular
                    ? "bg-red-600 hover:bg-red-700"
                    : plan.current
                      ? "bg-secondary"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                variant={plan.current ? "outline" : "default"}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Global Stats Section
function GlobalStatsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Warriors worldwide
              <br />
              <span className="text-gradient">trust StudyEXE</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of reformed procrastinators who use StudyEXE to destroy
              distractions, demolish ADHD, and dominate their goals.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-red-500">50K+</div>
                <div className="text-sm text-muted-foreground">Warriors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">8.4M</div>
                <div className="text-sm text-muted-foreground">Hours Reclaimed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">127+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border-4 border-red-600/30 flex items-center justify-center">
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border-2 border-red-600/50 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-red-600/10 border border-red-600 flex items-center justify-center">
                  <Skull className="w-16 h-16 text-red-500" />
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
function FAQSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground">Everything you need to know about StudyEXE</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
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
function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-red-950/50 via-card to-card border border-red-900/50 rounded-3xl p-12 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Study.</h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-gradient">Or Die Trying.</span>
            </h2>

            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 gap-2">
              <Download className="w-5 h-5" />
              Download StudyEXE Free
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Free forever tier • 50K+ warriors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Skull className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">StudyEXE</span>
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
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
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

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <GlobalStatsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
