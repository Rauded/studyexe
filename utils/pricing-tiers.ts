export type PricingTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 *
 * BASELINE  month   | 6.99     | 9.99  | 14.99   |
 *        annua      | 69.99    | 99.99 | 149.99  |
 *
 *
 * Monthly Pricing (€):
 * | Tier | Adjust % | Standard | Pro   | Premium |
 * | ---- | -------- | -------- | ----- | ------- |
 * | 1    | -60%     | 2.79     | 3.99  | 5.99    |
 * | 2    | -50%     | 3.49     | 4.99  | 7.49    |
 * | 3    | -40%     | 4.19     | 5.99  | 8.99    |
 * | 4    | -30%     | 4.89     | 6.99  | 10.49   |
 * | 5    | -20%     | 5.59     | 7.99  | 11.99   |
 * | 6    | -10%     | 6.29     | 8.99  | 13.49   |
 * | 7    | 0%       | 6.99     | 9.99  | 14.99   |
 * | 8    | +10%     | 7.69     | 10.99 | 16.49   |
 * | 9    | +20%     | 8.39     | 11.99 | 17.99   |
 * | 10   | +30%     | 9.09     | 12.99 | 19.49   |
 * | 11   | +40%     | 9.79     | 13.99 | 20.99   |
 *
 * BASELINE          | 69.99    | 99.99  | 149.99  |
 *
 * Annual Pricing (€):
 * | Tier | Adjust % | Standard | Pro    | Premium |
 * | ---- | -------- | -------- | ------ | ------- |
 * | 1    | -60%     | 27.99    | 39.99  | 59.99   |
 * | 2    | -50%     | 34.99    | 49.99  | 74.99   |
 * | 3    | -40%     | 41.99    | 56.99  | 85.99   |
 * | 4    | -30%     | 48.99    | 69.99  | 104.99  |
 * | 5    | -20%     | 55.99    | 79.99  | 119.99  |
 * | 6    | -10%     | 62.99    | 89.99  | 134.99  |
 * | 7    | 0%       | 69.99    | 99.99  | 149.99  |
 * | 8    | +10%     | 76.99    | 109.99 | 164.99  |
 * | 9    | +20%     | 83.99    | 119.99 | 179.99  |
 * | 10   | +30%     | 90.99    | 129.99 | 194.99  |
 * | 11   | +40%     | 97.99    | 139.99 | 209.99  |
 */
export const TIER_MULTIPLIERS: Record<PricingTier, number> = {
    1: 0.4,  // -60%
    2: 0.5,  // -50%
    3: 0.6,  // -40%
    4: 0.7,  // -30%
    5: 0.8,  // -20%
    6: 0.9,  // -10%
    7: 1.0,  // 0% (Base)
    8: 1.1,  // +10%
    9: 1.2,  // +20%
    10: 1.3, // +30%
    11: 1.4  // +40%
};

// Adjusted mapping based on the new 11-tier scale (Tier 7 = Base/High Income)
export const COUNTRY_TIER_MAP: Record<string, PricingTier> = {
    // Highest income regions moved to Tiers 8-11
    'CH': 9, 'SG': 9, 'NO': 9, 'IS': 9, 'LU': 9, 'LI': 9, 'QA': 9,

    // Base Tier 7: High Income (100% - Base)
    'US': 7, 'CA': 7, 'DE': 7, 'GB': 7, 'FR': 7, 'JP': 7, 'AU': 7, 'NZ': 7, 'IE': 7, 'AT': 7, 'BE': 7,
    'NL': 7, 'SE': 7, 'DK': 7, 'FI': 7, 'IT': 7, 'ES': 7, 'KR': 7, 'IL': 7, 'HK': 7, 'AE': 7,

    // Tier 6: Upper Middle (High) (-10%)
    'PL': 6, 'CZ': 6, 'SK': 6, 'HU': 6, 'GR': 6, 'PT': 6, 'EE': 6, 'LT': 6, 'LV': 6, 'HR': 6, 'SI': 6,
    'CY': 6, 'MT': 6, 'SA': 6, 'KW': 6, 'CL': 6, 'UY': 6, 'RO': 6,

    // Tier 5: Upper Middle (Lower) (-20%)
    'BR': 5, 'MX': 5, 'TR': 5, 'TH': 5, 'MY': 5, 'BG': 5, 'KZ': 5, 'CN': 5, 'ME': 5, 'RS': 5, 'MK': 5,
    'AL': 5, 'AZ': 5, 'AR': 5, 'CO': 5, 'PE': 5, 'ZA': 5,

    // Tier 3: Lower Middle (High) (-40%)
    'ID': 3, 'PH': 3, 'VN': 3, 'UA': 3, 'GE': 3, 'MA': 3, 'EG': 3, 'DZ': 3, 'JO': 3, 'LB': 3, 'IQ': 3,
    'PY': 3, 'EC': 3, 'BO': 3, 'IN': 3,

    // Tier 1: Lower Middle & Low Income ( -60%)
    'PK': 1, 'BD': 1, 'NG': 1, 'KE': 1, 'GH': 1, 'ET': 1, 'TZ': 1, 'UG': 1, 'NP': 1, 'MM': 1, 'KH': 1,
    'LA': 1, 'UZ': 1, 'TJ': 1, 'KG': 1, 'AF': 1, 'YE': 1, 'SY': 1, 'SD': 1, 'SS': 1, 'CD': 1, 'NE': 1,
    'ML': 1, 'BF': 1, 'HT': 1, 'MG': 1,
};

export const getTierForCountry = (countryCode?: string | null): PricingTier => {
    if (!countryCode) return 7; // Default to Tier 7
    return COUNTRY_TIER_MAP[countryCode.toUpperCase()] || 7;
};
