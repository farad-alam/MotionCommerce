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
      variant: "default",
      text: "🚀 Free express shipping on orders over ৳5000!",
      linkText: "Shop New Arrivals",
      linkUrl: "/products",
      bgColor: "#000000",
      textColor: "#ffffff",
      emoji: "",
      messages: [],
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "gradient", "multi-message"],
      },
      text: { type: "text", label: "Announcement Text (Default & Gradient)" },
      linkText: { type: "text", label: "Link Button Text" },
      linkUrl: { type: "url", label: "Link URL" },
      bgColor: { type: "color", label: "Background Color" },
      textColor: { type: "color", label: "Text Color" },
      emoji: { type: "text", label: "Emoji (optional)" },
      messages: {
        type: "repeatable",
        label: "Rotating Messages (Multi-message only)",
        itemSchema: ["text", "linkText", "linkUrl"],
      },
    },
  },
  "hero": {
    label: "🖼 Hero Banner",
    defaultSettings: {
      variant: "default",
      title: "The Fall Collection",
      subtitle: "Elevate your wardrobe with our latest arrivals. Designed for modern life.",
      buttonText: "Shop The Look",
      buttonLink: "/products",
      backgroundImage: "",
      alignment: "center",
      badge: "NEW IN",
      accentColor: "#000000",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "split", "minimal", "cinematic", "lookbook", "gradient"],
      },
      badge: { type: "text", label: "Badge (e.g. NEW IN)" },
      title: { type: "text", label: "Headline" },
      subtitle: { type: "textarea", label: "Sub-headline" },
      buttonText: { type: "text", label: "Primary Button Text" },
      buttonLink: { type: "url", label: "Primary Button Link" },
      backgroundImage: { type: "image", label: "Background Image URL" },
      alignment: {
        type: "select",
        label: "Text Alignment",
        options: ["left", "center", "right"],
      },
      accentColor: { type: "color", label: "Accent Color (Gradient variant)" },
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
        options: ["default", "cards", "horizontal-scroll", "mosaic", "boutique"],
      },
      title: { type: "text", label: "Section Title" },
      limit: { type: "number", label: "Max Categories to Show" },
    },
  },
  "product-grid": {
    label: "🛍 Product Grid",
    defaultSettings: {
      variant: "default",
      title: "Featured Collections",
      limit: 8,
      categoryId: "",
      showViewAll: true,
      badgeText: "HOT",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "carousel", "editorial", "masonry", "compact", "spotlight"],
      },
      title: { type: "text", label: "Section Title" },
      limit: { type: "number", label: "Max Products to Show" },
      categoryId: {
        type: "text",
        label: "Filter by Category ID (leave blank for all)",
        placeholder: "Leave blank to show all featured products",
      },
      showViewAll: { type: "boolean", label: "Show 'View All' Button" },
      badgeText: { type: "text", label: "Badge Text (Spotlight variant)" },
    },
  },
  "trust-bar": {
    label: "✅ Trust Badges",
    defaultSettings: {
      variant: "default",
      badges: [
        { icon: "truck", title: "Free Express Shipping", subtitle: "On orders over ৳5000" },
        { icon: "rotate-ccw", title: "Easy Returns", subtitle: "Within 30 days" },
        { icon: "shield-check", title: "Secure Payment", subtitle: "100% protected" },
        { icon: "headphones", title: "24/7 Support", subtitle: "Always here for you" },
      ],
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "cards", "minimal"],
      },
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
      variant: "default",
      title: "Loved by our community",
      subtitle: "Join thousands of satisfied customers.",
      testimonials: [
        { name: "Sarah K.", role: "Verified Buyer", rating: 5, quote: "The fit is absolutely perfect. I get compliments every time I wear this jacket!" },
        { name: "Mike R.", role: "Verified Buyer", rating: 5, quote: "Premium quality materials. You can really feel the difference compared to fast fashion." },
        { name: "Aisha T.", role: "Verified Buyer", rating: 5, quote: "Customer service was amazing when I needed to exchange sizes. Highly recommended." },
      ],
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "carousel", "masonry-wall"],
      },
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
      title: "Join The Club",
      subtitle: "Subscribe to get early access to new drops, exclusive sales, and style guides.",
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
      incentive: "Get 15% off your first order!",
      bgColor: "dark",
      backgroundImage: "",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "minimal", "fullscreen"],
      },
      title: { type: "text", label: "Headline" },
      subtitle: { type: "textarea", label: "Sub-headline" },
      placeholder: { type: "text", label: "Email Input Placeholder" },
      buttonText: { type: "text", label: "Button Text" },
      incentive: { type: "text", label: "Incentive Text (shown above form)" },
      bgColor: {
        type: "select",
        label: "Background Style",
        options: ["dark", "light", "primary"],
      },
      backgroundImage: { type: "image", label: "Background Image (Fullscreen only)" },
    },
  },

  // ── Tier 2 — High Impact ───────────────────────────────────────────
  "image-with-text": {
    label: "🖼 Image with Text",
    defaultSettings: {
      variant: "default",
      eyebrow: "Our Heritage",
      title: "Crafted with precision",
      text: "We believe great style starts with superior materials. Every piece in our collection is hand-stitched and quality-checked to ensure it lasts a lifetime.",
      buttonText: "Discover Our Story",
      buttonLink: "/about",
      image: "",
      imageAlt: "Brand story image",
      imagePosition: "left",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "overlapping", "full-bleed"],
      },
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
      variant: "default",
      badge: "LIMITED TIME",
      title: "END OF SEASON SALE — Up to 50% Off",
      subtitle: "Don't miss our biggest sale of the year. Grab your favorites before they're gone!",
      buttonText: "Shop the Sale",
      buttonLink: "/products",
      bgColor: "#000000",
      textColor: "#ffffff",
      backgroundImage: "",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "gradient", "image-overlay"],
      },
      badge: { type: "text", label: "Badge Label (e.g. LIMITED TIME)" },
      title: { type: "text", label: "Promo Headline" },
      subtitle: { type: "textarea", label: "Sub-headline" },
      buttonText: { type: "text", label: "Button Text" },
      buttonLink: { type: "url", label: "Button Link" },
      bgColor: { type: "color", label: "Background Color" },
      textColor: { type: "color", label: "Text Color" },
      backgroundImage: { type: "image", label: "Background Image (Image Overlay only)" },
    },
  },
  "countdown-timer": {
    label: "⏳ Countdown Timer",
    defaultSettings: {
      variant: "default",
      title: "Flash Sale Ends In",
      subtitle: "Hurry! These exclusive prices won't last long.",
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      buttonText: "Shop Now",
      buttonLink: "/products",
      bgColor: "#000000",
      showExpired: false,
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "inline"],
      },
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
      variant: "default",
      title: "Featured In",
      logos: [
        { name: "Vogue", src: "" },
        { name: "GQ", src: "" },
        { name: "Hypebeast", src: "" },
        { name: "Elle", src: "" },
        { name: "Harper's Bazaar", src: "" },
      ],
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "grid"],
      },
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
      variant: "default",
      title: "The Making of Fall '26",
      subtitle: "Go behind the scenes of our latest campaign.",
      videoUrl: "",
      autoplay: false,
      muted: true,
      loop: false,
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "fullscreen"],
      },
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
      variant: "default",
      title: "The Motion Commerce Difference",
      subtitle: "",
      columns: 3,
      features: [
        { icon: "zap", title: "Express Delivery", description: "Get your order in 1-2 business days with our premium shipping." },
        { icon: "shield", title: "Premium Quality", description: "Ethically sourced materials designed to stand the test of time." },
        { icon: "globe", title: "Global Shipping", description: "We deliver to over 100 countries worldwide." },
        { icon: "heart", title: "Sustainable", description: "100% carbon neutral operations and recycled packaging." },
        { icon: "headphones", title: "Style Advice", description: "Connect with our expert stylists 24/7." },
        { icon: "gift", title: "Gift Ready", description: "Every order arrives in our signature luxury unboxing experience." },
      ],
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "alternating"],
      },
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
      variant: "default",
      eyebrow: "Our Mission",
      heading: "Redefining modern luxury.",
      body: "We set out to create a wardrobe that works as hard as you do. Minimalist designs, maximalist quality.",
      buttonText: "Read Our Story",
      buttonLink: "/about",
      alignment: "center",
      maxWidth: "3xl",
    },
    fieldMeta: {
      variant: {
        type: "select",
        label: "Design Variant",
        options: ["default", "two-column"],
      },
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
