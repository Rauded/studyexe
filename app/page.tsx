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
import { redirect } from 'next/navigation';

export default async function LandingPage({
  searchParams
}: {
  searchParams: { code?: string; next?: string };
}) {
  if (searchParams.code) {
    const nextPath = searchParams.next
      ? `&next=${encodeURIComponent(searchParams.next)}`
      : '';
    return redirect(`/auth/callback?code=${searchParams.code}${nextPath}`);
  }

  const supabase = createClient();
  const cookieStore = cookies();
  const tier = parseInt(cookieStore.get('pricing-tier')?.value || '7');

  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">

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
