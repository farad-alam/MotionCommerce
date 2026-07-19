import { configService } from "@/server/services/config.service";
import { SectionRegistry, SectionType } from "@/config/sections/registry";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Try to load the dynamic homepage layout
  const homepageLayout = await configService.getPageLayout("homepage");

  // Fallback default sections if no DB config
  const sections = homepageLayout?.sections || [
    {
      id: "default-hero",
      type: "hero",
      settings: {
        title: "Welcome to MotionCommerce",
        subtitle: "A premium headless e-commerce experience.",
        buttonText: "Shop Now",
        buttonLink: "/products",
        alignment: "center"
      }
    },
    {
      id: "default-categories",
      type: "category-grid",
      settings: {
        title: "Shop by Category",
        limit: 6
      }
    },
    {
      id: "default-products",
      type: "product-grid",
      settings: {
        title: "Featured Products",
        limit: 8,
        showViewAll: true
      }
    }
  ];

  return (
    <div>
      {(sections as any[]).map((section: any) => {
        const SectionComponent = SectionRegistry[section.type as SectionType];
        
        if (!SectionComponent) {
          console.warn(`Unknown section type: ${section.type}`);
          return null;
        }

        return (
          <SectionComponent 
            key={section.id} 
            settings={section.settings} 
            locale={locale} 
          />
        );
      })}
    </div>
  );
}
