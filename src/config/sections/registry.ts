// ─────────────────────────────────────────────────────────────────────────────
// registry.ts  —  SERVER ONLY
// Maps section type strings to their React components.
// Only import this file in Server Components (e.g., storefront homepage).
// For builder UI (client components), import from ./section-schemas instead.
// ─────────────────────────────────────────────────────────────────────────────

import { HeroSection } from "@/components/sections/HeroSection";
import { ProductGridSection } from "@/components/sections/ProductGridSection";
import { CategoryGridSection } from "@/components/sections/CategoryGridSection";
import { AnnouncementBarSection } from "@/components/sections/AnnouncementBarSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ImageWithTextSection } from "@/components/sections/ImageWithTextSection";
import { PromoBannerSection } from "@/components/sections/PromoBannerSection";
import { CountdownTimerSection } from "@/components/sections/CountdownTimerSection";
import { LogoCarouselSection } from "@/components/sections/LogoCarouselSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { FeaturesGridSection } from "@/components/sections/FeaturesGridSection";
import { RichTextSection } from "@/components/sections/RichTextSection";

// Re-export types and schemas from the client-safe file
export type { SectionType, SectionConfig } from "./section-schemas";
export { SectionSchemas } from "./section-schemas";

// Component registry — maps type string → React component
export const SectionRegistry: Record<string, React.ComponentType<any>> = {
  "hero": HeroSection,
  "product-grid": ProductGridSection,
  "category-grid": CategoryGridSection,
  "announcement-bar": AnnouncementBarSection,
  "trust-bar": TrustBarSection,
  "testimonials": TestimonialsSection,
  "newsletter": NewsletterSection,
  "image-with-text": ImageWithTextSection,
  "promo-banner": PromoBannerSection,
  "countdown-timer": CountdownTimerSection,
  "logo-carousel": LogoCarouselSection,
  "video": VideoSection,
  "features-grid": FeaturesGridSection,
  "rich-text": RichTextSection,
};
