import { configRepository } from "../repositories/config.repository";
import { BaseService } from "./base.service";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { unstable_cache } from "next/cache";

export class ConfigService extends BaseService<any> {
  public getSiteConfig = unstable_cache(
    async () => {
      return configRepository.getSiteConfig();
    },
    ["site-config-query"],
    { tags: [CACHE_TAGS.SITE_CONFIG] }
  );

  public getThemeConfig = unstable_cache(
    async () => {
      return configRepository.getThemeConfig();
    },
    ["theme-config-query"],
    { tags: [CACHE_TAGS.THEME] }
  );

  public getFeatureFlags = unstable_cache(
    async () => {
      return configRepository.getFeatureFlags();
    },
    ["feature-flags-query"],
    { tags: [CACHE_TAGS.FEATURES] }
  );
  
  public getPlatformMeta = unstable_cache(
    async () => {
      return configRepository.getPlatformMeta();
    },
    ["platform-meta-query"],
    { tags: ["platform-meta"] }
  );
}

export const configService = new ConfigService();
