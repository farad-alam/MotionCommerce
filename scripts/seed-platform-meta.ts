import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding PlatformMeta...");

  await prisma.platformMeta.upsert({
    where: { id: "core_system" },
    update: {},
    create: {
      id: "core_system",
      platformName: "MotionCommerce Base",
      platformVersion: "1.0.0",
      codebaseVersion: "3.1.0",
    },
  });

  console.log("PlatformMeta seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
