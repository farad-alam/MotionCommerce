import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding MotionCommerce database...");

  // ── Admin User ────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@motionbite.com" },
    update: {},
    create: {
      email: "admin@motionbite.com",
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user:", admin.email);

  // ── Site Config ───────────────────────────────────────────────
  await prisma.siteConfig.upsert({
    where: { id: "default-site-config" },
    update: {},
    create: {
      id: "default-site-config",
      siteName: "MotionCommerce",
      contactEmail: "contact@motionbite.com",
      currency: "BDT",
      currencySymbol: "৳",
    },
  });
  console.log("✅ Site config created");

  // ── Feature Flags ─────────────────────────────────────────────
  await prisma.featureFlags.upsert({
    where: { id: "default-feature-flags" },
    update: {},
    create: {
      id: "default-feature-flags",
      flags: {
        blog: true,
        reviews: true,
        coupons: true,
        wishlist: true,
        whatsapp: false,
        guestCheckout: true,
        stockAlerts: true,
        compareProducts: false,
        sizeGuide: false,
        multiCurrency: false,
        loyaltyPoints: false,
        whatsappNumber: "",
        whatsappMessageTemplate: "Hello! I want to order:\n{items}\n\nTotal: {total}",
      },
    },
  });
  console.log("✅ Feature flags created");

  // ── Theme Config ──────────────────────────────────────────────
  await prisma.themeConfig.upsert({
    where: { id: "default-theme-config" },
    update: {},
    create: {
      id: "default-theme-config",
      presetName: "Default Indigo",
      customStyles: {
        primaryColor: "#4f46e5",
        secondaryColor: "#1e293b",
        borderRadius: "0.5rem",
        fontFamily: "Inter",
      },
    },
  });
  console.log("✅ Theme config created");

  // ── SEO Config ────────────────────────────────────────────────
  await prisma.seoConfig.upsert({
    where: { id: "default-seo-config" },
    update: {},
    create: {
      id: "default-seo-config",
      defaultMetaTitle: "MotionCommerce — Shop Smart",
      defaultMetaDesc: "Discover premium products at the best prices.",
    },
  });
  console.log("✅ SEO config created");

  // ── Store Config ──────────────────────────────────────────────
  await prisma.storeConfig.upsert({
    where: { id: "default-store-config" },
    update: {},
    create: {
      id: "default-store-config",
      shippingConfig: {
        freeShippingThreshold: 1000,
        defaultRate: 60,
        zones: [],
      },
      paymentConfig: {
        enabledMethods: ["COD"],
        mode: "manual",
      },
      taxConfig: {
        rate: 0,
        includedInPrice: false,
      },
      orderConfig: {
        prefix: "MC",
        minOrderAmount: 0,
      },
      emailConfig: {
        fromName: "MotionCommerce",
        fromAddress: "noreply@motionbite.com",
      },
    },
  });
  console.log("✅ Store config created");

  // ── Platform Meta ─────────────────────────────────────────────
  await prisma.platformMeta.upsert({
    where: { id: "default-platform-meta" },
    update: {},
    create: {
      id: "default-platform-meta",
      platformName: "MotionBite",
      platformVersion: "1.0.0",
      codebaseVersion: "1.0.0",
    },
  });
  console.log("✅ Platform meta created");

  // ── Navigation Config ─────────────────────────────────────────
  await prisma.navigationConfig.upsert({
    where: { location: "header" },
    update: {},
    create: {
      location: "header",
      items: [
        { label: "Home", href: "/", order: 1 },
        { label: "Products", href: "/products", order: 2 },
        { label: "Categories", href: "/categories", order: 3 },
        { label: "Blog", href: "/blog", order: 4 },
      ],
    },
  });
  console.log("✅ Navigation config created");

  // ── Footer Config ─────────────────────────────────────────────
  await prisma.footerConfig.upsert({
    where: { id: "default-footer-config" },
    update: {},
    create: {
      id: "default-footer-config",
      copyright: `© ${new Date().getFullYear()} MotionCommerce. All rights reserved.`,
      columns: [
        {
          heading: "Shop",
          links: [
            { label: "Products", href: "/products" },
            { label: "Categories", href: "/categories" },
            { label: "New Arrivals", href: "/products?sort=newest" },
          ],
        },
        {
          heading: "Support",
          links: [
            { label: "Contact Us", href: "/contact" },
            { label: "FAQ", href: "/faq" },
            { label: "Returns", href: "/returns" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About Us", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Privacy Policy", href: "/privacy" },
          ],
        },
      ],
      showMotionBiteCredit: true,
      showPaymentIcons: true,
    },
  });
  console.log("✅ Footer config created");

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
