import { prisma } from "@/lib/prisma";
import { BaseRepository } from "./base.repository";

export class ConfigRepository {
  async getSiteConfig() {
    return prisma.siteConfig.findFirst();
  }

  async getThemeConfig() {
    return prisma.themeConfig.findFirst();
  }

  async getFeatureFlags() {
    return prisma.featureFlags.findFirst();
  }

  async getPlatformMeta() {
    return prisma.platformMeta.findFirst();
  }
}

export const configRepository = new ConfigRepository();
