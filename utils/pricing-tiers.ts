export type PricingTier = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const TIER_MULTIPLIERS: Record<PricingTier, number> = {
    1: 1.2,  // 120%
    2: 1.0,  // 100%
    3: 0.9,  // 90%
    4: 0.8,  // 80%
    5: 0.6,  // 60%
    6: 0.4,  // 40%
    7: 0.3   // 30%
};

// Simplified mapping based on World Bank GNI per capita / common SaaS regional pricing
export const COUNTRY_TIER_MAP: Record<string, PricingTier> = {
    // Tier 1: Highest Income (120%)
    'CH': 1, 'LI': 1, 'NO': 1, 'IS': 1, 'LU': 1, 'SG': 1, 'QA': 1,

    // Tier 2: High Income (100% - Base)
    'US': 2, 'CA': 2, 'DE': 2, 'GB': 2, 'FR': 2, 'JP': 2, 'AU': 2, 'NZ': 2, 'IE': 2, 'AT': 2, 'BE': 2,
    'NL': 2, 'SE': 2, 'DK': 2, 'FI': 2, 'IT': 2, 'ES': 2, 'KR': 2, 'IL': 2, 'HK': 2, 'AE': 2,

    // Tier 3: Upper Middle (High) (90%)
    'PL': 3, 'CZ': 3, 'SK': 3, 'HU': 3, 'GR': 3, 'PT': 3, 'EE': 3, 'LT': 3, 'LV': 3, 'HR': 3, 'SI': 3,
    'CY': 3, 'MT': 3, 'SA': 3, 'KW': 3, 'CL': 3, 'UY': 3, 'RO': 3,

    // Tier 4: Upper Middle (Lower) (80%)
    'BR': 4, 'MX': 4, 'TR': 4, 'TH': 4, 'MY': 4, 'BG': 4, 'KZ': 4, 'CN': 4, 'ME': 4, 'RS': 4, 'MK': 4,
    'AL': 4, 'AZ': 4, 'AR': 4, 'CO': 4, 'PE': 4, 'ZA': 4,

    // Tier 5: Lower Middle (High) (60%)
    'ID': 5, 'PH': 5, 'VN': 5, 'UA': 5, 'GE': 5, 'MA': 5, 'EG': 5, 'DZ': 5, 'JO': 5, 'LB': 5, 'IQ': 5,
    'PY': 5, 'EC': 5, 'BO': 5, 'IN': 5,

    // Tier 6: Lower Middle (Lower) (40%)
    'PK': 6, 'BD': 6, 'NG': 6, 'KE': 6, 'GH': 6, 'ET': 6, 'TZ': 6, 'UG': 6, 'NP': 6, 'MM': 6, 'KH': 6,
    'LA': 6, 'UZ': 6, 'TJ': 6, 'KG': 6,

    // Tier 7: Low Income (30%)
    'AF': 7, 'YE': 7, 'SY': 7, 'SD': 7, 'SS': 7, 'CD': 7, 'NE': 7, 'ML': 7, 'BF': 7, 'HT': 7, 'MG': 7,
};

export const getTierForCountry = (countryCode?: string | null): PricingTier => {
    if (!countryCode) return 2; // Default to Tier 2
    return COUNTRY_TIER_MAP[countryCode.toUpperCase()] || 2;
};
