import {
    Navbar,
    HeroSection,
    StatsSection,
    HowItWorksSection,
    FeaturesSection,
    TestimonialsSection,
    PricingSection,
    GlobalStatsSection,
    FAQSection,
    CTASection
} from "@/components/landing-ui/Sections";
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
            <HeroSection />
            <StatsSection />
            <HowItWorksSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection
                user={user}
                products={products ?? []}
                subscription={subscription}
            />
            <GlobalStatsSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}
