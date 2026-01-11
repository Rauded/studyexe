
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

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY is missing');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' as any
});

async function deleteInactivePrices() {
    console.log('🗑️ Starting deletion of inactive Stripe prices...');

    let hasMore = true;
    let startingAfter: string | undefined = undefined;
    let count = 0;
    let errorCount = 0;

    while (hasMore) {
        const prices: any = await stripe.prices.list({
            active: false,
            limit: 100,
            starting_after: startingAfter
        });

        for (const price of prices.data) {
            process.stdout.write(`   Deleting price: ${price.id} (${price.lookup_key || price.nickname || 'no name'})... `);
            try {
                // @ts-ignore - Stripe Node library might have restricted 'del' on prices depending on version,
                // but we will attempt it as requested since user says they were not used.
                if (typeof stripe.prices.del === 'function') {
                    await stripe.prices.del(price.id);
                    console.log('✅');
                    count++;
                } else {
                    console.log('❌ (stripe.prices.del is not a function)');
                    return;
                }
            } catch (e: any) {
                console.log(`❌ (${e.message})`);
                errorCount++;
            }
        }

        hasMore = prices.has_more;
        if (prices.data.length > 0) {
            startingAfter = prices.data[prices.data.length - 1].id;
        }

        if (prices.data.length === 0) break;
    }

    console.log(`\n✅ Finished! Deleted ${count} prices. Failed to delete ${errorCount} prices (usually because they were used).`);
}

deleteInactivePrices().catch(console.error);
