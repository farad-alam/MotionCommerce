import { NextRequest } from "next/server";
import { BaseController } from "./base.controller";
import { validateRequest } from "../middleware/validation";
import { requireRole, Role } from "../middleware/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

const updateSiteConfigSchema = z.object({
  storeName: z.string().min(1).optional(),
  description: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  currency: z.string().optional(),
  taxRate: z.number().min(0).max(100).optional(),
  socialLinks: z.any().optional(),
  orderPrefix: z.string().optional(),
});

const updateThemeConfigSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontFamily: z.string().optional(),
  borderRadius: z.string().optional(),
  logoUrl: z.string().optional(),
  darkLogoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  buttonStyle: z.string().optional(),
});

const updateFeatureFlagsSchema = z.object({
  guestCheckout: z.boolean().optional(),
  whatsappOrders: z.boolean().optional(),
  blog: z.boolean().optional(),
  wishlist: z.boolean().optional(),
  reviews: z.boolean().optional(),
  coupons: z.boolean().optional(),
  inventoryTracking: z.boolean().optional(),
  multiCurrency: z.boolean().optional(),
});

export class ConfigController extends BaseController {
  
  async updateSiteConfig(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateSiteConfigSchema, await req.json());
      
      const config = await prisma.siteConfig.upsert({
        where: { id: "default-site-config" },
        update: data,
        create: { id: "default-site-config", storeName: "MotionCommerce", ...data },
      });
      
      revalidateTag(CACHE_TAGS.SITE_CONFIG);
      return this.success(config);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateThemeConfig(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateThemeConfigSchema, await req.json());
      
      const config = await prisma.themeConfig.upsert({
        where: { id: "default-theme-config" },
        update: data,
        create: { id: "default-theme-config", primaryColor: "#4f46e5", ...data },
      });
      
      revalidateTag(CACHE_TAGS.THEME);
      return this.success(config);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateFeatureFlags(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateFeatureFlagsSchema, await req.json());
      
      const config = await prisma.featureFlags.upsert({
        where: { id: "default-feature-flags" },
        update: data,
        create: { id: "default-feature-flags", guestCheckout: true, ...data },
      });
      
      revalidateTag(CACHE_TAGS.FEATURES);
      return this.success(config);
    } catch (error) {
      return this.error(error);
    }
  }
}

export const configController = new ConfigController();
