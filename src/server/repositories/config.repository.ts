import { prisma } from "@/lib/prisma";

export class ConfigRepository {
  async getSiteConfig() { return prisma.siteConfig.findFirst(); }
  async getThemeConfig() { return prisma.themeConfig.findFirst(); }
  async getFeatureFlags() { return prisma.featureFlags.findFirst(); }
  async getPlatformMeta() { return prisma.platformMeta.findFirst(); }
  
  async getNavigationConfig(location: string) { 
    return prisma.navigationConfig.findUnique({ where: { location } }); 
  }
  
  async getFooterConfig() { return prisma.footerConfig.findFirst(); }
  async getSeoConfig() { return prisma.seoConfig.findFirst(); }
  async getStoreConfig() { return prisma.storeConfig.findFirst(); }
  async getPaymentInfo() { return prisma.paymentInfo.findFirst(); }
  
  async getPageLayout(slug: string) { 
    return prisma.pageLayout.findUnique({ where: { slug } }); 
  }

  // Update methods
  async updateNavigationConfig(location: string, data: any) {
    return prisma.navigationConfig.upsert({
      where: { location },
      update: data,
      create: { location, ...data }
    });
  }

  async updateFooterConfig(data: any) {
    const existing = await this.getFooterConfig();
    if (existing) return prisma.footerConfig.update({ where: { id: existing.id }, data });
    return prisma.footerConfig.create({ data });
  }

  async updateSeoConfig(data: any) {
    const existing = await this.getSeoConfig();
    if (existing) return prisma.seoConfig.update({ where: { id: existing.id }, data });
    return prisma.seoConfig.create({ data });
  }

  async updateStoreConfig(data: any) {
    const existing = await this.getStoreConfig();
    if (existing) return prisma.storeConfig.update({ where: { id: existing.id }, data });
    return prisma.storeConfig.create({ data });
  }

  async updatePaymentInfo(data: any) {
    const existing = await this.getPaymentInfo();
    if (existing) return prisma.paymentInfo.update({ where: { id: existing.id }, data });
    return prisma.paymentInfo.create({ data });
  }

  async updatePageLayout(slug: string, data: any) {
    return prisma.pageLayout.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data }
    });
  }
}

export const configRepository = new ConfigRepository();
