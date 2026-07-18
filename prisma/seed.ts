import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin User
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
  console.log("Admin user created:", admin.email);

  // Seed Site Config
  const siteConfig = await prisma.siteConfig.upsert({
    where: { id: "default-site-config" },
    update: {},
    create: {
      id: "default-site-config",
      storeName: "MotionCommerce",
      contactEmail: "contact@motionbite.com",
    },
  });
  console.log("Site config created");

  // Seed Feature Flags
  const featureFlags = await prisma.featureFlags.upsert({
    where: { id: "default-feature-flags" },
    update: {},
    create: {
      id: "default-feature-flags",
      guestCheckout: true,
      whatsappOrders: false,
      blog: false,
    },
  });
  console.log("Feature flags created");
  
  // Seed Theme Config
  const themeConfig = await prisma.themeConfig.upsert({
    where: { id: "default-theme-config" },
    update: {},
    create: {
      id: "default-theme-config",
      primaryColor: "#4f46e5", // Indigo 600
      fontFamily: "Inter",
    },
  });
  console.log("Theme config created");
  
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
