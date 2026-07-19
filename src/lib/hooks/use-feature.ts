"use client";

import { useState, useEffect, useCallback } from "react";

// Shape of the flags JSON stored in the FeatureFlags table
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

// Cache the flags in memory so we only fetch once per page load
let _cachedFlags: FeatureFlagMap | null = null;
let _fetchPromise: Promise<FeatureFlagMap> | null = null;

async function fetchFlags(): Promise<FeatureFlagMap> {
  if (_cachedFlags) return _cachedFlags;
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = fetch("/api/config/features", { cache: "no-store" })
    .then((r) => r.json())
    .then((json) => {
      const raw = json?.data?.flags ?? json?.data ?? {};
      _cachedFlags = { ...DEFAULT_FLAGS, ...raw };
      return _cachedFlags!;
    })
    .catch(() => {
      _cachedFlags = DEFAULT_FLAGS;
      return _cachedFlags;
    });

  return _fetchPromise;
}

/**
 * React hook to check a feature flag on the client.
 *
 * @example
 * const blogEnabled = useFeature("blog");
 * if (!blogEnabled) return null;
 */
export function useFeature(flag: keyof FeatureFlagMap): boolean {
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_FLAGS[flag] as boolean ?? false);

  useEffect(() => {
    fetchFlags().then((flags) => {
      setEnabled(Boolean(flags[flag]));
    });
  }, [flag]);

  return enabled;
}

/**
 * Hook that returns all feature flags at once.
 */
export function useFeatureFlags(): { flags: FeatureFlagMap; loading: boolean } {
  const [flags, setFlags] = useState<FeatureFlagMap>(DEFAULT_FLAGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlags().then((f) => {
      setFlags(f);
      setLoading(false);
    });
  }, []);

  return { flags, loading };
}

/**
 * Invalidate the client-side flag cache (call after saving new flags).
 */
export function invalidateFlagCache() {
  _cachedFlags = null;
  _fetchPromise = null;
}
