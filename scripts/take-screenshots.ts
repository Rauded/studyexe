import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs-extra';
import sharp from 'sharp';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

const SECTIONS = [
    'hero',
    'stats',
    'who-not-for',
    'features',
    'global-stats',
    'reality-check',
    'how-it-works',
    'testimonials',
    'no-mercy',
    'pricing',
    'faq',
    'ascii-art',
    'footer'
];

const SUBPAGES = [
    { name: 'landing', path: '/' },
    { name: 'account', path: '/account' },
    { name: 'signin', path: '/signin' },
    { name: 'logo-generator', path: '/logo-generator' }
];

async function takeScreenshots() {
    console.log('🚀 Starting screenshot process...');

    // Ensure directory exists
    await fs.ensureDir(SCREENSHOT_DIR);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T');
    const dateStr = timestamp[0];
    const timeStr = timestamp[1].split('Z')[0];
    const suffix = `${dateStr}_${timeStr}`;

    const capturedFiles: string[] = [];

    // 1. Capture individual sections on the landing page
    console.log('📸 Capturing landing page sections...');
    await page.goto(BASE_URL);
    // Wait for animations to settle
    await page.waitForTimeout(2000);

    for (const sectionId of SECTIONS) {
        const selector = `#${sectionId}`;
        const element = await page.$(selector);
        if (element) {
            const fileName = `${sectionId}_${suffix}.png`;
            const filePath = path.join(SCREENSHOT_DIR, fileName);
            await element.screenshot({ path: filePath });
            capturedFiles.push(filePath);
            console.log(`✅ Captured section: ${sectionId}`);
        } else {
            console.warn(`⚠️ Section not found: ${sectionId}`);
        }
    }

    // 2. Capture individual subpages
    console.log('📸 Capturing subpages...');
    for (const subpage of SUBPAGES) {
        if (subpage.name === 'landing') continue; // Already captured sections

        await page.goto(`${BASE_URL}${subpage.path}`);
        await page.waitForTimeout(1000); // Wait for load

        const fileName = `${subpage.name}_${suffix}.png`;
        const filePath = path.join(SCREENSHOT_DIR, fileName);
        await page.screenshot({ path: filePath, fullPage: true });
        capturedFiles.push(filePath);
        console.log(`✅ Captured page: ${subpage.name}`);
    }

    await browser.close();

    // 3. Combine screenshots into one image
    if (capturedFiles.length > 0) {
        console.log('拼接 Combining screenshots into one image...');
        const combinedFileName = `combined_${suffix}.png`;
        const combinedPath = path.join(SCREENSHOT_DIR, combinedFileName);

        try {
            const metadata = await Promise.all(capturedFiles.map(f => sharp(f).metadata()));
            const totalHeight = metadata.reduce((acc, m) => acc + (m.height || 0), 0);
            const maxWidth = Math.max(...metadata.map(m => m.width || 0));

            let currentY = 0;
            const compositeLayers = capturedFiles.map((file, index) => {
                const layer = {
                    input: file,
                    top: currentY,
                    left: 0
                };
                currentY += metadata[index].height || 0;
                return layer;
            });

            await sharp({
                create: {
                    width: maxWidth,
                    height: totalHeight,
                    channels: 4,
                    background: { r: 0, g: 0, b: 0, alpha: 1 }
                }
            })
                .composite(compositeLayers)
                .toFile(combinedPath);

            console.log(`🎉 Success! Combined image saved to: ${combinedPath}`);
        } catch (error) {
            console.error('❌ Error combining images:', error);
        }
    }

    console.log('✨ All done!');
}

takeScreenshots().catch(console.error);
