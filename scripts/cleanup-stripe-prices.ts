
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

async function cleanup() {
    console.log('🧹 Starting Stripe price cleanup...');
    console.log('⚠️  This will archive (deactivate) ALL active prices in your Stripe account.');

    let hasMore = true;
    let startingAfter: string | undefined = undefined;
    let count = 0;

    while (hasMore) {
        const prices: any = await stripe.prices.list({
            active: true,
            limit: 100,
            starting_after: startingAfter
        });

        for (const price of prices.data) {
            process.stdout.write(`   Archiving price: ${price.id} (${price.lookup_key || price.nickname || 'no name'})... `);
            try {
                await stripe.prices.update(price.id, { active: false });
                console.log('✅');
                count++;
            } catch (e: any) {
                console.log(`❌ (${e.message})`);
            }
        }

        hasMore = prices.has_more;
        if (prices.data.length > 0) {
            startingAfter = prices.data[prices.data.length - 1].id;
        }

        // Safety check to avoid infinite loops if prices aren't being archived correctly
        if (prices.data.length === 0) break;
    }

    console.log(`\n✅ Finished! Archived ${count} prices.`);
}

cleanup().catch(console.error);
