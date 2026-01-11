import Stripe from 'stripe';
import path from 'path';
import fs from 'fs';

// Simple fallback to read .env.local manually if STRIPE_SECRET_KEY is missing
if (!process.env.STRIPE_SECRET_KEY) {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/^STRIPE_SECRET_KEY=(.*)$/m);
        if (match) {
            process.env.STRIPE_SECRET_KEY = match[1].trim();
        }
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16' as any
});

import { TIER_MULTIPLIERS, TIER_REGIONS, getCountriesForTier, PricingTier } from '../utils/pricing-tiers';

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
            const tier = parseInt(tierStr) as PricingTier;
            if (tier === 7) continue; // Skip the base tier

            const regionName = TIER_REGIONS[tier];
            const countries = getCountriesForTier(tier).join(', ');

            // Create Monthly Price for this Tier
            const monthlyAmount = Math.floor((monthlyBase.unit_amount || 0) * multiplier);
            const monthlyLookup = `${baseLookupMonthly}_tier${tier}`;
            const monthlyNickname = `${prod.name} Monthly - ${regionName}`;

            console.log(`   🔹 Tier ${tier} (${Math.round(multiplier * 100)}%): Monthly ${monthlyAmount} cents, Lookup: ${monthlyLookup}`);

            try {
                await stripe.prices.create({
                    product: prod.id,
                    unit_amount: monthlyAmount,
                    currency: 'eur',
                    recurring: { interval: 'month' },
                    lookup_key: monthlyLookup,
                    transfer_lookup_key: true,
                    nickname: monthlyNickname,
                    metadata: {
                        tier: tier.toString(),
                        plan: 'monthly',
                        region: regionName,
                        countries: countries.substring(0, 500) // Stripe metadata value limit is 500 chars
                    }
                });
            } catch (e: any) {
                console.warn(`      ⚠️  Could not create monthly tier ${tier}: ${e.message}`);
            }

            // Create Yearly Price for this Tier
            const yearlyAmount = Math.floor((yearlyBase.unit_amount || 0) * multiplier);
            const yearlyLookup = `${baseLookupYearly}_tier${tier}`;
            const yearlyNickname = `${prod.name} Yearly - ${regionName}`;

            console.log(`   🔹 Tier ${tier} (${Math.round(multiplier * 100)}%): Yearly ${yearlyAmount} cents, Lookup: ${yearlyLookup}`);

            try {
                await stripe.prices.create({
                    product: prod.id,
                    unit_amount: yearlyAmount,
                    currency: 'eur',
                    recurring: { interval: 'year' },
                    lookup_key: yearlyLookup,
                    transfer_lookup_key: true,
                    nickname: yearlyNickname,
                    metadata: {
                        tier: tier.toString(),
                        plan: 'yearly',
                        region: regionName,
                        countries: countries.substring(0, 500)
                    }
                });
            } catch (e: any) {
                console.warn(`      ⚠️  Could not create yearly tier ${tier}: ${e.message}`);
            }
        }
    }

    console.log('\n✅ Tiered pricing setup complete!');
    console.log('🔗 View your products and prices here: https://dashboard.stripe.com/test/products');
}

setup().catch(console.error);
