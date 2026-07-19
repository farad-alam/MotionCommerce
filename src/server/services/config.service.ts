import { configRepository } from "../repositories/config.repository";
import { BaseService } from "./base.service";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { unstable_cache } from "next/cache";

export class ConfigService extends BaseService<any> {
  public getSiteConfig = unstable_cache(
    async () => configRepository.getSiteConfig(),
    ["site-config-query"],
    { tags: [CACHE_TAGS.SITE_CONFIG] }
  );

  public getThemeConfig = unstable_cache(
    async () => configRepository.getThemeConfig(),
    ["theme-config-query"],
    { tags: [CACHE_TAGS.THEME] }
  );

  public getFeatureFlags = unstable_cache(
    async () => configRepository.getFeatureFlags(),
    ["feature-flags-query"],
    { tags: [CACHE_TAGS.FEATURES] }
  );
  
  public getPlatformMeta = unstable_cache(
    async () => configRepository.getPlatformMeta(),
    ["platform-meta-query"],
    { tags: ["platform-meta"] }
  );

  public getNavigationConfig = unstable_cache(
    async (location: string) => configRepository.getNavigationConfig(location),
    ["navigation-config-query"],
    { tags: [CACHE_TAGS.NAVIGATION] }
  );

  public getFooterConfig = unstable_cache(
    async () => configRepository.getFooterConfig(),
    ["footer-config-query"],
    { tags: [CACHE_TAGS.FOOTER] }
  );

  public getSeoConfig = unstable_cache(
    async () => configRepository.getSeoConfig(),
    ["seo-config-query"],
    { tags: [CACHE_TAGS.SEO] }
  );

  public getStoreConfig = unstable_cache(
    async () => configRepository.getStoreConfig(),
    ["store-config-query"],
    { tags: ["store-config"] } // Internal cache tag
  );

  public getPaymentInfo = unstable_cache(
    async () => configRepository.getPaymentInfo(),
    ["payment-info-query"],
    { tags: ["payment-info"] } // Internal cache tag
  );

  public getPageLayout = unstable_cache(
    async (slug: string) => configRepository.getPageLayout(slug),
    ["page-layout-query"],
    { tags: [CACHE_TAGS.PAGES] } // Uses PAGES cache tag which makes sense
  );

  // Update methods
  public async updateNavigationConfig(location: string, data: any) {
    return configRepository.updateNavigationConfig(location, data);
  }
  public async updateFooterConfig(data: any) {
    return configRepository.updateFooterConfig(data);
  }
  public async updateSeoConfig(data: any) {
    return configRepository.updateSeoConfig(data);
  }
  public async updateStoreConfig(data: any) {
    return configRepository.updateStoreConfig(data);
  }
  public async updatePaymentInfo(data: any) {
    return configRepository.updatePaymentInfo(data);
  }
  public async updatePageLayout(slug: string, data: any) {
    return configRepository.updatePageLayout(slug, data);
  }
}

export const configService = new ConfigService();
