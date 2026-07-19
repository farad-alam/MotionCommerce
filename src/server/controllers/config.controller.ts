import { NextRequest } from "next/server";
import { BaseController } from "./base.controller";
import { validateRequest } from "../middleware/validation";
import { requireRole, Role } from "../middleware/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

const updateSiteConfigSchema = z.object({
  siteName: z.string().min(1).optional(),
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
  themePreset: z.string().optional(),
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
  // Accept either { flags: {...} } or a flat object of flags
  flags: z.record(z.string(), z.any()).optional(),
  // Legacy flat fields for backwards compatibility
  blog: z.boolean().optional(),
  reviews: z.boolean().optional(),
  coupons: z.boolean().optional(),
  wishlist: z.boolean().optional(),
  whatsapp: z.boolean().optional(),
  guestCheckout: z.boolean().optional(),
  stockAlerts: z.boolean().optional(),
  compareProducts: z.boolean().optional(),
  sizeGuide: z.boolean().optional(),
  multiCurrency: z.boolean().optional(),
  loyaltyPoints: z.boolean().optional(),
  whatsappNumber: z.string().optional(),
  whatsappMessageTemplate: z.string().optional(),
});

export class ConfigController extends BaseController {
  
  async updateSiteConfig(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateSiteConfigSchema, await req.json());
      
      const config = await prisma.siteConfig.upsert({
        where: { id: "default-site-config" },
        update: data,
        create: { id: "default-site-config", siteName: "MotionCommerce", ...data },
      });
      
      revalidateTag(CACHE_TAGS.SITE_CONFIG, "max");
      return this.success(config);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateThemeConfig(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const data = await validateRequest(updateThemeConfigSchema, await req.json());
      
      // ThemeConfig stores everything in the customStyles JSON blob
      const { themePreset, ...styleData } = data as any;
      const config = await prisma.themeConfig.upsert({
        where: { id: "default-theme-config" },
        update: { 
          presetName: themePreset || "default",
          customStyles: styleData 
        },
        create: {
          id: "default-theme-config",
          presetName: themePreset || "default",
          customStyles: { primaryColor: "#4f46e5", ...styleData },
        },
      });
      
      revalidateTag(CACHE_TAGS.THEME, "max");
      return this.success(config);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateFeatureFlags(req: NextRequest) {
    try {
      await requireRole(Role.CLIENT_ADMIN);
      const body = await validateRequest(updateFeatureFlagsSchema, await req.json());

      // Support both { flags: {...} } nested and legacy flat-flag format
      const flagData = (body as any).flags ?? (() => {
        const { flags: _ignored, ...rest } = body as any;
        return rest;
      })();

      // FeatureFlags stores everything in the flags JSON blob
      const config = await prisma.featureFlags.upsert({
        where: { id: "default-feature-flags" },
        update: { flags: flagData as any },
        create: {
          id: "default-feature-flags",
          flags: { blog: true, reviews: true, coupons: true, wishlist: true, guestCheckout: true, ...flagData },
        },
      });

      revalidateTag(CACHE_TAGS.FEATURES, "max");
      return this.success(config);
    } catch (error) {
      return this.error(error);
    }
  }
}

export const configController = new ConfigController();
