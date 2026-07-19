// ─────────────────────────────────────────────────────────────────────────────
// section-schemas.ts  —  CLIENT SAFE
// Contains only plain data (labels + default settings). Zero server imports.
// Used by the builder UI ("use client" pages).
// ─────────────────────────────────────────────────────────────────────────────

export type SectionType =
  | "hero"
  | "product-grid"
  | "category-grid"
  | "announcement-bar"
  | "trust-bar"
  | "testimonials"
  | "newsletter"
  | "image-with-text"
  | "promo-banner"
  | "countdown-timer"
  | "logo-carousel"
  | "video"
  | "features-grid"
  | "rich-text";

export interface SectionConfig {
  id: string;
  type: SectionType;
  settings: Record<string, any>;
}

export const SectionSchemas: Record<
  SectionType,
  { label: string; defaultSettings: Record<string, any> }
> = {
  // ── Tier 1 — Universal ────────────────────────────────────────────
  "announcement-bar": {
    label: "📢 Announcement Bar",
    defaultSettings: {
      text: "🚀 Free shipping on orders over ৳999!",
      linkText: "Shop Now",
      linkUrl: "/products",
      bgColor: "#4f46e5",
      textColor: "#ffffff",
      emoji: "",
    },
  },
  "hero": {
    label: "🖼 Hero Banner",
    defaultSettings: {
      title: "Welcome to our store",
      subtitle: "Discover amazing products at unbeatable prices.",
      buttonText: "Shop Now",
      buttonLink: "/products",
      backgroundImage: "",
      alignment: "center",
    },
  },
  "category-grid": {
    label: "🗂 Category Grid",
    defaultSettings: {
      title: "Shop by Category",
      limit: 6,
    },
  },
  "product-grid": {
    label: "🛍 Product Grid",
    defaultSettings: {
      title: "Featured Products",
      limit: 8,
      categoryId: "",
      showViewAll: true,
    },
  },
  "trust-bar": {
    label: "✅ Trust Badges",
    defaultSettings: {
      badges: [
        { icon: "truck", title: "Free Shipping", subtitle: "On orders over ৳999" },
        { icon: "rotate-ccw", title: "Easy Returns", subtitle: "Within 7 days" },
        { icon: "shield-check", title: "Secure Payment", subtitle: "100% protected" },
        { icon: "headphones", title: "24/7 Support", subtitle: "Always here" },
      ],
    },
  },
  "testimonials": {
    label: "⭐ Testimonials",
    defaultSettings: {
      title: "What Our Customers Say",
      subtitle: "",
      testimonials: [
        { name: "Sarah K.", role: "Verified Buyer", rating: 5, quote: "Absolutely love the quality! Fast shipping and exactly as described." },
        { name: "Mike R.", role: "Verified Buyer", rating: 5, quote: "Great products at amazing prices. Customer service was very helpful." },
        { name: "Aisha T.", role: "Verified Buyer", rating: 5, quote: "I was skeptical at first but this exceeded my expectations." },
      ],
    },
  },
  "newsletter": {
    label: "📧 Newsletter Signup",
    defaultSettings: {
      title: "Stay in the loop",
      subtitle: "Subscribe to get special offers, free giveaways, and exclusive deals.",
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
      incentive: "Get 10% off your first order!",
      bgColor: "indigo",
    },
  },

  // ── Tier 2 — High Impact ───────────────────────────────────────────
  "image-with-text": {
    label: "🖼 Image with Text",
    defaultSettings: {
      eyebrow: "Our Story",
      title: "Crafted with passion",
      text: "We believe great products start with great materials. Every piece in our collection is handpicked and quality-checked.",
      buttonText: "Learn More",
      buttonLink: "/about",
      image: "",
      imageAlt: "",
      imagePosition: "left",
    },
  },
  "promo-banner": {
    label: "🔥 Promo Banner",
    defaultSettings: {
      badge: "LIMITED TIME",
      title: "MEGA SALE — Up to 50% Off",
      subtitle: "Don't miss our biggest sale of the year. Shop now before it's too late!",
      buttonText: "Shop the Sale",
      buttonLink: "/products",
      bgColor: "#dc2626",
      textColor: "#ffffff",
    },
  },
  "countdown-timer": {
    label: "⏳ Countdown Timer",
    defaultSettings: {
      title: "Sale Ends In",
      subtitle: "Don't miss out on these incredible deals!",
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      buttonText: "Shop Now",
      buttonLink: "/products",
      bgColor: "#0f172a",
      showExpired: false,
    },
  },
  "logo-carousel": {
    label: "🏷 Logo Carousel",
    defaultSettings: {
      title: "As Seen In",
      logos: [
        { name: "Brand One", src: "" },
        { name: "Brand Two", src: "" },
        { name: "Brand Three", src: "" },
        { name: "Brand Four", src: "" },
        { name: "Brand Five", src: "" },
      ],
    },
  },
  "video": {
    label: "▶ Video Section",
    defaultSettings: {
      title: "",
      subtitle: "",
      videoUrl: "",
      autoplay: false,
      muted: true,
      loop: false,
    },
  },
  "features-grid": {
    label: "✨ Features Grid",
    defaultSettings: {
      title: "Why Choose Us",
      subtitle: "",
      columns: 3,
      features: [
        { icon: "zap", title: "Lightning Fast", description: "Optimized for speed and performance across all devices." },
        { icon: "shield", title: "Secure & Trusted", description: "Bank-level security to protect your data and payments." },
        { icon: "globe", title: "Ships Worldwide", description: "We deliver to over 50 countries with tracking included." },
        { icon: "heart", title: "Made with Care", description: "Every product is handpicked and quality-checked." },
        { icon: "headphones", title: "24/7 Support", description: "Our team is always here to help you." },
        { icon: "gift", title: "Gift Wrapping", description: "Free gift wrapping available on all orders." },
      ],
    },
  },
  "rich-text": {
    label: "📝 Rich Text Block",
    defaultSettings: {
      eyebrow: "",
      heading: "A heading that tells your story",
      body: "Add your content here. Tell customers what makes your store unique.",
      buttonText: "",
      buttonLink: "",
      alignment: "center",
      maxWidth: "3xl",
    },
  },
};
