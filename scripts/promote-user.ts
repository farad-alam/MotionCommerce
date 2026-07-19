import { prisma } from "../src/lib/prisma";

async function main() {
  const users = await prisma.user.findMany();
  console.log("Current users:", users.map(u => ({ id: u.id, email: u.email, role: u.role })));

  if (users.length > 0) {
    const upgraded = await prisma.user.updateMany({
      data: { role: "SUPER_ADMIN" }
    });
    console.log(`Successfully upgraded ${upgraded.count} users to SUPER_ADMIN.`);
  } else {
    console.log("No users found in the database. Please log in first.");
  }
}

main().catch(console.error);
