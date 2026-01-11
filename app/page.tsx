import Pricing from '@/components/ui/Pricing/Pricing';
import Footer from '@/components/ui/Footer';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';

import { cookies } from 'next/headers';

export default async function PricingPage() {
  const supabase = createClient();
  const cookieStore = cookies();
  const tier = parseInt(cookieStore.get('pricing-tier')?.value || '2');

  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <>
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
        tier={tier}
      />
      <Footer />
    </>
  );
}
