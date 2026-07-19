import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🛍️ Seeding Demo Data...");

  // 1. Create Categories
  const catElectronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: { name: "Electronics", slug: "electronics", sortOrder: 1, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop" }
  });

  const catFashion = await prisma.category.upsert({
    where: { slug: "fashion" },
    update: {},
    create: { name: "Fashion", slug: "fashion", sortOrder: 2, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop" }
  });

  const catHome = await prisma.category.upsert({
    where: { slug: "home" },
    update: {},
    create: { name: "Home & Kitchen", slug: "home", sortOrder: 3, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop" }
  });

  console.log("✅ Categories created");

  // 2. Create Products
  const products = [
    {
      name: "Wireless ANC Headphones",
      slug: "wireless-anc-headphones",
      shortDescription: "Premium noise-canceling wireless headphones with 30-hour battery life.",
      price: 149.99,
      compareAtPrice: 199.99,
      stock: 50,
      isFeatured: true,
      categoryId: catElectronics.id,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Mechanical Keyboard RGB",
      slug: "mechanical-keyboard-rgb",
      shortDescription: "Tenkeyless mechanical keyboard with Cherry MX switches and RGB lighting.",
      price: 89.50,
      stock: 15,
      isFeatured: true,
      categoryId: catElectronics.id,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Minimalist Cotton T-Shirt",
      slug: "minimalist-cotton-t-shirt",
      shortDescription: "100% organic cotton t-shirt. Breathable and perfect for everyday wear.",
      price: 24.99,
      compareAtPrice: 29.99,
      stock: 100,
      isFeatured: false,
      categoryId: catFashion.id,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Classic Denim Jacket",
      slug: "classic-denim-jacket",
      shortDescription: "Vintage wash denim jacket with a relaxed fit.",
      price: 79.00,
      stock: 40,
      isFeatured: true,
      categoryId: catFashion.id,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Ceramic Coffee Mug Set",
      slug: "ceramic-coffee-mug-set",
      shortDescription: "Set of 4 hand-crafted ceramic mugs. Microwave and dishwasher safe.",
      price: 34.00,
      stock: 200,
      isFeatured: false,
      categoryId: catHome.id,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Smart Coffee Maker",
      slug: "smart-coffee-maker",
      shortDescription: "Wi-Fi enabled coffee maker. Schedule your brew from your phone.",
      price: 129.99,
      compareAtPrice: 159.99,
      stock: 10,
      isFeatured: true,
      categoryId: catHome.id,
      image: "https://images.unsplash.com/photo-1520288358487-dce107b34bdf?q=80&w=800&auto=format&fit=crop"
    }
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        description: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        stock: p.stock,
        isFeatured: p.isFeatured,
        status: "ACTIVE",
        categories: {
          create: [{ categoryId: p.categoryId }]
        }
      }
    });

    // Add main image
    await prisma.productImage.upsert({
      where: { id: `img-${product.id}` },
      update: {},
      create: {
        id: `img-${product.id}`,
        productId: product.id,
        url: p.image,
        alt: p.name,
        isDefault: true,
        sortOrder: 0
      }
    });
  }

  console.log("✅ 6 Demo Products created with images");

  console.log("\n🎉 Demo Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
