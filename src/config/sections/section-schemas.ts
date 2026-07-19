// ─────────────────────────────────────────────────────────────────────────────
// section-schemas.ts  —  CLIENT SAFE
// Contains only plain data (labels + default settings + fieldMeta).
// Zero server imports. Used by the builder UI ("use client" pages).
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

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "color"
  | "image"
  | "url"
  | "datetime"
  | "select"
  | "repeatable";

export interface FieldMeta {
  type: FieldType;
  label: string;
  options?: string[]; // For 'select' type
  itemSchema?: string[]; // For 'repeatable' type — the sub-field keys
  placeholder?: string;
}

export const SectionSchemas: Record<
  SectionType,
  {
    label: string;
    defaultSettings: Record<string, any>;
    fieldMeta: Record<string, FieldMeta>;
  }
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
    fieldMeta: {
      text: { type: "text", label: "Announcement Text" },
      linkText: { type: "text", label: "Link Button Text" },
      linkUrl: { type: "url", label: "Link URL" },
      bgColor: { type: "color", label: "Background Color" },
      textColor: { type: "color", label: "Text Color" },
      emoji: { type: "text", label: "Emoji (optional)" },
    },
  },
  "hero": {
    label: "🖼 Hero Banner",
    defaultSettings: {
      variant: "default",
      title: "Welcome to our store",
      subtitle: "Discover amazing products at unbeatable prices.",
      buttonText: "Shop Now",
      buttonLink: "/products",
      backgroundImage: "",
      alignment: "center",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "split", "minimal"],
      },
      title: { type: "text", label: "Headline" },
      subtitle: { type: "textarea", label: "Sub-headline" },
      buttonText: { type: "text", label: "Button Text" },
      buttonLink: { type: "url", label: "Button Link" },
      backgroundImage: { type: "image", label: "Background Image URL" },
      alignment: {
        type: "select",
        label: "Text Alignment",
        options: ["left", "center", "right"],
      },
    },
  },
  "category-grid": {
    label: "🗂 Category Grid",
    defaultSettings: {
      variant: "default",
      title: "Shop by Category",
      limit: 6,
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "cards"],
      },
      title: { type: "text", label: "Section Title" },
      limit: { type: "number", label: "Max Categories to Show" },
    },
  },
  "product-grid": {
    label: "🛍 Product Grid",
    defaultSettings: {
      variant: "default",
      title: "Featured Products",
      limit: 8,
      categoryId: "",
      showViewAll: true,
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "carousel"],
      },
      title: { type: "text", label: "Section Title" },
      limit: { type: "number", label: "Max Products to Show" },
      categoryId: {
        type: "text",
        label: "Filter by Category ID (leave blank for all)",
        placeholder: "Leave blank to show all featured products",
      },
      showViewAll: { type: "boolean", label: "Show 'View All' Button" },
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
    fieldMeta: {
      badges: {
        type: "repeatable",
        label: "Trust Badges",
        itemSchema: ["icon", "title", "subtitle"],
      },
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
    fieldMeta: {
      title: { type: "text", label: "Section Title" },
      subtitle: { type: "text", label: "Section Subtitle (optional)" },
      testimonials: {
        type: "repeatable",
        label: "Testimonials",
        itemSchema: ["name", "role", "rating", "quote"],
      },
    },
  },
  "newsletter": {
    label: "📧 Newsletter Signup",
    defaultSettings: {
      variant: "default",
      title: "Stay in the loop",
      subtitle: "Subscribe to get special offers, free giveaways, and exclusive deals.",
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
      incentive: "Get 10% off your first order!",
      bgColor: "indigo",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "minimal"],
      },
      title: { type: "text", label: "Headline" },
      subtitle: { type: "textarea", label: "Sub-headline" },
      placeholder: { type: "text", label: "Email Input Placeholder" },
      buttonText: { type: "text", label: "Button Text" },
      incentive: { type: "text", label: "Incentive Text (shown above form)" },
      bgColor: {
        type: "select",
        label: "Background Style",
        options: ["indigo", "slate", "white"],
      },
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
    fieldMeta: {
      eyebrow: { type: "text", label: "Eyebrow Label (small text above title)" },
      title: { type: "text", label: "Heading" },
      text: { type: "textarea", label: "Body Text" },
      buttonText: { type: "text", label: "Button Text" },
      buttonLink: { type: "url", label: "Button Link" },
      image: { type: "image", label: "Image URL" },
      imageAlt: { type: "text", label: "Image Alt Text" },
      imagePosition: {
        type: "select",
        label: "Image Position",
        options: ["left", "right"],
      },
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
    fieldMeta: {
      badge: { type: "text", label: "Badge Label (e.g. LIMITED TIME)" },
      title: { type: "text", label: "Promo Headline" },
      subtitle: { type: "textarea", label: "Sub-headline" },
      buttonText: { type: "text", label: "Button Text" },
      buttonLink: { type: "url", label: "Button Link" },
      bgColor: { type: "color", label: "Background Color" },
      textColor: { type: "color", label: "Text Color" },
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
    fieldMeta: {
      title: { type: "text", label: "Title" },
      subtitle: { type: "text", label: "Subtitle" },
      endDate: { type: "datetime", label: "Sale End Date & Time" },
      buttonText: { type: "text", label: "Button Text" },
      buttonLink: { type: "url", label: "Button Link" },
      bgColor: { type: "color", label: "Background Color" },
      showExpired: { type: "boolean", label: "Show section after timer expires" },
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
    fieldMeta: {
      title: { type: "text", label: "Section Title" },
      logos: {
        type: "repeatable",
        label: "Logos",
        itemSchema: ["name", "src"],
      },
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
    fieldMeta: {
      title: { type: "text", label: "Section Title (optional)" },
      subtitle: { type: "text", label: "Subtitle (optional)" },
      videoUrl: { type: "url", label: "Video URL (YouTube, Vimeo, or direct MP4)" },
      autoplay: { type: "boolean", label: "Autoplay" },
      muted: { type: "boolean", label: "Muted" },
      loop: { type: "boolean", label: "Loop" },
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
    fieldMeta: {
      title: { type: "text", label: "Section Title" },
      subtitle: { type: "text", label: "Section Subtitle (optional)" },
      columns: {
        type: "select",
        label: "Number of Columns",
        options: ["2", "3", "4"],
      },
      features: {
        type: "repeatable",
        label: "Feature Items",
        itemSchema: ["icon", "title", "description"],
      },
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
    fieldMeta: {
      eyebrow: { type: "text", label: "Eyebrow Label (small text above heading)" },
      heading: { type: "text", label: "Heading" },
      body: { type: "textarea", label: "Body Text" },
      buttonText: { type: "text", label: "Button Text (optional)" },
      buttonLink: { type: "url", label: "Button Link" },
      alignment: {
        type: "select",
        label: "Text Alignment",
        options: ["left", "center", "right"],
      },
      maxWidth: {
        type: "select",
        label: "Max Content Width",
        options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
      },
    },
  },
};
