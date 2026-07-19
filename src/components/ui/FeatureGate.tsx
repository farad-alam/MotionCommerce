"use client";

import { ReactNode } from "react";
import { useFeature } from "@/lib/hooks/use-feature";
import type { FeatureFlagMap } from "@/lib/hooks/use-feature";

interface FeatureGateProps {
  /** The feature flag key to check */
  flag: keyof FeatureFlagMap;
  /** Content to render if the feature is enabled */
  children: ReactNode;
  /** Optional fallback to render when feature is disabled */
  fallback?: ReactNode;
}

/**
 * Client component that conditionally renders children based on a feature flag.
 *
 * @example
 * <FeatureGate flag="blog">
 *   <Link href="/blog">Blog</Link>
 * </FeatureGate>
 *
 * @example
 * <FeatureGate flag="reviews" fallback={<p>Reviews are disabled</p>}>
 *   <ReviewsSection />
 * </FeatureGate>
 */
export function FeatureGate({ flag, children, fallback = null }: FeatureGateProps) {
  const enabled = useFeature(flag);
  return enabled ? <>{children}</> : <>{fallback}</>;
}
