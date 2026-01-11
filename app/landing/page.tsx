import {
    Navbar,
    HeroSection,
    StatsSection,
    WhoNotForSection,
    FeaturesSection,
    GlobalStatsSection,
    RealityCheckSection,
    HowItWorksSection,
    TestimonialsSection,
    NoMercySection,
    PricingSection,
    FAQSection,

} from "@/components/landing-ui/Sections";
import { AsciiArtSection } from '@/components/landing-ui/AsciiArtSection';
import { createClient } from '@/utils/supabase/server';
import {
    getProducts,
    getSubscription,
    getUser
} from '@/utils/supabase/queries';

import { cookies } from 'next/headers';

export default async function LandingPage() {
    const supabase = createClient();
    const cookieStore = cookies();
    const tier = parseInt(cookieStore.get('pricing-tier')?.value || '2');

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
            {/* TruthSection removed but kept in Sections.tsx */}
            <HowItWorksSection />

            {/* Loop 3: Hook -> Warning -> Feature */}
            <TestimonialsSection />
            <NoMercySection />
            <PricingSection
                user={user}
                products={products ?? []}
                subscription={subscription}
                tier={tier}
            />
            <FAQSection />
            <AsciiArtSection />

        </main>
    );
}
