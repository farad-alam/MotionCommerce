import { configService } from "@/server/services/config.service";

export interface FeatureFlagMap {
  blog: boolean;
  reviews: boolean;
  coupons: boolean;
  wishlist: boolean;
  whatsapp: boolean;
  whatsappNumber?: string;
  whatsappMessageTemplate?: string;
  compareProducts?: boolean;
  sizeGuide?: boolean;
  stockAlerts?: boolean;
  guestCheckout?: boolean;
  multiCurrency?: boolean;
  loyaltyPoints?: boolean;
}

const DEFAULT_FLAGS: FeatureFlagMap = {
  blog: true,
  reviews: true,
  coupons: true,
  wishlist: true,
  whatsapp: false,
  compareProducts: false,
  sizeGuide: false,
  stockAlerts: true,
  guestCheckout: true,
  multiCurrency: false,
  loyaltyPoints: false,
};

/**
 * Server-side utility — get all feature flags as a typed object.
 * Safe to call from Server Components, API routes, and Server Actions.
 *
 * @example
 * const flags = await getFeatureFlags();
 * if (!flags.blog) notFound();
 */
export async function getFeatureFlags(): Promise<FeatureFlagMap> {
  try {
    const record = await configService.getFeatureFlags();
    if (!record?.flags) return DEFAULT_FLAGS;
    return { ...DEFAULT_FLAGS, ...(record.flags as Record<string, any>) };
  } catch {
    return DEFAULT_FLAGS;
  }
}

/**
 * Server-side utility — check a single feature flag by key.
 * Returns `true` if the flag is enabled, `false` if disabled or not found.
 *
 * @example
 * const blogEnabled = await getFeature("blog");
 */
export async function getFeature(flag: keyof FeatureFlagMap): Promise<boolean> {
  const flags = await getFeatureFlags();
  return Boolean(flags[flag]);
}
