import {
    Navbar,
    HeroSection,
    StatsSection,
    WhoNotForSection,
    FeaturesSection,
    GlobalStatsSection,
    RealityCheckSection,
    TruthSection,
    HowItWorksSection,
    TestimonialsSection,
    NoMercySection,
    PricingSection,
    FAQSection,
    CTASection
} from "@/components/landing-ui/Sections";
import { AsciiArtSection } from '@/components/landing-ui/AsciiArtSection';
import { createClient } from '@/utils/supabase/server';
import {
    getProducts,
    getSubscription,
    getUser
} from '@/utils/supabase/queries';

export default async function LandingPage() {
    const supabase = createClient();
    const [user, products, subscription] = await Promise.all([
        getUser(supabase),
        getProducts(supabase),
        getSubscription(supabase)
    ]);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar user={user} />
            {/* Loop 1: Hook -> Warning -> Feature */}
            <HeroSection />
            <StatsSection />
            <WhoNotForSection />
            <FeaturesSection />

            {/* Loop 2: Hook -> Warning -> Feature */}
            <GlobalStatsSection />
            <RealityCheckSection />
            <TruthSection />
            <AsciiArtSection />
            <HowItWorksSection />

            {/* Loop 3: Hook -> Warning -> Feature */}
            <TestimonialsSection />
            <NoMercySection />
            <PricingSection
                user={user}
                products={products ?? []}
                subscription={subscription}
            />

            <FAQSection />
            <CTASection />
        </main>
    );
}
