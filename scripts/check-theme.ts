import { prisma } from "../src/lib/prisma";

async function main() {
  const config = await prisma.themeConfig.findUnique({
    where: { id: "default-theme-config" }
  });
  console.log("DB THEME CONFIG:", JSON.stringify(config, null, 2));
}

main().catch(console.error);
