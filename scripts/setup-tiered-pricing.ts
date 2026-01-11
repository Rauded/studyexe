
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16' as any
});

const TIER_MULTIPLIERS: Record<number, number> = {
    1: 1.2,  // 120%
    2: 1.0,  // 100% (Base)
    3: 0.9,  // 90%
    4: 0.8,  // 80%
    5: 0.6,  // 60%
    6: 0.4,  // 40%
    7: 0.3   // 30%
};

const PRODUCTS = [
    { id: 'prod_Tlx0IXZC7nzmQD', name: 'Standard' },
    { id: 'prod_TlxPO8GD4Dr0Vr', name: 'Pro' },
    { id: 'prod_TlxSEZtw4cVH0b', name: 'Teacher' }
];

async function setup() {
    console.log('🚀 Starting tiered pricing setup...');

    for (const prod of PRODUCTS) {
        console.log(`\n📦 Processing Product: ${prod.name} (${prod.id})`);

        // Fetch existing prices for this product to get the base prices
        const prices = await stripe.prices.list({
            product: prod.id,
            active: true
        });

        const monthlyBase = prices.data.find(p => p.recurring?.interval === 'month' && p.lookup_key && !p.lookup_key.includes('tier'));
        const yearlyBase = prices.data.find(p => p.recurring?.interval === 'year' && p.lookup_key && !p.lookup_key.includes('tier'));

        if (!monthlyBase || !yearlyBase) {
            console.error(`❌ Could not find base monthly or yearly price with lookup_key for ${prod.name}`);
            continue;
        }

        const baseLookupMonthly = monthlyBase.lookup_key as string;
        const baseLookupYearly = yearlyBase.lookup_key as string;

        for (const [tierStr, multiplier] of Object.entries(TIER_MULTIPLIERS)) {
            const tier = parseInt(tierStr);
            if (tier === 7) continue; // Skip the base tier

            // Create Monthly Price for this Tier
            const monthlyAmount = Math.floor((monthlyBase.unit_amount || 0) * multiplier);
            const monthlyLookup = `${baseLookupMonthly}_tier${tier}`;

            console.log(`   🔹 Tier ${tier} (${Math.round(multiplier * 100)}%): Monthly ${monthlyAmount} cents, Lookup: ${monthlyLookup}`);

            try {
                await stripe.prices.create({
                    product: prod.id,
                    unit_amount: monthlyAmount,
                    currency: 'eur',
                    recurring: { interval: 'month' },
                    lookup_key: monthlyLookup,
                    transfer_lookup_key: true,
                    metadata: { tier: tier.toString(), plan: 'monthly' }
                });
            } catch (e: any) {
                console.warn(`      ⚠️  Could not create monthly tier ${tier}: ${e.message}`);
            }

            // Create Yearly Price for this Tier
            const yearlyAmount = Math.round((yearlyBase.unit_amount || 0) * multiplier);
            const yearlyLookup = `${baseLookupYearly}_tier${tier}`;

            console.log(`   🔹 Tier ${tier} (${Math.round(multiplier * 100)}%): Yearly ${yearlyAmount} cents, Lookup: ${yearlyLookup}`);

            try {
                await stripe.prices.create({
                    product: prod.id,
                    unit_amount: yearlyAmount,
                    currency: 'eur',
                    recurring: { interval: 'year' },
                    lookup_key: yearlyLookup,
                    transfer_lookup_key: true,
                    metadata: { tier: tier.toString(), plan: 'yearly' }
                });
            } catch (e: any) {
                console.warn(`      ⚠️  Could not create yearly tier ${tier}: ${e.message}`);
            }
        }
    }

    console.log('\n✅ Tiered pricing setup complete!');
}

setup().catch(console.error);
