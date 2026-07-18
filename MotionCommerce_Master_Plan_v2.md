# MotionCommerce — Master Plan (v3.1)

> **Internal Ecommerce Platform for MotionBite Agency**

---

## 1. Vision

Build **MotionCommerce**, an internal, reusable ecommerce platform for MotionBite.

This is **not** a multi-tenant SaaS like Shopify. It is a single master
codebase that the team clones, deploys, and configures through a visual
**Project Builder** — launching a complete ecommerce website for each client
**without writing code**.

Each client receives:

- Independent Git repository (cloned from master)
- Independent Vercel deployment
- Independent PostgreSQL database
- Independent environment variables
- Independent domain

---

## 2. Primary Goal

> A junior developer or project manager should be able to launch a complete
> ecommerce website without writing a single line of code.

Code should only be written when:

- A completely new feature is required
- A new reusable section is added to the library
- A new feature pack is created
- A new theme preset is developed
- A platform bug is fixed

---

## 3. Core Principles

| Principle                     | Meaning                                                            |
| ----------------------------- | ------------------------------------------------------------------ |
| Configuration over coding     | Everything is driven by DB-stored config, not hardcoded values     |
| Single codebase               | One master repo, cloned per client                                 |
| Reusable components           | Section library with standardized schemas                          |
| Theme = presentation only     | Themes never affect business logic                                 |
| Modular feature packs         | Optional features toggled on/off without code changes              |
| API-first architecture        | All data access goes through API routes                            |
| Layered business logic        | API Route → Controller → Service → Repository → Prisma            |
| Free-tier friendly            | Every external service must have a generous free tier              |
| Bangladesh-first              | Payment, language, and currency defaults target Bangladesh         |
| Independent deployments       | Each client runs in complete isolation                             |
| **Mobile-first design**       | All UI/UX is designed for mobile screens first, then scaled up     |
| **Bilingual by default**      | English (default) + Bangla; extensible to Arabic and beyond        |

---

## 4. Agency Workflow

```text
1. Client Order Received
        ↓
2. Clone Master Repository
        ↓
3. Create New Git Repository (GitHub/GitLab)
        ↓
4. Create New Neon Database (free tier)
        ↓
5. Deploy to Vercel (free tier)
        ↓
6. Set Environment Variables in Vercel
        ↓
7. Run Database Migration (npx prisma migrate deploy)
        ↓
8. Run Seed Script (npx prisma db seed)
        ↓
9. Connect Custom Domain
        ↓
10. Open Project Builder (Internal — /builder)
        ↓
11. Configure: Theme → Branding → Homepage → Features → Navigation → Footer → SEO → Store Settings → Payment Mode
        ↓
12. Create Client Dashboard Account
        ↓
13. QA & Testing
        ↓
14. Deliver to Client
```

**Everything from step 10 onward is UI-only configuration.**

---

## 5. Technology Stack (Free-Tier Optimized)

### Core Framework

| Technology     | Role              | Cost       | Notes                                    |
| -------------- | ----------------- | ---------- | ---------------------------------------- |
| Next.js 15+    | Fullstack framework | Free (OSS) | App Router, Server Components, Server Actions |
| React 19+      | UI library        | Free (OSS) |                                          |
| TypeScript     | Type safety       | Free (OSS) |                                          |

### Styling & UI

| Technology     | Role              | Cost       | Notes                                    |
| -------------- | ----------------- | ---------- | ---------------------------------------- |
| Tailwind CSS 4 | Utility-first CSS | Free (OSS) |                                          |
| shadcn/ui      | Component library | Free (OSS) | Dashboard & Builder UI                   |

### Database & ORM

| Technology     | Role              | Cost       | Free Tier                                |
| -------------- | ----------------- | ---------- | ---------------------------------------- |
| Neon           | PostgreSQL hosting | Free tier  | 0.5 GB storage, auto-suspend, branching  |
| Prisma         | ORM               | Free (OSS) | Type-safe queries, migrations            |

> **Why Neon?** Pure PostgreSQL, generous free tier sufficient for 300–500
> monthly visitors, auto-suspend saves compute, works perfectly with
> Prisma, and each client can have their own free-tier project.
>
> **Alternatives if Neon changes terms:** Supabase (free tier, 2 projects),
> Vercel Postgres (bundled with Vercel).

### Media

| Technology     | Role              | Cost       | Free Tier                                |
| -------------- | ----------------- | ---------- | ---------------------------------------- |
| Cloudinary     | Image/video CDN   | Free tier  | 25 credits/month (~25 GB bandwidth)      |

### Email

| Technology     | Role              | Cost       | Free Tier                                |
| -------------- | ----------------- | ---------- | ---------------------------------------- |
| Resend         | Transactional email | Free tier | 100 emails/day, 3,000/month              |

### Payments (Bangladesh) — Dual Mode System

| Technology      | Mode       | Role              | Cost       | Notes                                    |
| --------------- | ---------- | ----------------- | ---------- | ---------------------------------------- |
| bKash           | Manual     | Mobile payment    | Free       | Customer sends money manually, inputs number + txn ID |
| Nagad           | Manual     | Mobile payment    | Free       | Customer sends money manually, inputs number + txn ID |
| Bank Transfer   | Manual     | Bank payment      | Free       | Customer transfers manually, inputs txn ID |
| COD             | Manual     | Cash on delivery  | Free       | Payment collected on delivery            |
| SSLCommerz      | Automatic  | Payment gateway   | Per-txn fee | Fully automatic — bKash, Nagad, cards, net banking |
| bKash PGW       | Automatic  | Mobile payment    | Per-txn fee | Direct API integration (alternative to SSLCommerz) |
| Nagad PGW       | Automatic  | Mobile payment    | Per-txn fee | Direct API integration (alternative to SSLCommerz) |

> **Payment Mode is configurable per client via the Project Builder UI.**
> See [Section 19: Payment Integration](#19-payment-integration-dual-mode-system) for full details.

### Analytics

| Technology       | Role              | Cost | Notes                                  |
| ---------------- | ----------------- | ---- | -------------------------------------- |
| Google Analytics | Traffic analytics | Free | GA4, configured via Project Builder    |

### Authentication (Social Login)

| Technology       | Role              | Cost | Notes                                  |
| ---------------- | ----------------- | ---- | -------------------------------------- |
| NextAuth.js / Auth.js | Auth framework | Free (OSS) | Credential + Google OAuth provider |
| Google OAuth     | Social login      | Free | Sign in with Google for customers      |

### Blog Content Editing

| Technology       | Role              | Cost | Notes                                  |
| ---------------- | ----------------- | ---- | -------------------------------------- |
| Tiptap           | Rich text editor  | Free (MIT) | Core + all standard extensions are MIT licensed. Only "Tiptap Cloud" (real-time collaboration) is paid — we don't use it. |

### Hosting & Deployment

| Technology     | Role              | Cost       | Free Tier                                |
| -------------- | ----------------- | ---------- | ---------------------------------------- |
| Vercel         | Hosting + CI/CD   | Free tier  | 100 GB bandwidth, serverless functions   |
| GitHub         | Git hosting       | Free tier  | Unlimited private repos                  |

### Summary: Monthly Cost Per Client

| Service     | Free Tier Limit           | Enough for 300–500/mo? |
| ----------- | ------------------------- | ---------------------- |
| Vercel      | 100 GB bandwidth          | ✅ Yes                 |
| Neon        | 0.5 GB storage            | ✅ Yes                 |
| Cloudinary  | 25 credits/month          | ✅ Yes                 |
| Resend      | 3,000 emails/month        | ✅ Yes                 |
| GitHub      | Unlimited private repos   | ✅ Yes                 |
| **Total**   |                           | **$0/month**           |

---

## 6. Architecture Overview

### System Layers

```text
┌──────────────────────────────────────────────────────────┐
│                      STOREFRONT                          │
│              (Public-facing ecommerce site)               │
│         Renders pages from DB configuration               │
│         Mobile-first responsive design                    │
├──────────────────────────────────────────────────────────┤
│                   PROJECT BUILDER                         │
│    (Internal — MotionBite staff, branded "MotionBite")    │
│    Theme / Branding / Homepage / Features / SEO /         │
│    Payment Mode / Language config                         │
├──────────────────────────────────────────────────────────┤
│                  CLIENT DASHBOARD                         │
│              (Client-facing admin panel)                  │
│    Products / Orders / Customers / Blog / Media / SEO     │
├──────────────────────────────────────────────────────────┤
│                     API LAYER                             │
│              Next.js API Routes (/api/*)                  │
│            Controller → Service → Repository              │
├──────────────────────────────────────────────────────────┤
│                   DATA LAYER                              │
│              Prisma ORM → Neon PostgreSQL                 │
├──────────────────────────────────────────────────────────┤
│                 EXTERNAL SERVICES                         │
│  Cloudinary │ Resend │ SSLCommerz │ bKash │ Nagad │ GA4  │
│  Google OAuth │ Tiptap (client-side)                     │
└──────────────────────────────────────────────────────────┘
```

### Request Flow (Business Logic)

```text
Client Request
     ↓
API Route Handler (/api/products/route.ts)
     ↓
Controller (validates input, calls service)
     ↓
Service (business logic, authorization checks)
     ↓
Repository (database queries via Prisma)
     ↓
Prisma Client → Neon PostgreSQL
     ↓
Response (JSON)
```

### Configuration-Driven Rendering (Storefront)

```text
Page Request (e.g., "/" homepage)
     ↓
Server Component fetches PageLayout from DB
     ↓
PageLayout contains: [{ sectionType: "hero", order: 1, props: {...} }, ...]
     ↓
Section Registry maps sectionType → React Component
     ↓
Each section renders with its stored props
     ↓
Theme config (CSS variables) applied globally
     ↓
Fully rendered page returned to browser
```

---

## 7. SEO & Performance Architecture Analysis

> **Does this structure and workflow have any bad effect on SEO and speed?**

### ✅ Why This Architecture Is Excellent for SEO

| Factor | Assessment | Reason |
| ------ | ---------- | ------ |
| Server-Side Rendering | ✅ Excellent | Next.js App Router uses Server Components by default — HTML is fully rendered on the server before reaching the browser. Google's crawler sees complete content. |
| Crawlable HTML | ✅ Excellent | Unlike client-side-only SPAs (React SPA, Angular), every page arrives as full HTML. No JavaScript execution needed for indexing. |
| Meta Tags | ✅ Excellent | Dynamic `<head>` with per-page meta title, description, Open Graph, and JSON-LD structured data — all server-rendered. |
| URL Structure | ✅ Excellent | Clean, semantic URLs (`/products/red-shirt`, `/blog/my-post`). No hash-based routing. |
| Sitemap & robots.txt | ✅ Excellent | Auto-generated `sitemap.xml` and configurable `robots.txt`. |
| Canonical URLs | ✅ Excellent | Auto-generated to prevent duplicate content. |
| Core Web Vitals | ✅ Excellent | SSR + ISR + Cloudinary image optimization + Next.js Image component = fast LCP, low CLS. |

### ✅ Why This Architecture Is Excellent for Speed

| Factor | Assessment | Reason |
| ------ | ---------- | ------ |
| On-Demand Revalidation | ✅ Optimal | Pages are cached and only re-rendered when data actually changes (see Section 16). No wasteful polling. |
| Code Splitting | ✅ Automatic | Next.js App Router splits bundles per route. Dashboard/Builder code is never loaded for storefront visitors. |
| Image Optimization | ✅ Excellent | Cloudinary handles format conversion (WebP/AVIF), resizing. Next.js `<Image>` handles lazy loading and blur placeholders. |
| Edge CDN | ✅ Free | Vercel serves static assets from its global edge network automatically. |
| Font Loading | ✅ Optimized | `next/font` with `font-display: swap` prevents FOIT (Flash of Invisible Text). |
| Database Queries | ✅ Efficient | Prisma `select` picks only needed fields. Config is cached with tags, not fetched on every request. |
| Bundle Size | ✅ Controlled | Dashboard and Builder use dynamic imports — zero impact on storefront bundle. |

### ⚠️ Potential Concerns & Mitigations

| Concern | Risk Level | Mitigation |
| ------- | ---------- | ---------- |
| Neon cold starts (auto-suspend) | Low | First request after idle may take ~500ms. Mitigated by ISR caching — most visitors hit cached pages. |
| Too many JSON columns | Low | JSON columns are not directly indexable. We use structured columns for frequently queried fields and JSON only for nested config. |
| Single H1 enforcement | None | Enforced by section architecture — only one Hero/heading per page. |
| JavaScript hydration cost | Low | Server Components minimize client-side JS. Interactive components use `"use client"` selectively. |

**Verdict: This architecture is SEO-optimized and speed-optimized by design. No negative effects.**

---

## 8. Role & Permission Model (RBAC)

### Roles

| Role            | Access Level          | Description                              |
| --------------- | --------------------- | ---------------------------------------- |
| `SUPER_ADMIN`   | Everything            | MotionBite platform owner                |
| `AGENCY_STAFF`  | Builder + Dashboard   | MotionBite team members                  |
| `CLIENT_ADMIN`  | Dashboard (full)      | Client store owner                       |
| `CLIENT_STAFF`  | Dashboard (limited)   | Client employees (e.g., order manager)   |
| `CUSTOMER`      | Storefront account    | End users who shop on the site           |

### Permission Matrix

| Resource                          | SUPER_ADMIN | AGENCY_STAFF | CLIENT_ADMIN | CLIENT_STAFF | CUSTOMER |
| --------------------------------- | ----------- | ------------ | ------------ | ------------ | -------- |
| Project Builder                   | ✅          | ✅           | ❌           | ❌           | ❌       |
| Theme Config (colors/fonts)       | ✅          | ✅           | ❌           | ❌           | ❌       |
| Feature Packs                     | ✅          | ✅           | ❌           | ❌           | ❌       |
| Payment Mode & Methods            | ✅          | ✅           | ❌           | ❌           | ❌       |
| Gateway API Credentials           | ✅          | ✅           | ❌           | ❌           | ❌       |
| Payment Info (MFS/Bank)           | ✅          | ✅           | ✅           | ❌           | ❌       |
| Branding (logo, social, contact)  | ✅          | ✅           | ✅           | ❌           | ❌       |
| Products                          | ✅          | ✅           | ✅           | ✅           | Read     |
| Categories                        | ✅          | ✅           | ✅           | ✅           | Read     |
| Orders                            | ✅          | ✅           | ✅           | ✅           | Own      |
| Customers                         | ✅          | ✅           | ✅           | Read         | ❌       |
| Blog                              | ✅          | ✅           | ✅           | ✅           | Read     |
| Media                             | ✅          | ✅           | ✅           | ✅           | ❌       |
| SEO Settings                      | ✅          | ✅           | ✅           | ❌           | ❌       |
| Store Settings                    | ✅          | ✅           | ✅           | ❌           | ❌       |
| User Management                   | ✅          | ✅           | ✅           | ❌           | ❌       |
| Homepage Edit                     | ✅          | ✅           | ✅ (content) | ❌           | ❌       |

### Authentication Flow (Hybrid: Credentials + Google OAuth)

MotionCommerce supports **two authentication methods** for customers:

1. **Email + Password** (traditional credentials)
2. **Sign in with Google** (OAuth 2.0 via Google)

Admin/staff users (SUPER_ADMIN, AGENCY_STAFF, CLIENT_ADMIN, CLIENT_STAFF) use
**email + password only** for security — no social login for admin roles.

#### Implementation: NextAuth.js (Auth.js)

We use **NextAuth.js (Auth.js v5)** instead of manual JWT handling. This gives us:

- Built-in Google OAuth provider (zero custom code)
- Built-in credential provider (email + password)
- Automatic session management via secure httpOnly cookies
- CSRF protection built-in
- Database adapter for Prisma (stores sessions, accounts, users)

```text
── Customer Login Flow ──

Option A: Email + Password
  1. Customer enters email + password
  2. NextAuth Credentials provider validates via bcrypt
  3. Session created (JWT strategy, httpOnly cookie)
  4. Customer redirected to storefront

Option B: Sign in with Google
  1. Customer clicks "Sign in with Google"
  2. Redirected to Google OAuth consent screen
  3. Google returns profile (email, name, avatar)
  4. NextAuth checks if email exists in DB:
     - Exists → link Google account, create session
     - New → create User with role=CUSTOMER, create session
  5. Customer redirected to storefront

── Admin/Staff Login Flow ──

  1. Admin enters email + password at /dashboard/login or /builder/login
  2. NextAuth Credentials provider validates
  3. Middleware checks role ≥ CLIENT_STAFF
  4. Session created, redirected to Dashboard or Builder
```

#### Google OAuth Configuration

```text
1. Create project in Google Cloud Console
2. Enable Google OAuth 2.0 API
3. Configure consent screen (app name, logo, authorized domains)
4. Create OAuth credentials (client ID + secret)
5. Add to environment variables:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
6. Configure callback URL in Google Console:
   - https://your-domain.com/api/auth/callback/google
```

> **Cost: Free.** Google OAuth has no usage limits for sign-in.
>
> **Future social providers:** Facebook, Apple Sign-In — NextAuth.js supports
> 80+ providers. Adding a new one requires only a config entry, no code.

---

## 9. Configuration System

The configuration system is the **heart of MotionCommerce**. It allows
every aspect of the site to be customized without code.

### Config Storage Strategy

Configuration is stored in PostgreSQL using **structured tables with JSON
columns** for flexibility.

| Config Area       | Storage Approach                                      |
| ----------------- | ----------------------------------------------------- |
| Site Settings     | Structured columns (name, language, currency, etc.)   |
| Theme             | JSON column (colors, fonts, border-radius, etc.)      |
| Branding          | Structured columns (logo URL, favicon URL, etc.)      |
| Page Layouts      | JSON column (array of section configs)                |
| Navigation        | JSON column (nested menu structure)                   |
| Footer            | JSON column (columns, links, copyright)               |
| SEO               | Structured columns + JSON for OG data                 |
| Feature Flags     | JSON column (key-value boolean map)                   |
| Store Settings    | JSON column (shipping, payment mode, tax config)      |
| **Platform Meta** | Structured columns (MotionBite version, build info)   |

### Config Loading Strategy (On-Demand Revalidation)

```text
1. Server Components fetch config at request time (SSR)
2. Config is cached using Next.js Data Cache with cache tags
3. When config changes via Builder/Dashboard:
   a. Database updated
   b. revalidateTag("site-config") / revalidateTag("theme") called immediately
   c. ONLY the affected pages are re-rendered on next request
   d. No polling, no timers, no wasted resources
4. No full rebuild needed — uses ISR (Incremental Static Regeneration)
```

> **Why on-demand revalidation instead of timed revalidation?**
>
> After initial setup, most clients don't update their store for weeks or
> months. Polling the database every 60 seconds (or any interval) wastes
> serverless function invocations on Vercel's free tier and adds unnecessary
> database load on Neon. On-demand revalidation means: **zero cost when
> nothing changes, instant updates when something does.**

### Config Validation

Every config update is validated against a Zod schema before writing to DB.
This prevents invalid configurations from breaking the storefront.

---

## 10. Database Schema (Prisma)

### User & Authentication (with Google OAuth support)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?   // Nullable — Google OAuth users may not have a password
  name          String
  phone         String?
  avatar        String?
  role          Role      @default(CUSTOMER)
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  addresses     Address[]
  orders        Order[]
  reviews       Review[]
  wishlistItems WishlistItem[]
  cartItems     CartItem[]
  blogPosts     BlogPost[]    @relation("author")
  accounts      Account[]     // NextAuth.js OAuth accounts
  sessions      Session[]     // NextAuth.js sessions
}

// NextAuth.js required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              String  // "oauth" | "credentials"
  provider          String  // "google" | "credentials"
  providerAccountId String
  access_token      String? @db.Text
  refresh_token     String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

enum Role {
  SUPER_ADMIN
  AGENCY_STAFF
  CLIENT_ADMIN
  CLIENT_STAFF
  CUSTOMER
}

model Address {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  label      String   @default("Home")  // Home, Office, etc.
  fullName   String
  phone      String
  division   String
  district   String
  area       String
  address    String   // Street address
  postalCode String?
  isDefault  Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  orders     Order[]
}
```

### Products & Categories

```prisma
model Category {
  id          String     @id @default(cuid())
  name        String
  nameLocalized Json?    // { "bn": "বাংলা নাম", "ar": "اسم عربي" }
  slug        String     @unique
  description String?
  image       String?
  parentId    String?
  parent      Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryTree")
  sortOrder   Int        @default(0)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  products    ProductCategory[]
}

model Product {
  id              String    @id @default(cuid())
  name            String
  nameLocalized   Json?     // { "bn": "বাংলা নাম" }
  slug            String    @unique
  description     String?
  descriptionLocalized Json? // { "bn": "বাংলা বর্ণনা" }
  shortDescription String?
  sku             String?   @unique
  price           Decimal   @db.Decimal(10, 2)
  compareAtPrice  Decimal?  @db.Decimal(10, 2)  // Original price for showing discounts
  costPrice       Decimal?  @db.Decimal(10, 2)  // Cost for profit calculation
  stock           Int       @default(0)
  lowStockThreshold Int     @default(5)
  trackInventory  Boolean   @default(true)
  weight          Decimal?  @db.Decimal(10, 3)  // In kg
  status          ProductStatus @default(DRAFT)
  isFeatured      Boolean   @default(false)
  metaTitle       String?
  metaDescription String?
  tags            String[]  // PostgreSQL array
  featureData     Json?     // Feature pack data (e.g., size guide, ingredients)
  sortOrder       Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  categories      ProductCategory[]
  images          ProductImage[]
  variants        ProductVariant[]
  reviews         Review[]
  wishlistItems   WishlistItem[]
  cartItems       CartItem[]
  orderItems      OrderItem[]

  @@index([status, isFeatured])
  @@index([createdAt])
}

model ProductCategory {
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([productId, categoryId])
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  alt       String?
  sortOrder Int     @default(0)
  isDefault Boolean @default(false)
}

model ProductVariant {
  id         String  @id @default(cuid())
  productId  String
  product    Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  name       String  // e.g., "Red / XL"
  sku        String? @unique
  price      Decimal @db.Decimal(10, 2)
  stock      Int     @default(0)
  attributes Json    // { color: "Red", size: "XL" }
  isActive   Boolean @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  cartItems  CartItem[]
  orderItems OrderItem[]
}

enum ProductStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}
```

### Orders & Cart

> **Cart Strategy: Client-Side First**
>
> The cart is stored in **localStorage** on the client. No login required to
> add items to cart. This is critical for Bangladesh ecommerce where customers
> browse → add to cart → create account only at checkout.
>
> - **Guest users:** Cart lives in localStorage only. No server round-trips.
> - **Logged-in users:** Cart syncs to DB via `CartItem` model. On login,
>   localStorage cart merges with any existing DB cart.
> - **Checkout:** Guest users provide shipping info inline (no saved address).
>   Logged-in users can pick a saved address.

```prisma
// Server-side cart — only for logged-in users (synced from localStorage)
model CartItem {
  id         String          @id @default(cuid())
  userId     String
  user       User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId  String
  product    Product         @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantId  String?
  variant    ProductVariant? @relation(fields: [variantId], references: [id])
  quantity   Int             @default(1)
  createdAt  DateTime        @default(now())
  updatedAt  DateTime        @updatedAt

  @@unique([userId, productId, variantId])
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique  // e.g., "MC-20260001"
  userId          String?     // Nullable — guest orders have no userId
  user            User?       @relation(fields: [userId], references: [id])
  guestEmail      String?     // For guest checkout
  guestPhone      String?     // For guest checkout
  // Shipping snapshot — always stored on order (not a reference to Address)
  shippingName    String      // Recipient name
  shippingPhone   String      // Recipient phone
  shippingAddress String      // Full address text
  shippingDivision String?    // Division (for shipping zone calculation)
  shippingDistrict String?    // District
  shippingPostalCode String?  // Postal code
  addressId       String?     // Optional link to saved Address (logged-in users only)
  address         Address?    @relation(fields: [addressId], references: [id])
  status          OrderStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(UNPAID)
  paymentMethod   PaymentMethod
  paymentMode     PaymentMode   @default(MANUAL)  // MANUAL or AUTOMATIC
  paymentDetails  Json?       // { senderNumber, transactionId, screenshot } for manual; { tran_id, card_type } for automatic
  subtotal        Decimal     @db.Decimal(10, 2)
  shippingCost    Decimal     @db.Decimal(10, 2) @default(0)
  discount        Decimal     @db.Decimal(10, 2) @default(0)
  tax             Decimal     @db.Decimal(10, 2) @default(0)
  total           Decimal     @db.Decimal(10, 2)
  couponId        String?
  coupon          Coupon?     @relation(fields: [couponId], references: [id])
  notes           String?
  cancelReason    String?
  shippedAt       DateTime?
  deliveredAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  items           OrderItem[]

  @@index([userId])
  @@index([status, paymentStatus])
  @@index([orderNumber])
  @@index([createdAt])
}

model OrderItem {
  id          String          @id @default(cuid())
  orderId     String
  order       Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product         @relation(fields: [productId], references: [id])
  variantId   String?
  variant     ProductVariant? @relation(fields: [variantId], references: [id])
  name        String          // Snapshot of product name at time of order
  sku         String?
  price       Decimal         @db.Decimal(10, 2)
  quantity    Int
  total       Decimal         @db.Decimal(10, 2)
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentStatus {
  UNPAID
  PENDING_VERIFICATION  // Manual mode: customer submitted payment info, admin hasn't verified yet
  PAID
  PARTIALLY_REFUNDED
  REFUNDED
  FAILED
}

enum PaymentMethod {
  BKASH_MANUAL    // Manual — customer sends to store's bKash, enters number + TxnID
  NAGAD_MANUAL    // Manual — customer sends to store's Nagad, enters number + TxnID
  BANK_TRANSFER   // Manual — customer transfers to bank, enters ref/TxnID
  COD             // Manual — cash on delivery
  SSLCOMMERZ      // Automatic — covers bKash, Nagad, cards, net banking via gateway
  BKASH_PGW       // Automatic — direct bKash PGW API integration
  NAGAD_PGW       // Automatic — direct Nagad PGW API integration
}

enum PaymentMode {
  MANUAL        // Customer pays outside, submits proof (number + TxnID), admin verifies
  AUTOMATIC     // Fully automated via SSLCommerz or direct gateway integration
}
```

### Coupons, Reviews, Wishlist

```prisma
model Coupon {
  id              String     @id @default(cuid())
  code            String     @unique
  description     String?
  type            CouponType
  value           Decimal    @db.Decimal(10, 2) // Amount or percentage
  minOrderAmount  Decimal?   @db.Decimal(10, 2)
  maxDiscount     Decimal?   @db.Decimal(10, 2) // Cap for percentage coupons
  usageLimit      Int?       // Total uses allowed
  usedCount       Int        @default(0)
  perUserLimit    Int        @default(1)
  isActive        Boolean    @default(true)
  startsAt        DateTime?
  expiresAt       DateTime?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  orders          Order[]
}

enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
  FREE_SHIPPING
}

model Review {
  id         String   @id @default(cuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  rating     Int      // 1–5
  title      String?
  comment    String?
  isApproved Boolean  @default(false) // Moderation
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([productId, userId]) // One review per product per user
  @@index([productId, isApproved])
}

model WishlistItem {
  id        String          @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantId String?         // Optional — wishlist a specific variant (e.g., "Red / XL")
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, productId, variantId])
}
```

### Blog (with Rich Text Editor)

```prisma
model BlogPost {
  id              String         @id @default(cuid())
  title           String
  titleLocalized  Json?          // { "bn": "বাংলা শিরোনাম" }
  slug            String         @unique
  excerpt         String?
  content         Json           // Tiptap JSON document (rich text)
  contentHtml     String?        // Pre-rendered HTML for storefront (generated from content JSON)
  coverImage      String?
  authorId        String
  author          User           @relation("author", fields: [authorId], references: [id])
  status          PostStatus     @default(DRAFT)
  isFeatured      Boolean        @default(false)
  metaTitle       String?
  metaDescription String?
  tags            String[]
  publishedAt     DateTime?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  categories      BlogPostCategory[]

  @@index([status, publishedAt])
}

model BlogCategory {
  id          String             @id @default(cuid())
  name        String
  nameLocalized Json?            // { "bn": "বাংলা নাম" }
  slug        String             @unique
  description String?
  sortOrder   Int                @default(0)
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  posts       BlogPostCategory[]
}

model BlogPostCategory {
  postId     String
  post       BlogPost     @relation(fields: [postId], references: [id], onDelete: Cascade)
  categoryId String
  category   BlogCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([postId, categoryId])
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

### Media Library

```prisma
model Media {
  id          String    @id @default(cuid())
  filename    String
  url         String
  cloudinaryId String?  // For Cloudinary management
  type        MediaType
  mimeType    String
  size        Int       // Bytes
  width       Int?
  height      Int?
  alt         String?
  folder      String    @default("general")
  uploadedBy  String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum MediaType {
  IMAGE
  VIDEO
  DOCUMENT
}
```

### Configuration Tables

```prisma
model SiteConfig {
  id              String   @id @default(cuid())
  siteName        String   @default("My Store")
  tagline         String?
  defaultLanguage String   @default("en")      // "en" = English (default)
  enabledLanguages String[] @default(["en", "bn"]) // Bilingual: English + Bangla
  currency        String   @default("BDT")
  currencySymbol  String   @default("৳")
  timezone        String   @default("Asia/Dhaka")
  logo            String?
  logoDark        String?
  favicon         String?
  contactEmail    String?
  contactPhone    String?
  contactAddress  String?
  socialLinks     Json?    // { facebook, instagram, youtube, etc. }
  whatsappNumber  String?  // E.164 format e.g. "8801712345678" (no + or spaces)
  whatsappOrderTemplate String? // Custom message template (uses {{items}}, {{total}}, {{name}} tokens)
  updatedAt       DateTime @updatedAt
}

model ThemeConfig {
  id              String @id @default(cuid())
  presetName      String @default("default")
  customStyles    Json   // Full theme object (see Theme Engine section)
  updatedAt       DateTime @updatedAt
}

model PageLayout {
  id       String @id @default(cuid())
  slug     String @unique   // "homepage", "about", "contact", etc.
  title    String
  isActive Boolean @default(true)
  sections Json   // Array of SectionConfig objects
  metaTitle       String?
  metaDescription String?
  updatedAt DateTime @updatedAt
}

// Stores the structure: { sectionType, order, props, isVisible }

model NavigationConfig {
  id         String @id @default(cuid())
  location   String @unique // "header", "footer", "mobile"
  items      Json   // Nested menu items
  settings   Json?  // Style settings for this nav location
  updatedAt  DateTime @updatedAt
}

model FooterConfig {
  id                    String   @id @default(cuid())
  columns               Json     // Array of { title, links[] }
  copyright             String?
  showPaymentIcons      Boolean  @default(true)
  showSocialIcons       Boolean  @default(true)
  showMotionBiteCredit  Boolean  @default(true)   // "Design & Developed by MotionBite" credit
  motionBiteCreditText  String   @default("Design & Developed by MotionBite") // Customizable label
  updatedAt             DateTime @updatedAt
}

model SeoConfig {
  id               String  @id @default(cuid())
  defaultMetaTitle String?
  defaultMetaDesc  String?
  ogImage          String?
  googleAnalyticsId String?
  googleSearchConsole String?
  robotsTxt        String?
  customHeadCode   String? // Custom scripts in <head>
  updatedAt        DateTime @updatedAt
}

model FeatureFlags {
  id        String  @id @default(cuid())
  flags     Json    // { blog: true, wishlist: true, reviews: false, ... }
  updatedAt DateTime @updatedAt
}

model StoreConfig {
  id              String @id @default(cuid())
  shippingConfig  Json   // Zones, rates, free shipping threshold
  paymentConfig   Json   // { mode, enabledMethods, credentials (encrypted) } — SINGLE SOURCE OF TRUTH for payment settings
  taxConfig       Json   // Tax rate, included in price or not
  orderConfig     Json   // Min order amount, order number prefix
  emailConfig     Json   // Resend API key, from address, templates
  updatedAt       DateTime @updatedAt
}

// Client-managed MFS numbers and bank account details
// Edited from Dashboard → /payment-info by CLIENT_ADMIN
model PaymentInfo {
  id              String   @id @default(cuid())
  bkashNumber     String?
  bkashAccountType String?  // "personal" | "merchant"
  nagadNumber     String?
  bankName        String?
  bankAccountName String?
  bankAccountNo   String?
  bankBranch      String?
  bankRoutingNo   String?
  updatedAt       DateTime @updatedAt
}

// Platform metadata — tracks MotionBite builder version
model PlatformMeta {
  id              String   @id @default(cuid())
  platformName    String   @default("MotionBite")
  platformVersion String   @default("1.0.0")  // Semantic versioning
  codebaseVersion String   @default("1.0.0")  // Master repo version at clone time
  clonedAt        DateTime @default(now())     // When this instance was cloned
  lastUpdatedAt   DateTime @updatedAt
}
```

### Static Pages

```prisma
model Page {
  id              String     @id @default(cuid())
  title           String
  titleLocalized  Json?      // { "bn": "বাংলা শিরোনাম" }
  slug            String     @unique
  content         Json       // Tiptap JSON document (rich text)
  contentHtml     String?    // Pre-rendered HTML
  isActive        Boolean    @default(true)
  metaTitle       String?
  metaDescription String?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
}
```

---

## 11. API Design

All endpoints follow RESTful conventions. Authentication is required
unless marked `[Public]`.

### Authentication

| Method | Endpoint                 | Access    | Description              |
| ------ | ------------------------ | --------- | ------------------------ |
| POST   | `/api/auth/register`     | [Public]  | Customer registration    |
| POST   | `/api/auth/login`        | [Public]  | Login (credentials)      |
| GET    | `/api/auth/session`      | [Public]  | Get current session (NextAuth) |
| POST   | `/api/auth/signout`      | Auth      | Sign out                 |
| POST   | `/api/auth/forgot-password` | [Public] | Send reset email      |
| POST   | `/api/auth/reset-password`  | [Public] | Reset with token      |
| GET    | `/api/auth/me`           | Auth      | Current user profile     |
| PATCH  | `/api/auth/me`           | Auth      | Update profile           |
| —      | `/api/auth/callback/google` | [Public] | Google OAuth callback (NextAuth managed) |

> **Note:** NextAuth.js manages `/api/auth/*` routes automatically.
> Custom endpoints like `/me`, `/forgot-password`, `/reset-password` are
> added alongside the NextAuth route handler.

### Products

| Method | Endpoint                       | Access       | Description            |
| ------ | ------------------------------ | ------------ | ---------------------- |
| GET    | `/api/products`                | [Public]     | List (with filters, pagination, search) |
| GET    | `/api/products/:slug`          | [Public]     | Single product         |
| POST   | `/api/products`                | Staff+       | Create product         |
| PATCH  | `/api/products/:id`            | Staff+       | Update product         |
| DELETE | `/api/products/:id`            | Staff+       | Delete product         |
| POST   | `/api/products/:id/images`     | Staff+       | Upload images          |
| DELETE | `/api/products/:id/images/:imgId` | Staff+   | Delete image           |
| POST   | `/api/products/:id/variants`   | Staff+       | Add variant            |
| PATCH  | `/api/products/:id/variants/:vid` | Staff+   | Update variant         |
| DELETE | `/api/products/:id/variants/:vid` | Staff+   | Delete variant         |

### Categories

| Method | Endpoint                  | Access   | Description              |
| ------ | ------------------------- | -------- | ------------------------ |
| GET    | `/api/categories`         | [Public] | List (tree structure)    |
| GET    | `/api/categories/:slug`   | [Public] | Single with products     |
| POST   | `/api/categories`         | Staff+   | Create                   |
| PATCH  | `/api/categories/:id`     | Staff+   | Update                   |
| DELETE | `/api/categories/:id`     | Staff+   | Delete                   |

### Orders

| Method | Endpoint                       | Access       | Description            |
| ------ | ------------------------------ | ------------ | ---------------------- |
| GET    | `/api/orders`                  | Staff+       | List all orders        |
| GET    | `/api/orders/my`               | Customer     | Customer's orders      |
| GET    | `/api/orders/:id`              | Owner/Staff+ | Single order           |
| POST   | `/api/orders`                  | Customer     | Place order            |
| PATCH  | `/api/orders/:id/status`       | Staff+       | Update order status    |
| PATCH  | `/api/orders/:id/payment`      | Staff+       | Update payment status  |
| POST   | `/api/orders/:id/cancel`       | Owner/Staff+ | Cancel order           |

### Cart (Server-Side Sync — Logged-In Users Only)

> **Note:** The primary cart lives in **localStorage** (client-side). These
> API endpoints are only used to **sync** the cart for logged-in users.
> Guest users never hit these endpoints.

| Method | Endpoint                  | Access   | Description              |
| ------ | ------------------------- | -------- | ------------------------ |
| GET    | `/api/cart`               | Auth     | Get server-side cart (for logged-in sync) |
| POST   | `/api/cart/sync`          | Auth     | Sync localStorage cart → DB (on login/merge) |
| DELETE | `/api/cart`               | Auth     | Clear server-side cart   |

### Customers

| Method | Endpoint                  | Access       | Description            |
| ------ | ------------------------- | ------------ | ---------------------- |
| GET    | `/api/customers`          | Staff+       | List customers         |
| GET    | `/api/customers/:id`      | Staff+       | Customer details       |
| PATCH  | `/api/customers/:id`      | ClientAdmin+ | Update customer        |

### Reviews

| Method | Endpoint                        | Access       | Description          |
| ------ | ------------------------------- | ------------ | -------------------- |
| GET    | `/api/products/:id/reviews`     | [Public]     | Product reviews      |
| POST   | `/api/products/:id/reviews`     | Customer     | Add review           |
| PATCH  | `/api/reviews/:id/approve`      | Staff+       | Approve review       |
| DELETE | `/api/reviews/:id`              | Owner/Staff+ | Delete review        |

### Coupons

| Method | Endpoint                  | Access       | Description            |
| ------ | ------------------------- | ------------ | ---------------------- |
| GET    | `/api/coupons`            | Staff+       | List coupons           |
| POST   | `/api/coupons`            | Staff+       | Create coupon          |
| PATCH  | `/api/coupons/:id`        | Staff+       | Update coupon          |
| DELETE | `/api/coupons/:id`        | Staff+       | Delete coupon          |
| POST   | `/api/coupons/validate`   | Auth         | Validate coupon code   |

### Blog

| Method | Endpoint                  | Access       | Description            |
| ------ | ------------------------- | ------------ | ---------------------- |
| GET    | `/api/blog`               | [Public]     | List posts             |
| GET    | `/api/blog/:slug`         | [Public]     | Single post            |
| POST   | `/api/blog`               | Staff+       | Create post            |
| PATCH  | `/api/blog/:id`           | Staff+       | Update post            |
| DELETE | `/api/blog/:id`           | Staff+       | Delete post            |

### Media

| Method | Endpoint                  | Access       | Description            |
| ------ | ------------------------- | ------------ | ---------------------- |
| GET    | `/api/media`              | Staff+       | List media files       |
| POST   | `/api/media/upload`       | Staff+       | Upload to Cloudinary   |
| DELETE | `/api/media/:id`          | Staff+       | Delete media           |

### Configuration (Project Builder + Dashboard)

| Method | Endpoint                  | Access       | Description            |
| ------ | ------------------------- | ------------ | ---------------------- |
| GET    | `/api/config/site`        | ClientAdmin+ | Get site config (all fields) |
| PATCH  | `/api/config/site`        | ClientAdmin+ | Update site config (ClientAdmin can only update: logo, logoDark, favicon, contactEmail, contactPhone, contactAddress, socialLinks. Agency can update all fields.) |
| GET    | `/api/config/theme`       | Agency+      | Get theme config       |
| PATCH  | `/api/config/theme`       | Agency+      | Update theme config    |
| GET    | `/api/config/pages`       | Agency+      | Get all page layouts   |
| GET    | `/api/config/pages/:slug` | Agency+      | Get page layout        |
| PATCH  | `/api/config/pages/:slug` | Agency+      | Update page layout     |
| GET    | `/api/config/navigation`  | Agency+      | Get navigation config  |
| PATCH  | `/api/config/navigation`  | Agency+      | Update navigation      |
| GET    | `/api/config/footer`      | Agency+      | Get footer config      |
| PATCH  | `/api/config/footer`      | Agency+      | Update footer          |
| GET    | `/api/config/seo`         | Agency+      | Get SEO config         |
| PATCH  | `/api/config/seo`         | Agency+      | Update SEO config      |
| GET    | `/api/config/features`    | Agency+      | Get feature flags      |
| PATCH  | `/api/config/features`    | Agency+      | Toggle features        |
| GET    | `/api/config/store`       | Agency+      | Get store config       |
| PATCH  | `/api/config/store`       | Agency+      | Update store config    |
| GET    | `/api/config/platform`    | Agency+      | Get platform meta      |
| GET    | `/api/config/payment-info`| ClientAdmin+ | Get MFS/bank details   |
| PATCH  | `/api/config/payment-info`| ClientAdmin+ | Update MFS/bank details |

### Payments (Dual Mode)

| Method | Endpoint                             | Access   | Description                |
| ------ | ------------------------------------ | -------- | -------------------------- |
| POST   | `/api/payments/sslcommerz/create`    | Auth     | Create SSLCommerz session  |
| POST   | `/api/payments/sslcommerz/ipn`       | [Public] | SSLCommerz IPN webhook     |
| POST   | `/api/payments/sslcommerz/success`   | [Public] | SSLCommerz success redirect|
| POST   | `/api/payments/sslcommerz/fail`      | [Public] | SSLCommerz fail redirect   |
| POST   | `/api/payments/sslcommerz/cancel`    | [Public] | SSLCommerz cancel redirect |
| POST   | `/api/payments/bkash/create`         | Auth     | Create bKash payment       |
| POST   | `/api/payments/bkash/callback`       | [Public] | bKash webhook              |
| POST   | `/api/payments/nagad/create`         | Auth     | Create Nagad payment       |
| POST   | `/api/payments/nagad/callback`       | [Public] | Nagad webhook              |

### Search

| Method | Endpoint                  | Access       | Description            |
| ------ | ------------------------- | ------------ | ---------------------- |
| GET    | `/api/search?q=`          | [Public]     | Search products        |

### Revalidation (Internal)

| Method | Endpoint                        | Access       | Description            |
| ------ | ------------------------------- | ------------ | ---------------------- |
| POST   | `/api/revalidate`               | Internal     | Trigger on-demand revalidation by tag |

### Storefront Data (Public)

| Method | Endpoint                        | Access   | Description            |
| ------ | ------------------------------- | -------- | ---------------------- |
| GET    | `/api/storefront/config`        | [Public] | Site + theme + nav (combined, cached) |
| GET    | `/api/storefront/homepage`      | [Public] | Homepage layout        |
| GET    | `/api/storefront/page/:slug`    | [Public] | Static page content    |

---

## 12. Theme Engine

### How It Works

1. Theme configuration is stored in `ThemeConfig` (JSON column).
2. On page load, the storefront reads theme config and generates CSS
   custom properties (variables).
3. All components use these CSS variables — never hardcoded colors/fonts.
4. Changing the theme config instantly changes the entire site appearance
   (via on-demand revalidation).

### Theme Config Structure

```json
{
  "colors": {
    "primary": "#E85D3A",
    "primaryLight": "#FF8A65",
    "primaryDark": "#BF360C",
    "secondary": "#1A237E",
    "accent": "#FFC107",
    "background": "#FFFFFF",
    "surface": "#F5F5F5",
    "text": "#212121",
    "textLight": "#757575",
    "border": "#E0E0E0",
    "success": "#4CAF50",
    "warning": "#FF9800",
    "error": "#F44336",
    "info": "#2196F3"
  },
  "fonts": {
    "heading": "Inter",
    "body": "Inter",
    "accent": "Inter",
    "bengali": "Noto Sans Bengali",
    "arabic": "Noto Sans Arabic"
  },
  "borderRadius": {
    "small": "4px",
    "medium": "8px",
    "large": "16px",
    "full": "9999px"
  },
  "shadows": {
    "small": "0 1px 3px rgba(0,0,0,0.12)",
    "medium": "0 4px 6px rgba(0,0,0,0.1)",
    "large": "0 10px 25px rgba(0,0,0,0.1)"
  },
  "layout": {
    "maxWidth": "1280px",
    "headerStyle": "standard",
    "footerStyle": "standard"
  },
  "buttons": {
    "borderRadius": "8px",
    "fontSize": "14px",
    "paddingX": "24px",
    "paddingY": "12px"
  },
  "mobile": {
    "headerStyle": "sticky",
    "bottomNavEnabled": true,
    "swipeGesturesEnabled": true,
    "touchTargetMinSize": "44px"
  }
}
```

### CSS Variable Generation

```css
/* Generated dynamically from ThemeConfig */
:root {
  --color-primary: #E85D3A;
  --color-primary-light: #FF8A65;
  --color-primary-dark: #BF360C;
  --color-secondary: #1A237E;
  --color-accent: #FFC107;
  --color-bg: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-text: #212121;
  --color-text-light: #757575;
  --color-border: #E0E0E0;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-bengali: 'Noto Sans Bengali', sans-serif;
  --font-arabic: 'Noto Sans Arabic', sans-serif;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --layout-max-width: 1280px;
  --touch-target-min: 44px;
  /* ... etc */
}
```

### Theme Presets

Pre-built theme presets for quick setup:

| Preset        | Target Industry | Primary Color | Font Family       |
| ------------- | --------------- | ------------- | ----------------- |
| `default`     | General         | #E85D3A       | Inter             |
| `fashion`     | Fashion         | #000000       | Playfair Display  |
| `beauty`      | Beauty          | #E91E63       | Cormorant Garamond|
| `electronics` | Electronics     | #1565C0       | Inter             |
| `grocery`     | Food/Grocery    | #2E7D32       | Poppins           |
| `kids`        | Kids            | #FF6F00       | Nunito            |
| `books`       | Books           | #5D4037       | Merriweather      |
| `minimal`     | Any             | #333333       | Inter             |

---

## 13. Section Library & Homepage Builder

### Section Architecture

Each section is a self-contained React component registered in a
**Section Registry**.

```text
Section Registry (config/sections/registry.ts)
    ↓
Maps sectionType string → { component, schema, defaultProps, thumbnail }
    ↓
Builder reads registry → shows available sections
    ↓
Storefront reads PageLayout → renders sections in order
```

### Section Schema (Example: Hero Section)

```typescript
// config/sections/hero.schema.ts
export const heroSchema = {
  type: "hero",
  name: "Hero Banner",
  description: "Full-width hero section with image, heading, and CTA",
  thumbnail: "/sections/hero-thumb.png",
  category: "banner",
  props: {
    heading: { type: "text", label: "Heading", default: "Welcome to our store", localizable: true },
    subheading: { type: "text", label: "Subheading", default: "", localizable: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
    ctaText: { type: "text", label: "Button Text", default: "Shop Now", localizable: true },
    ctaLink: { type: "url", label: "Button Link", default: "/products" },
    overlay: { type: "boolean", label: "Dark Overlay", default: true },
    overlayOpacity: { type: "range", label: "Overlay Opacity", min: 0, max: 100, default: 40 },
    textAlign: { type: "select", label: "Text Alignment", options: ["left", "center", "right"], default: "center" },
    height: { type: "select", label: "Height", options: ["small", "medium", "large", "full"], default: "large" },
    mobileHeight: { type: "select", label: "Mobile Height", options: ["small", "medium", "large", "full"], default: "medium" }
  }
}

// Props with localizable: true are stored with localized variants:
// { heading: "Welcome", headingLocalized: { "bn": "স্বাগতম" } }
```

### Section Library (Initial Set)

| Section          | Category   | Description                              |
| ---------------- | ---------- | ---------------------------------------- |
| Hero             | Banner     | Full-width hero with image + CTA         |
| Slider Banner    | Banner     | Multi-slide carousel banner              |
| Split Banner     | Banner     | Two-column image + text                  |
| Product Grid     | Products   | Grid of featured/filtered products       |
| Product Slider   | Products   | Horizontal scrolling product carousel    |
| Category Grid    | Navigation | Grid of category cards                   |
| Category Slider  | Navigation | Horizontal scrolling categories          |
| Brand Slider     | Navigation | Brand/partner logo carousel              |
| Testimonials     | Social     | Customer testimonial cards               |
| FAQ              | Content    | Expandable FAQ accordion                 |
| Newsletter       | Marketing  | Email subscription form                  |
| Video            | Content    | Embedded video section                   |
| Text Block       | Content    | Rich text content area                   |
| Image Gallery    | Content    | Grid of images                           |
| Countdown Timer  | Marketing  | Sale countdown timer                     |
| Feature Grid     | Content    | Icon + text feature highlights           |
| Blog Preview     | Content    | Latest blog posts preview                |
| Spacer           | Layout     | Adjustable empty space                   |
| Divider          | Layout     | Horizontal line divider                  |

### Homepage Builder UI

The builder provides:

1. **Section Picker** — Browse available sections by category, click to add
2. **Section List** — Drag-and-drop reorder of active sections
3. **Section Editor** — Form-based prop editor for selected section
4. **Live Preview** — iframe showing the actual storefront rendering
5. **Visibility Toggle** — Show/hide sections without deleting
6. **Duplicate** — Clone a section with its configuration
7. **Delete** — Remove a section

### PageLayout Storage Format

```json
{
  "slug": "homepage",
  "title": "Homepage",
  "sections": [
    {
      "id": "sec_abc123",
      "type": "hero",
      "order": 1,
      "isVisible": true,
      "props": {
        "heading": "Welcome to Our Store",
        "subheading": "Best Products, Best Prices",
        "backgroundImage": "https://res.cloudinary.com/...",
        "ctaText": "Shop Now",
        "ctaLink": "/products",
        "overlay": true,
        "overlayOpacity": 40,
        "textAlign": "center",
        "height": "large",
        "mobileHeight": "medium"
      }
    },
    {
      "id": "sec_def456",
      "type": "product-grid",
      "order": 2,
      "isVisible": true,
      "props": {
        "heading": "Featured Products",
        "columns": 4,
        "mobileColumns": 2,
        "limit": 8,
        "filter": "featured",
        "showPrice": true,
        "showRating": true
      }
    }
  ]
}
```

---

## 14. Feature Packs

### Architecture

Feature packs are modular capabilities that can be toggled on/off via the
`FeatureFlags` config. The system uses a **Feature Registry** pattern.

```typescript
// features/registry.ts
export const featureRegistry = {
  blog:       { name: "Blog",        icon: "FileText",  default: true  },
  wishlist:   { name: "Wishlist",    icon: "Heart",     default: true  },
  reviews:    { name: "Reviews",     icon: "Star",      default: true  },
  compare:    { name: "Compare",     icon: "ArrowLeftRight", default: false },
  coupons:    { name: "Coupons",     icon: "Ticket",    default: true  },
  flashSale:  { name: "Flash Sale",  icon: "Zap",       default: false },
  loyalty:    { name: "Loyalty",     icon: "Award",     default: false },
  inventory:  { name: "Inventory Alerts", icon: "Package", default: true },
  googleAuth: { name: "Google Sign-In",   icon: "Chrome",  default: true },
  whatsappOrders: { name: "WhatsApp Orders", icon: "MessageCircle", default: false },
  // ^ Secondary channel: customer taps a button to send their cart as a
  //   WhatsApp message. Zero DB writes. Ideal for COD/manual-payment clients.
} as const;
```

### How Feature Flags Work

```typescript
// hooks/useFeature.ts — CLIENT-SIDE (for "use client" components)
export function useFeature(featureName: string): boolean {
  const features = useFeatureFlags(); // Loaded from context provider
  return features[featureName] ?? false;
}

// lib/features.ts — SERVER-SIDE (for Server Components + API routes)
import { getFeatureFlags } from "@/lib/config";
export async function getFeature(featureName: string): Promise<boolean> {
  const flags = await getFeatureFlags(); // Reads from cache with tags
  return flags[featureName] ?? false;
}

// Usage in Server Component (storefront page)
async function ProductPage() {
  const showReviews = await getFeature("reviews");
  const showWishlist = await getFeature("wishlist");

  return (
    <div>
      <ProductDetails />
      {showWishlist && <WishlistButton />}  {/* "use client" component */}
      {showReviews && <ReviewsSection />}
    </div>
  );
}

// Usage in Client Component
"use client";
function AddToWishlistButton() {
  const enabled = useFeature("wishlist");
  if (!enabled) return null;
  return <button>♡ Add to Wishlist</button>;
}
```

### Industry Feature Packs

In addition to core feature flags, industry-specific features are handled
via the `featureData` JSON field on the Product model:

| Industry    | Features                                         |
| ----------- | ------------------------------------------------ |
| Fashion     | Size Guide, Color Swatches, Lookbook             |
| Beauty      | Ingredients, Shade Selector, Skin Type           |
| Electronics | Specifications Table, Warranty Info, Comparison  |
| Automotive  | Vehicle Compatibility, Parts Finder              |
| Books       | ISBN, Author, Publisher, Page Count               |
| Food        | Nutrition Facts, Allergens, Expiry Date          |

These are configured per-product through the Dashboard product editor.

---

## 15. Project Builder (Internal) — MotionBite Branded

Accessible at `/builder`. Requires `SUPER_ADMIN` or `AGENCY_STAFF` role.

### MotionBite Branding & Versioning

The Project Builder UI carries **MotionBite branding** with a visible
version number, making it easy to identify which version of the platform
a client site is running on.

```text
┌────────────────────────────────────────────────────┐
│  🚀 MotionBite Project Builder       v1.2.0       │
│                                                     │
│  Powered by MotionCommerce                          │
│  Platform: MotionBite v1.2.0 • Codebase: v1.2.0   │
└────────────────────────────────────────────────────┘
```

**Version tracking:**

- `platformVersion` in `PlatformMeta` table — updated when the builder UI
  receives new features
- `codebaseVersion` — the master repo version at the time of cloning
- Both displayed in the builder sidebar footer and the `/builder/project` screen
- Allows the agency to quickly identify: "This client site runs MotionBite v1.2.0"

### Builder Screens

```text
/builder
├── /project      → Project settings (name, client, language, currency, platform version)
├── /theme        → Theme preset selector + customizer
├── /branding     → Logo, favicon, contact info, social links (agency sets initial values; client can update anytime from Dashboard)
├── /homepage     → Drag-and-drop homepage builder
├── /pages        → Static pages manager (About, Contact, etc.)
├── /features     → Feature pack toggle switches
├── /navigation   → Header menu builder (with mega menu support)
├── /footer       → Footer column/link structure + MotionBite credit toggle (show/hide + custom label)
├── /seo          → Meta defaults, OG image, analytics, robots.txt
├── /store        → Shipping zones, tax, email
├── /payment      → Enable/disable payment modes (Manual/Automatic) + select methods + gateway API credentials
├── /language     → Language configuration (default + enabled languages)
├── /media        → Media library (Cloudinary browser)
├── /access       → Create/manage client accounts + permissions
└── /preview      → Full-page preview of storefront
```

### Builder UI Approach

- Built with **shadcn/ui** components (forms, tabs, dialogs, etc.)
- Sidebar navigation for sections
- **MotionBite logo + version number** in sidebar header
- Real-time form validation with **Zod**
- Changes saved via API calls to `/api/config/*` endpoints
- **On-demand revalidation** triggered after each config save
- "Preview" button opens the storefront in an iframe or new tab
- **Mobile-responsive builder UI** — usable on tablets for on-site setup

---

## 16. Client Dashboard

Accessible at `/dashboard`. Requires `CLIENT_ADMIN` or `CLIENT_STAFF` role.

### Dashboard Screens

```text
/dashboard
├── /                → Overview (recent orders, revenue, stats)
├── /products        → Product CRUD + variants + images
├── /categories      → Category tree management
├── /orders          → Order list + detail + status management
├── /customers       → Customer list + order history
├── /inventory       → Stock levels + low stock alerts
├── /coupons         → Coupon management
├── /reviews         → Review moderation (approve/reject)
├── /blog            → Blog post CRUD + categories (with Tiptap editor)
├── /media           → Media library
├── /pages           → Static page editor (content only, with Tiptap editor)
├── /homepage        → Homepage section content editing (not layout)
├── /navigation      → Menu item editing (within existing structure)
├── /footer          → Footer link text/URL editing (within existing column structure)
├── /seo             → Page-level SEO settings
├── /settings        → Store settings (shipping, email)
├── /branding        → Update logo, dark logo, favicon, contact info, social media links
└── /payment-info    → Update bKash/Nagad numbers + bank account details
```

### Key Difference: Builder vs. Dashboard

| Capability                                  | Builder (Agency) | Dashboard (Client) |
| ------------------------------------------- | ---------------- | ------------------ |
| Change theme/colors/fonts                   | ✅               | ❌                 |
| Add/remove homepage sections                | ✅               | ❌                 |
| Edit homepage section content               | ✅               | ✅                 |
| Toggle feature packs                        | ✅               | ❌                 |
| Enable/disable payment modes                | ✅               | ❌                 |
| Select available payment methods            | ✅               | ❌                 |
| Configure gateway API credentials           | ✅               | ❌                 |
| Update MFS numbers (bKash, Nagad)           | ❌               | ✅                 |
| Update bank account details                 | ❌               | ✅                 |
| Set initial logo / favicon                  | ✅               | ✅                 |
| Update logo, dark logo, favicon             | ✅               | ✅                 |
| Update contact info (email, phone, address) | ✅               | ✅                 |
| Update social media links                   | ✅               | ✅                 |
| Toggle MotionBite footer credit             | ✅               | ❌                 |
| Change language settings                    | ✅               | ❌                 |
| Manage products/orders                      | ✅               | ✅                 |
| Write/publish blog posts                    | ✅               | ✅                 |
| Create user accounts                        | ✅               | ✅ (limited)       |
| Change layout structure                     | ✅               | ❌                 |
| See platform version                        | ✅               | ❌                 |

---

## 17. Storefront Rendering (On-Demand Revalidation)

### Page Rendering Strategy

> **Key principle: Revalidate only when data changes, never on a timer.**
>
> After initial store setup, most clients don't modify anything for weeks.
> Timer-based revalidation (e.g., every 60 seconds) wastes serverless
> function invocations and database queries on Neon. On-demand revalidation
> is both faster (instant updates) and cheaper (zero cost when idle).

| Page Type      | Rendering Method | Cache Strategy                          |
| -------------- | ---------------- | --------------------------------------- |
| Homepage       | SSR + ISR        | Revalidate on config/content change (on-demand) |
| Product List   | SSR + ISR        | Revalidate on product create/update/delete (on-demand) |
| Product Detail | SSR + ISR        | Revalidate on product update (on-demand) |
| Category       | SSR + ISR        | Revalidate on category or product change (on-demand) |
| Blog           | SSR + ISR        | Revalidate on post publish/update (on-demand) |
| Static Pages   | SSR + ISR        | Revalidate on content update (on-demand) |
| Cart           | Client-side      | No cache (real-time)                    |
| Checkout       | Client-side      | No cache (real-time)                    |
| Account        | Client-side      | User-specific (no shared cache)         |
| Search         | SSR              | No cache (dynamic)                      |

### How On-Demand Revalidation Works

```text
── When Admin Updates Something ──

1. Admin saves product/config/blog post via Dashboard or Builder
2. API route processes the update and saves to database
3. API route calls revalidateTag() with relevant cache tags:
   - Product update → revalidateTag("products"), revalidateTag(`product-${slug}`)
   - Config change  → revalidateTag("site-config"), revalidateTag("theme")
   - Blog publish   → revalidateTag("blog"), revalidateTag(`blog-${slug}`)
   - Homepage edit  → revalidateTag("homepage")
4. Next.js marks cached pages with those tags as stale
5. Next visitor request triggers a fresh render
6. Fresh HTML is cached until the next data change

── When Nothing Changes ──

Nothing happens. No requests, no database queries, no serverless function
invocations. The cached HTML is served directly from Vercel's Edge CDN.

Cost: $0. Latency: ~0ms (CDN hit).
```

### Cache Tag Architecture

```typescript
// lib/cache-tags.ts
export const CacheTags = {
  SITE_CONFIG: "site-config",
  THEME: "theme",
  NAVIGATION: "navigation",
  FOOTER: "footer",
  SEO: "seo",
  FEATURES: "features",
  HOMEPAGE: "homepage",
  PRODUCTS: "products",
  PRODUCT: (slug: string) => `product-${slug}`,
  CATEGORIES: "categories",
  CATEGORY: (slug: string) => `category-${slug}`,
  BLOG: "blog",
  BLOG_POST: (slug: string) => `blog-${slug}`,
  PAGES: "pages",
  PAGE: (slug: string) => `page-${slug}`,
} as const;

// Example: After product update in product.service.ts
import { revalidateTag } from "next/cache";

async updateProduct(id: string, data: UpdateProductInput) {
  const product = await this.repository.update(id, data);
  
  // Instantly invalidate relevant caches
  revalidateTag(CacheTags.PRODUCTS);
  revalidateTag(CacheTags.PRODUCT(product.slug));
  revalidateTag(CacheTags.HOMEPAGE); // In case product is featured
  
  return product;
}
```

### Storefront Route Structure

```text
/ (storefront)
├── /                          → Homepage (config-driven sections)
├── /products                  → Product listing (filterable)
├── /products/:slug            → Product detail page
├── /categories                → All categories
├── /categories/:slug          → Category with products
├── /cart                      → Shopping cart
├── /checkout                  → Checkout flow
├── /account                   → Customer account
│   ├── /orders                → Order history
│   ├── /wishlist              → Wishlist
│   ├── /addresses             → Saved addresses
│   └── /settings              → Profile settings
├── /blog                      → Blog listing
├── /blog/:slug                → Blog post
├── /search?q=                 → Search results
├── /pages/:slug               → Static pages (about, contact, etc.)
├── /login                     → Customer login (credentials + Google)
├── /register                  → Customer registration (credentials + Google)
└── /forgot-password           → Password reset
```

---

## 18. Multi-Language & Currency (Bilingual by Default)

### Language Strategy

| Priority | Language | Code | Status | Notes |
| -------- | -------- | ---- | ------ | ----- |
| Default  | **English** | `en` | ✅ Included | Default UI language for all sites |
| Bilingual | **Bangla** | `bn` | ✅ Included | Second language, configurable per site |
| Future   | **Arabic** | `ar` | 🔜 Planned | Requires RTL layout support |
| Future   | Others   | —    | 🔜 Planned | Extensible via locale files |

### How Bilingual Works

```text
/locales
├── en.json    → English UI translations (default)
├── bn.json    → Bangla UI translations
└── ar.json    → Arabic UI translations (future)
```

**UI labels** (buttons, headings, form labels, navigation text) are translated
via **next-intl** using the locale files above.

**Content** (product names, descriptions, blog posts) uses the `nameLocalized`
and `descriptionLocalized` JSON fields on each model:

```json
{
  "name": "Red Cotton T-Shirt",
  "nameLocalized": {
    "bn": "লাল সুতি টি-শার্ট"
  },
  "description": "Premium quality cotton t-shirt...",
  "descriptionLocalized": {
    "bn": "প্রিমিয়াম মানের সুতি টি-শার্ট..."
  }
}
```

### Language Selection

- **Site default language** configured in `SiteConfig.defaultLanguage`
- **Enabled languages** configured in `SiteConfig.enabledLanguages`
- Language switcher shown in header when multiple languages are enabled
- URL-based locale switching: `/en/products`, `/bn/products`
- User preference saved in cookie for return visits

> **⚠️ Middleware Configuration (Critical)**
>
> The `next-intl` middleware must be configured to **skip** non-storefront
> routes. Without this, it will try to add locale prefixes to `/dashboard`,
> `/builder`, and `/api` routes, breaking the entire admin panel.
>
> ```typescript
> // middleware.ts
> export const config = {
>   matcher: ['/((?!api|dashboard|builder|_next|.*\\..*).*)']
> };
> ```

### Font Strategy for Multi-Language

```css
/* English + general UI */
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;

/* Bangla content */
--font-bengali: 'Noto Sans Bengali', sans-serif;

/* Arabic content (future) */
--font-arabic: 'Noto Sans Arabic', sans-serif;
```

The system dynamically applies the correct font family based on the active
locale. Bengali text automatically uses `Noto Sans Bengali`, Arabic uses
`Noto Sans Arabic`, and English uses `Inter`.

### Phase 2 (Future — International)

- Multi-currency support with exchange rate config
- RTL (Right-to-Left) layout support for Arabic
- Additional locale files for new languages
- Automatic text direction detection

---

## 19. Payment Integration (Dual Mode System)

### Payment Mode Concept

MotionCommerce supports **two payment modes**, configurable per client via
the **Project Builder UI**:

| Mode | How It Works | Target Client | Available Methods |
| ---- | ------------ | ------------- | ----------------- |
| **Manual** | Customer pays outside the system (sends money via bKash/Nagad/Bank), then enters their **payment number + transaction ID** in the checkout form. Admin **manually verifies** in Dashboard. | Budget clients who don't want to pay gateway integration fees | bKash (manual), Nagad (manual), Bank Transfer, COD |
| **Automatic** | Customer clicks "Pay Now", chooses a payment medium (bKash, Nagad, Card, etc.), and payment is **fully processed automatically** through the gateway. No manual verification needed. | Clients with budget for gateway per-transaction fees | SSLCommerz (all methods), Direct bKash PGW, Direct Nagad PGW |

> **The payment mode is a per-client configuration set in the Project Builder.**
> Clients who can afford gateway integration fees get Automatic mode.
> Clients who want a simpler/cheaper setup get Manual mode.
> A client can have **both modes enabled** — the customer chooses at checkout.

### Payment Mode Configuration (in Project Builder — Agency Only)

The Project Builder controls **which payment modes and methods are available**
for the client's store. It also holds gateway API credentials for automatic
payment integrations. It does **not** manage bKash/Nagad numbers or bank
account details — that's the client's responsibility via the Dashboard.

```text
/builder/payment screen:
┌──────────────────────────────────────────────────────────────┐
│  💳 Payment Configuration (Agency)                           │
│                                                               │
│  Payment Mode:                                                │
│  ☑ Manual (Customer pays & submits proof, admin verifies)     │
│  ☑ Automatic (Fully automated online payment)                 │
│                                                               │
│  ══ Manual Payment Methods ══                                 │
│  ☑ bKash (Manual)                                             │
│  ☑ Nagad (Manual)                                             │
│  ☑ Bank Transfer                                              │
│  ☑ Cash on Delivery (COD)                                     │
│                                                               │
│  ══ Automatic Payment Methods ══                              │
│  ☑ SSLCommerz (bKash + Nagad + Cards + Net Banking)           │
│    Store ID:     [________________]                           │
│    Store Pass:   [________________]                           │
│    Mode:         ○ Sandbox  ○ Live                            │
│  ☐ Direct bKash PGW                                           │
│    App Key:      [________________]                           │
│    App Secret:   [________________]                           │
│  ☐ Direct Nagad PGW                                           │
│    Merchant ID:  [________________]                           │
│    Merchant No:  [________________]                           │
│                                                               │
│  ⓘ MFS numbers and bank details are managed by the client    │
│    from their Dashboard → Payment Info page.                  │
│                                                               │
│  [Save Configuration]                                         │
└──────────────────────────────────────────────────────────────┘
```

### Payment Info Management (in Client Dashboard)

The client manages their own **receiving account details** from the
Dashboard. These are the numbers/accounts that customers will send money to.

```text
/dashboard/payment-info screen:
┌──────────────────────────────────────────────────────────────┐
│  💰 Payment Receiving Info                                    │
│                                                               │
│  Update the numbers and accounts where customers will         │
│  send their payments.                                         │
│                                                               │
│  ── bKash ──                                                  │
│  bKash Number:  [01XXXXXXXXX________]                         │
│  Account Type:  ○ Personal  ○ Merchant                        │
│                                                               │
│  ── Nagad ──                                                  │
│  Nagad Number:  [01XXXXXXXXX________]                         │
│                                                               │
│  ── Bank Account ──                                           │
│  Bank Name:     [________________]                            │
│  Account Name:  [________________]                            │
│  Account No:    [________________]                            │
│  Branch:        [________________]                            │
│  Routing No:    [________________]                            │
│                                                               │
│  [Save]                                                       │
└──────────────────────────────────────────────────────────────┘
```

> **Why this split?**
>
> - **Agency (Builder)** decides the payment strategy: which modes and methods
>   to offer based on client requirements and budget.
> - **Client (Dashboard)** owns their financial details: bKash numbers, bank
>   accounts. They can update these anytime without contacting the agency
>   (e.g., if they change their bKash merchant number).
> - Gateway API credentials (SSLCommerz Store ID, bKash App Key) stay in the
>   Builder because they require technical setup.

### Provider Adapter Pattern

```typescript
// lib/payments/types.ts
interface PaymentProvider {
  name: string;
  mode: "manual" | "automatic";
  createPayment(order: Order): Promise<PaymentResponse>;
  verifyPayment(payload: any): Promise<VerificationResult>;
  refundPayment?(transactionId: string, amount: number): Promise<RefundResult>;
}
```

### Manual Mode — How It Works

In Manual mode, the customer makes the payment **outside** the system and
then **submits proof** through the checkout form. The admin verifies it
manually in the Dashboard.

#### bKash / Nagad Manual Flow

```text
1. Customer selects "Pay with bKash" (or Nagad) at checkout
2. System shows the store's bKash/Nagad number:
   ┌──────────────────────────────────────────┐
   │  Send ৳1,500 to this bKash number:      │
   │  📱 01XXXXXXXXX (Personal/Merchant)      │
   │                                          │
   │  After sending, fill in below:           │
   │  Your bKash Number: [01_________]        │
   │  Transaction ID:    [__________]         │
   │                                          │
   │  [Submit Payment Info]                   │
   └──────────────────────────────────────────┘
3. Customer sends money from their own bKash/Nagad to the store's number
4. Customer enters their phone number (that made the payment) and
   the transaction ID (TxnID) they received from bKash/Nagad
5. Order created with:
   - paymentStatus = PENDING_VERIFICATION
   - paymentMethod = BKASH_MANUAL (or NAGAD_MANUAL)
   - paymentDetails = { senderNumber: "01...", transactionId: "TXN..." }
6. Admin sees the order in Dashboard with payment info:
   ┌──────────────────────────────────────────┐
   │  Order #MC-20260042                      │
   │  Payment: bKash (Manual)                 │
   │  Sender: 01712345678                     │
   │  TxnID: 8KJ42HXNR7                      │
   │  Amount: ৳1,500                          │
   │  Status: ⏳ Pending Verification          │
   │                                          │
   │  [✅ Verify & Mark Paid] [❌ Reject]      │
   └──────────────────────────────────────────┘
7. Admin checks their bKash/Nagad statement, finds the matching TxnID
8. Admin clicks "Verify & Mark Paid" → paymentStatus = PAID
9. Customer notified via email: "Payment verified, order confirmed!"
```

#### Bank Transfer Manual Flow

```text
1. Customer selects "Bank Transfer" at checkout
2. System shows bank account details:
   ┌──────────────────────────────────────────┐
   │  Transfer ৳1,500 to:                    │
   │  Bank: Brac Bank                        │
   │  Account: MotionBite Ltd                │
   │  Account No: 1234567890123              │
   │  Branch: Gulshan                        │
   │  Routing: 060261725                     │
   │                                          │
   │  After transfer, fill in below:          │
   │  Your Account/Phone: [__________]        │
   │  Transaction ID/Ref: [__________]        │
   │  (Optional) Screenshot: [Upload]         │
   │                                          │
   │  [Submit Payment Info]                   │
   └──────────────────────────────────────────┘
3. Customer makes the bank transfer independently
4. Customer enters their account/phone number, transaction ID,
   and optionally uploads a transaction screenshot
5. Order created with:
   - paymentStatus = PENDING_VERIFICATION
   - paymentMethod = BANK_TRANSFER
   - paymentDetails = { senderInfo: "...", transactionId: "...", screenshot: "url" }
6. Admin verifies in Dashboard → marks as PAID
7. Customer notified via email
```

#### Cash on Delivery (COD) Flow

```text
1. Customer selects "Cash on Delivery"
2. Order created with paymentStatus = UNPAID, paymentMethod = COD
3. No payment info needed — customer pays on delivery
4. Admin processes and ships order
5. Delivery agent collects cash payment
6. Admin marks order as PAID + DELIVERED in Dashboard
```

### Automatic Mode — How It Works

In Automatic mode, the customer clicks "Pay Now" and the entire payment
is processed through an integrated payment gateway. **No manual verification
needed** — the gateway confirms payment automatically via webhook.

#### SSLCommerz Integration Flow (Automatic Mode)

```text
1. Customer clicks "Pay Now" at checkout
2. Frontend calls POST /api/payments/sslcommerz/create { orderId }
3. Server initializes SSLCommerz session with:
   - Store ID + Store Password (from StoreConfig)
   - Order total, customer info, product info
   - Success/Fail/Cancel/IPN callback URLs
4. SSLCommerz returns a GatewayPageURL
5. Customer redirected to SSLCommerz hosted payment page
6. Customer chooses payment method (bKash, Nagad, Visa, MasterCard, etc.)
7. Customer completes payment on SSLCommerz page
8. SSLCommerz sends IPN (Instant Payment Notification) to our webhook
9. Server validates IPN (verify with SSLCommerz validation API)
10. Server updates Order: paymentStatus = PAID, paymentDetails = { tran_id, card_type, ... }
11. Customer redirected to order confirmation page
```

> **Why SSLCommerz?**
> - Single integration covers bKash, Nagad, Visa, MasterCard, Amex, net banking
> - Most popular payment gateway in Bangladesh
> - Sandbox mode for testing
> - No monthly fee (per-transaction only)
> - Client provides their own SSLCommerz merchant account

#### bKash Direct Integration Flow (Automatic Mode)

```text
1. Customer clicks "Pay with bKash"
2. Frontend calls POST /api/payments/bkash/create { orderId }
3. Server calls bKash Grant Token API
4. Server calls bKash Create Payment API
5. Server returns bKash payment URL to frontend
6. Customer redirected to bKash → enters PIN → confirms
7. bKash redirects to our callback URL
8. Server calls bKash Execute Payment API to finalize
9. Server verifies amount and updates Order status automatically
10. Customer redirected to order confirmation page
```

#### Nagad Direct Integration Flow (Automatic Mode)

```text
1. Customer clicks "Pay with Nagad"
2. Frontend calls POST /api/payments/nagad/create { orderId }
3. Server calls Nagad Initialize API (with merchant credentials)
4. Server decrypts challenge, generates payment request
5. Server returns Nagad payment URL
6. Customer redirected to Nagad → completes payment
7. Nagad calls our callback URL
8. Server verifies payment signature and updates Order automatically
9. Customer redirected to order confirmation page
```

### Manual vs. Automatic — Side-by-Side Comparison

| Aspect | Manual Mode | Automatic Mode |
| ------ | ----------- | -------------- |
| Customer experience | Pays outside, enters number + TxnID | Clicks "Pay Now", done automatically |
| Admin work | Must verify each payment manually | Zero — gateway confirms automatically |
| Cost to client | Free (no gateway fees) | Per-transaction gateway fee |
| Payment methods | bKash, Nagad, Bank Transfer, COD | SSLCommerz (all), bKash PGW, Nagad PGW |
| Order confirmation speed | Delayed until admin verifies | Instant |
| Risk of fraud | Higher (fake TxnIDs possible) | Very low (gateway validates) |
| Best for | Small/budget stores | Established stores with volume |

### WhatsApp Orders — Zero-DB Side Channel

> **What is it?**
> An optional secondary "Order via WhatsApp" button that appears alongside
> (never replacing) the normal checkout. Tapping it opens WhatsApp with a
> pre-filled order message. No API call, no DB write, no payment processing.
> The store owner handles the conversation manually.

| Aspect | WhatsApp Order |
| ------ | -------------- |
| Customer experience | Taps "Order via WhatsApp" → WhatsApp opens with cart as a message → sends |
| Admin work | Receives WhatsApp message, confirms manually, arranges delivery |
| DB record | **None** — conversation lives in WhatsApp |
| Payment | COD or manual transfer agreed over WhatsApp |
| Cost to client | Free |
| Best for | Small clients with manual payment, personal-touch businesses |
| Toggle | Feature flag `whatsappOrders` — OFF by default |

### How It Works (Purely Client-Side)

```text
── Customer clicks "Order via WhatsApp" (on Product page or Cart page) ──

1. JavaScript reads cart from localStorage
2. Formats message from template:

   Hi! I'd like to order:
   ────────────────────
   • Red Cotton T-Shirt (L) × 2 — ৳1,200
   • Blue Cap × 1              — ৳350
   ────────────────────
   Total: ৳1,550
   (Cash on delivery preferred)

3. URL-encodes the message:
   wa.me/8801712345678?text=Hi%21+I%27d+like+to+order...

4. Browser opens WhatsApp (app on mobile, web.whatsapp.com on desktop)
5. Customer hits Send
6. Store owner replies to confirm

── Server involvement: ZERO ──
```

### Configuration (Builder `/features` screen)

```text
┌───────────────────────────────────────────────────────┐
│  📱 WhatsApp Orders                    [Toggle: OFF]  │
│                                                        │
│  When enabled, a "Order via WhatsApp" button appears  │
│  on product pages and the cart page.                  │
│                                                        │
│  WhatsApp Number:  [8801XXXXXXXXX]                    │
│  (Country code + number, no + or spaces)              │
│                                                        │
│  Message Template: (optional — uses default if blank) │
│  [Hi! I'd like to order:                          ]   │
│  [{{items}}                                       ]   │
│  [Total: {{total}}                                ]   │
│                                                        │
│  Button placement:                                    │
│  ☑ Product Detail page                               │
│  ☑ Cart page                                         │
│                                                        │
│  Button label: [Order via WhatsApp]                   │
└───────────────────────────────────────────────────────┘
```

> **Design rule:** The WhatsApp button is always **secondary** — styled as
> an outline/ghost button below the primary "Add to Cart" or "Checkout" CTA.
> It never replaces normal checkout. Both options coexist.

### WhatsApp Button Component

```typescript
// components/storefront/whatsapp-order-button.tsx
"use client";
import { useFeature } from "@/hooks/use-feature";
import { useCart } from "@/hooks/use-cart";
import { useConfig } from "@/hooks/use-config";

export function WhatsAppOrderButton() {
  const enabled = useFeature("whatsappOrders");
  const { items, total } = useCart();
  const { whatsappNumber, whatsappOrderTemplate } = useConfig();

  if (!enabled || !whatsappNumber) return null;

  const buildMessage = () => {
    const itemLines = items
      .map(i => `• ${i.name}${i.variant ? ` (${i.variant})` : ""} × ${i.qty} — ৳${i.price * i.qty}`)
      .join("\n");
    const template = whatsappOrderTemplate ??
      `Hi! I'd like to order:\n────────────────────\n{{items}}\n────────────────────\nTotal: ৳{{total}}`;
    return template
      .replace("{{items}}", itemLines)
      .replace("{{total}}", total.toLocaleString("bn-BD"));
  };

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-order-btn"  // Styled as secondary/ghost button
      aria-label="Order via WhatsApp"
    >
      <WhatsAppIcon /> Order via WhatsApp
    </button>
  );
}
```

### Template Tokens

| Token | Replaced with |
| ----- | ------------- |
| `{{items}}` | Each cart item on its own line |
| `{{total}}` | Cart total in local currency |
| `{{name}}` | Customer name (if logged in, else blank) |
| `{{phone}}` | Customer phone (if profile has one, else blank) |

### Future Payment Providers

The provider adapter pattern makes adding new gateways trivial:

| Provider | Type | Status | Notes |
| -------- | ---- | ------ | ----- |
| SSLCommerz | Automatic | ✅ Phase 1 | All-in-one gateway for Bangladesh |
| bKash PGW | Automatic | ✅ Phase 1 | Direct integration |
| Nagad PGW | Automatic | ✅ Phase 1 | Direct integration |
| Bank Transfer | Manual | ✅ Phase 1 | Manual verification |
| COD | Manual | ✅ Phase 1 | Manual verification |
| **WhatsApp** | **Zero-DB side channel** | ✅ Phase 1 | Feature flag; no checkout, no DB record |
| Stripe | Automatic | 🔜 Future | International payments |
| PayPal | Automatic | 🔜 Future | International payments |

---

## 20. Blog System (Rich Text Editor)

### Blog Editor: Tiptap

For blog article writing and publishing, we use **Tiptap** — a headless,
extensible rich text editor built on top of ProseMirror.

> **⚠️ Tiptap Pricing Clarification:**
>
> Tiptap has **two parts**:
> - **Tiptap Core + Standard Extensions** → **MIT License (100% Free)**
>   This includes: headings, bold, italic, images, links, lists, tables,
>   code blocks, blockquotes, and everything we need.
> - **Tiptap Cloud** (real-time collaboration, comments, AI) → **Paid**
>   We do NOT use Tiptap Cloud. We only use the free open-source core.
>
> **We pay $0 for Tiptap.**

> **Why Tiptap over alternatives?**
>
> | Criteria | Tiptap (Free Core) | Alternatives |
> | -------- | ------------------ | ------------ |
> | Cost | **Free (MIT license)** | Quill (free), CKEditor (paid for premium), TinyMCE (paid) |
> | Extensibility | Highly extensible — custom nodes, marks, plugins | Limited in Quill, good in CKEditor |
> | Output format | JSON document (structured, parseable) + HTML | Quill: Delta JSON, CKEditor: HTML |
> | React integration | First-class React support | Quill: wrapper needed, CKEditor: official React package |
> | Mobile-friendly | Responsive, touch-friendly | Varies |
> | Image support | Built-in image node + Cloudinary integration | Similar across editors |
> | Headless | Fully headless — we control the UI | CKEditor/TinyMCE have opinionated UIs |
> | SEO | JSON → HTML server-rendered (perfect for crawlers) | Same if HTML is stored |

### Blog Writing Flow

```text
── Writing a Blog Post (Dashboard: /dashboard/blog) ──

1. Admin clicks "New Post"
2. Tiptap editor loads with a rich toolbar:
   - Headings (H2, H3, H4)
   - Bold, Italic, Underline, Strikethrough
   - Links
   - Bullet lists, Numbered lists
   - Block quotes
   - Code blocks
   - Images (uploaded to Cloudinary via media picker)
   - Videos (embed YouTube/Vimeo)
   - Tables
   - Horizontal rules
   - Text alignment
3. Admin writes content in the Tiptap editor
4. Admin fills metadata:
   - Title (+ localized title for Bangla if bilingual)
   - Slug (auto-generated from title, editable)
   - Excerpt (short summary for listing pages)
   - Cover Image (from media library)
   - Categories (multi-select)
   - Tags (comma-separated)
   - Meta Title & Description (SEO)
5. Admin clicks "Save as Draft" or "Publish"
6. On save:
   a. Tiptap JSON document saved to `content` column
   b. HTML rendered from JSON saved to `contentHtml` column
   c. On-demand revalidation triggered: revalidateTag("blog")
7. Blog post appears on storefront immediately
```

### Content Storage Strategy

```typescript
// Blog content is stored in TWO formats:

// 1. Tiptap JSON (for editing)
// Stored in BlogPost.content (Json column)
// Used when admin opens the post for editing — Tiptap loads this JSON
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "Introduction" }]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "This is the blog post content..." }
      ]
    },
    {
      "type": "image",
      "attrs": {
        "src": "https://res.cloudinary.com/...",
        "alt": "Product photo"
      }
    }
  ]
}

// 2. Pre-rendered HTML (for storefront display)
// Stored in BlogPost.contentHtml (String column)
// Generated server-side when the post is saved
// Used by storefront to display blog post — no runtime rendering cost
// "<h2>Introduction</h2><p>This is the blog post content...</p><img src='...' alt='Product photo' />"
```

> **Why store both JSON and HTML?**
>
> - **JSON** is needed for the Tiptap editor to reload and edit existing content
> - **HTML** is needed for fast storefront rendering — no need to process
>   Tiptap JSON on every page request
> - HTML is regenerated every time the post is saved, keeping them in sync

### Static Pages Use the Same Editor

Static pages (`/pages/:slug` — About, Contact, FAQ, Terms, etc.) also use
the Tiptap editor. The `Page` model stores content as Tiptap JSON +
pre-rendered HTML, identical to blog posts.

---

## 21. Mobile-First Design & UI/UX

### Design Philosophy

> **Every UI is designed for mobile screens first, then progressively
> enhanced for tablets and desktops.**

This applies to:
- **Storefront** — customer-facing shopping experience
- **Client Dashboard** — admin panel for managing the store
- **Project Builder** — internal tool (primarily desktop, but usable on tablets)

### Mobile-First Implementation Strategy

| Area | Mobile Design | Desktop Enhancement |
| ---- | ------------- | ------------------- |
| **Navigation** | Hamburger menu + bottom navigation bar | Full horizontal nav + mega menus |
| **Product Grid** | 2 columns, swipeable | 3–4 columns, grid layout |
| **Product Card** | Compact card, essential info only | Expanded card with hover effects |
| **Product Detail** | Stacked layout, swipeable image gallery | Side-by-side image + details |
| **Cart** | Full-page cart or slide-up drawer | Slide-out sidebar drawer |
| **Checkout** | Single-column stepped flow | Multi-column layout |
| **Search** | Full-screen overlay | Inline search bar with dropdown |
| **Filters** | Bottom sheet / slide-up panel | Sidebar filters |
| **Blog** | Single column, large text | Two-column layout |
| **Dashboard** | Collapsible sidebar, stacked cards | Full sidebar, grid dashboard |

### Touch-Friendly Design Principles

```text
1. Minimum touch target: 44px × 44px (Apple HIG standard)
2. Generous tap spacing: ≥ 8px between interactive elements
3. Swipe gestures: Image galleries, product carousels
4. Bottom navigation: Key actions always within thumb reach
5. Pull-to-refresh: Product listings, order history
6. Sticky elements: Add to cart button, checkout CTA
7. No hover-dependent interactions: Everything works with tap
8. Optimized form inputs: Appropriate keyboard types (numeric for phone, email for email)
9. Lazy loading: Images load as user scrolls
10. Skeleton screens: Show layout shapes while content loads
```

### Responsive Breakpoints

```css
/* Mobile-first — base styles are for mobile */
/* No media query needed for mobile */

/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Large Desktop */
@media (min-width: 1280px) { ... }
```

### Bottom Navigation Bar (Mobile)

```text
┌──────────────────────────────────────────┐
│  🏠 Home  │ 📂 Shop  │ 🛒 Cart         │
│  ❤️ Wish  │ 👤 Account                   │
└──────────────────────────────────────────┘
```

- Fixed to bottom of viewport on mobile
- Shows active state for current page
- Badge count on cart/wishlist icons
- Hidden on desktop (replaced by header nav)
- Configurable via theme config (`mobile.bottomNavEnabled`)

### Performance on Mobile

| Optimization | Implementation |
| ------------ | -------------- |
| Image sizes | Cloudinary responsive breakpoints (320w, 640w, 1024w) |
| Font loading | `next/font` with `font-display: swap`, subset for Bengali |
| Bundle size | Route-based code splitting, dynamic imports for heavy components |
| Above-the-fold | Priority loading for hero image + first product row |
| Animations | `prefers-reduced-motion` respected, CSS transforms over layout shifts |

---

## 22. Media Management

### Upload Flow (Cloudinary Direct Upload)

```text
1. User selects file in Dashboard/Builder
2. Frontend requests signed upload URL from /api/media/upload-signature
3. Frontend uploads directly to Cloudinary (no server bandwidth used)
4. Cloudinary returns URL + metadata
5. Frontend sends metadata to /api/media (save record in DB)
```

### Folder Structure on Cloudinary

```text
motioncommerce/{client-id}/
├── products/
├── categories/
├── blog/
├── branding/    (logo, favicon)
├── banners/
└── general/
```

### Image Optimization

- Cloudinary handles automatic format conversion (WebP, AVIF)
- Responsive images via Cloudinary URL transformations
- Lazy loading on all storefront images
- Blur placeholder generation for Next.js Image component

---

## 23. Email System (Resend)

### Transactional Emails

| Trigger                | Template              | Recipient   |
| ---------------------- | --------------------- | ----------- |
| Customer registration  | Welcome Email         | Customer    |
| Password reset         | Reset Password        | Customer    |
| Order placed           | Order Confirmation    | Customer    |
| Order shipped          | Shipping Notification | Customer    |
| Order delivered        | Delivery Confirmation | Customer    |
| Order cancelled        | Cancellation Notice   | Customer    |
| Payment received (auto)| Payment Confirmation  | Customer    |
| New order received     | New Order Alert       | Admin       |
| Manual payment submitted | Payment Verification Needed | Admin |
| Low stock alert        | Low Stock Warning     | Admin       |
| New review submitted   | Review Notification   | Admin       |

### Email Template System

- Templates built with **React Email** (works natively with Resend)
- Template content partially configurable via StoreConfig
- Branding (logo, colors) pulled from SiteConfig automatically
- Templates support bilingual content based on customer's language preference

---

## 24. Search (Database-Based)

### Implementation

PostgreSQL full-text search using Prisma's native capabilities:

```typescript
// Searches product name, description, tags, SKU
const results = await prisma.product.findMany({
  where: {
    status: "ACTIVE",
    OR: [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { tags: { has: query } },
      { sku: { contains: query, mode: "insensitive" } },
    ],
  },
  orderBy: { createdAt: "desc" },
  take: 20,
});
```

### Future Enhancement

If search performance degrades at scale, migrate to **Meilisearch** (free,
self-hosted) or **Algolia** (free tier: 10K records).

---

## 25. SEO Engine

### Automatic SEO Features

| Feature              | Implementation                                    |
| -------------------- | ------------------------------------------------- |
| Meta Title           | Configurable per page, fallback to SeoConfig default |
| Meta Description     | Configurable per page, auto-generated from content |
| Open Graph           | Auto-generated OG tags for all pages              |
| Canonical URLs       | Auto-generated                                    |
| Sitemap              | Auto-generated at `/sitemap.xml`                  |
| robots.txt           | Configurable via SeoConfig                        |
| Structured Data      | JSON-LD for products, breadcrumbs, organization   |
| Google Analytics     | GA4 tracking ID configurable via Builder          |
| Search Console       | Verification meta tag configurable via Builder    |
| Heading Hierarchy    | Enforced single H1 per page                       |
| Image Alt Text       | Required field in media management                |
| hreflang Tags        | Auto-generated for bilingual pages (en + bn)      |

---

## 26. Folder Structure (Detailed)

```text
src/
├── app/
│   ├── [locale]/                     # Locale-based routing (en, bn)
│   │   ├── (storefront)/            # Public storefront (route group)
│   │   │   ├── layout.tsx           # Storefront layout (loads theme + nav)
│   │   │   ├── page.tsx             # Homepage (config-driven)
│   │   │   ├── products/
│   │   │   │   ├── page.tsx         # Product listing
│   │   │   │   └── [slug]/page.tsx  # Product detail
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx         # Category listing
│   │   │   │   └── [slug]/page.tsx  # Category products
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── account/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx         # Account overview
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── wishlist/page.tsx
│   │   │   │   ├── addresses/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── search/page.tsx
│   │   │   └── pages/[slug]/page.tsx    # Static pages
│   │   │
│   │   ├── (auth)/                      # Auth pages (route group)
│   │   │   ├── login/page.tsx           # Credentials + Google Sign-In
│   │   │   ├── register/page.tsx        # Credentials + Google Sign-In
│   │   │   └── forgot-password/page.tsx
│   │
│   ├── dashboard/                       # Client dashboard (no locale prefix)
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # Dashboard overview
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── inventory/
│   │   ├── coupons/
│   │   ├── reviews/
│   │   ├── blog/                        # Blog editor with Tiptap
│   │   ├── media/
│   │   ├── pages/                       # Static page editor with Tiptap
│   │   ├── homepage/
│   │   ├── navigation/
│   │   ├── footer/
│   │   ├── seo/
│   │   ├── settings/
│   │   ├── branding/                    # Client-editable branding (logo, contact, social)
│   │   └── payment-info/               # Client MFS numbers + bank details
│   │
│   ├── builder/                         # Internal Project Builder (no locale prefix)
│   │   ├── layout.tsx                   # MotionBite branded layout with version
│   │   ├── page.tsx
│   │   ├── project/
│   │   ├── theme/
│   │   ├── branding/
│   │   ├── homepage/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── navigation/
│   │   ├── footer/
│   │   ├── seo/
│   │   ├── store/
│   │   ├── payment/                     # Payment mode configuration
│   │   ├── language/                    # Language configuration
│   │   ├── media/
│   │   ├── access/
│   │   └── preview/
│   │
│   ├── api/                             # API routes
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts   # NextAuth.js catch-all handler
│   │   │   ├── me/route.ts
│   │   │   ├── forgot-password/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── cart/
│   │   ├── customers/
│   │   ├── coupons/
│   │   ├── reviews/
│   │   ├── blog/
│   │   ├── media/
│   │   ├── search/
│   │   ├── payments/
│   │   │   ├── sslcommerz/              # SSLCommerz gateway
│   │   │   ├── bkash/
│   │   │   └── nagad/
│   │   ├── config/
│   │   ├── revalidate/                  # On-demand revalidation endpoint
│   │   └── storefront/
│   │
│   ├── layout.tsx                       # Root layout
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                              # shadcn/ui base components
│   ├── storefront/                      # Storefront-specific components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── bottom-nav/                  # Mobile bottom navigation
│   │   ├── product-card/
│   │   ├── cart-drawer/
│   │   ├── language-switcher/
│   │   └── ...
│   ├── dashboard/                       # Dashboard-specific components
│   ├── builder/                         # Builder-specific components
│   ├── editor/                          # Tiptap editor components
│   │   ├── tiptap-editor.tsx
│   │   ├── toolbar.tsx
│   │   ├── extensions/
│   │   └── media-picker.tsx
│   └── sections/                        # Section library
│       ├── hero/
│       │   ├── hero.tsx
│       │   └── hero.schema.ts
│       ├── product-grid/
│       │   ├── product-grid.tsx
│       │   └── product-grid.schema.ts
│       └── ... (one folder per section)
│
├── server/
│   ├── controllers/                     # Request handling
│   ├── services/                        # Business logic
│   ├── repositories/                    # Database queries
│   └── middleware/                       # Auth, validation, error handling
│
├── config/
│   ├── sections/
│   │   └── registry.ts                 # Section type → component mapping
│   ├── features/
│   │   └── registry.ts                 # Feature pack registry
│   └── themes/
│       └── presets/                     # Theme preset JSON files
│           ├── default.json
│           ├── fashion.json
│           ├── beauty.json
│           └── ...
│
├── lib/
│   ├── prisma.ts                        # Prisma client singleton
│   ├── auth.ts                          # NextAuth.js configuration
│   ├── cloudinary.ts                    # Cloudinary config
│   ├── resend.ts                        # Resend email client
│   ├── cache-tags.ts                    # Cache tag constants
│   ├── payments/
│   │   ├── types.ts                     # PaymentProvider interface
│   │   ├── sslcommerz.ts               # SSLCommerz adapter
│   │   ├── bkash.ts                     # bKash adapter
│   │   ├── nagad.ts                     # Nagad adapter
│   │   └── bank-transfer.ts            # Bank transfer handler
│   ├── validations/                     # Zod schemas
│   │   ├── product.schema.ts
│   │   ├── order.schema.ts
│   │   ├── config.schema.ts
│   │   └── ...
│   └── utils.ts                         # Shared utilities
│
├── hooks/                               # React hooks
│   ├── use-feature.ts
│   ├── use-cart.ts
│   ├── use-auth.ts
│   ├── use-config.ts
│   └── use-locale.ts                    # Language/locale hook
│
├── providers/                           # React context providers
│   ├── auth-provider.tsx                # NextAuth SessionProvider
│   ├── cart-provider.tsx
│   ├── theme-provider.tsx
│   └── config-provider.tsx
│
├── types/                               # TypeScript type definitions
│   ├── product.ts
│   ├── order.ts
│   ├── config.ts
│   ├── payment.ts
│   └── ...
│
├── locales/                             # Translation files
│   ├── en.json                          # English (default)
│   ├── bn.json                          # Bangla
│   └── ar.json                          # Arabic (future)
│
├── emails/                              # React Email templates
│   ├── order-confirmation.tsx
│   ├── welcome.tsx
│   ├── password-reset.tsx
│   ├── payment-confirmation.tsx
│   └── ...
│
└── styles/
    └── globals.css

prisma/
├── schema.prisma                        # Database schema
├── migrations/                          # Migration files
└── seed.ts                              # Seed data script

public/
├── sections/                            # Section thumbnails
└── icons/                               # Payment/brand icons
```

---

## 27. Development Phases

### Phase 1 — Foundation

> Core setup. Nothing works without this.

- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Set up Prisma with Neon PostgreSQL
- [ ] Implement NextAuth.js with Credentials + Google OAuth providers
- [ ] Implement RBAC middleware
- [ ] Set up layered architecture (controller/service/repository pattern)
- [ ] Implement error handling middleware
- [ ] Set up PlatformMeta with MotionBite versioning
- [ ] Create seed script (admin user, default config, sample data)
  - Seed contents: 1 SUPER_ADMIN user, default SiteConfig + ThemeConfig + SeoConfig + FeatureFlags + FooterConfig + NavigationConfig + PlatformMeta, default homepage PageLayout (Hero + Product Grid + Newsletter), 5 sample categories, 10 sample products with images/variants, 3 sample blog posts, sample coupons
- [ ] Set up environment variable structure
- [ ] Set up next-intl with English (default) + Bangla locale files
- [ ] Configure next-intl middleware matcher (skip /dashboard, /builder, /api)
- [ ] Basic project documentation

### Phase 2 — Core E-commerce

> Products, categories, orders — the shopping engine.

- [ ] Product CRUD (with variants, images, status, localized fields)
- [ ] Category CRUD (tree structure, nested categories, localized names)
- [ ] Cart system (client-side localStorage + server-side sync for logged-in users)
- [ ] Guest checkout support (shipping snapshot on Order, optional userId)
- [ ] Order creation flow (cart → checkout → order)
- [ ] Order management (status updates, payment tracking)
- [ ] Customer management
- [ ] Inventory tracking + low stock alerts
- [ ] Coupon system
- [ ] Review system (with moderation)
- [ ] Wishlist (with optional variant support)
- [ ] Product search (DB-based)
- [ ] Product filtering (price range, category, sort, in-stock, on-sale)
- [ ] Pagination (offset-based, standardized response format)
- [ ] Shipping zones + flat-rate calculation
- [ ] Address management

### Phase 3 — Dashboard

> Client admin panel for managing the store.

- [ ] Dashboard layout (sidebar nav, top bar, responsive, mobile-friendly)
- [ ] Dashboard overview page (stats, charts, recent orders)
- [ ] Product management UI
- [ ] Category management UI
- [ ] Order management UI (list, detail, status updates)
- [ ] Customer list UI
- [ ] Inventory UI
- [ ] Coupon management UI
- [ ] Review moderation UI
- [ ] Media library UI (Cloudinary integration)
- [ ] Blog management UI (with Tiptap rich text editor)
- [ ] Static page editor UI (with Tiptap rich text editor)
- [ ] SEO settings UI
- [ ] Store settings UI (payment mode, shipping)
- [ ] User management UI

### Phase 4 — Theme Engine + Configuration System

> Making the site configurable.

- [ ] SiteConfig, ThemeConfig, SeoConfig, PlatformMeta DB models
- [ ] Configuration API endpoints (/api/config/*)
- [ ] CSS variable generation from ThemeConfig (with mobile overrides)
- [ ] Theme preset files (8 presets)
- [ ] ThemeProvider component
- [ ] On-demand revalidation system (cache tags + revalidateTag)
- [ ] Zod validation for all config types

### Phase 5 — Storefront (Mobile-First)

> The public-facing website, designed mobile-first.

- [ ] Storefront layout (header, footer, bottom nav from config)
- [ ] Homepage (renders sections from PageLayout config)
- [ ] Product listing page (filters, sorting, pagination, mobile bottom-sheet filters)
- [ ] Product detail page (images, variants, add to cart, sticky mobile CTA)
- [ ] Category pages
- [ ] Cart page (full-page on mobile, drawer on desktop)
- [ ] Checkout flow (stepped mobile flow, multi-column desktop)
- [ ] Customer account pages (orders, wishlist, addresses)
- [ ] Blog listing + detail pages (Tiptap HTML rendering)
- [ ] Static pages (Tiptap HTML rendering)
- [ ] Search results page (full-screen overlay on mobile)
- [ ] Language switcher (header on desktop, settings on mobile)
- [ ] 404 page
- [ ] Mobile-first responsive design with bottom navigation
- [ ] SEO (meta tags, JSON-LD, sitemap, robots.txt, hreflang)

### Phase 6 — Section Library + Homepage Builder

> The drag-and-drop page builder.

- [ ] Section Registry architecture
- [ ] Build 10+ core sections (see Section Library table)
- [ ] Section schema + prop system (with mobile-specific props)
- [ ] Homepage Builder UI (/builder/homepage)
- [ ] Drag-and-drop reordering
- [ ] Section prop editor (form-based)
- [ ] Live preview (iframe — mobile + desktop toggle)
- [ ] Section visibility toggle
- [ ] Duplicate / delete sections
- [ ] Save and publish flow (with on-demand revalidation)

### Phase 7 — Project Builder (Full) — MotionBite Branded

> Complete internal tool for site setup.

- [ ] Builder layout + navigation with MotionBite branding + version display
- [ ] Project settings screen (including platform version)
- [ ] Theme selector + customizer screen
- [ ] Branding configuration screen
- [ ] Feature pack toggle screen
- [ ] Navigation/menu builder screen
- [ ] Footer configuration screen
- [ ] SEO configuration screen
- [ ] Store settings screen (shipping, tax, email)
- [ ] **Payment mode configuration screen** (Manual / Automatic toggle + gateway credentials)
- [ ] **Language configuration screen** (default + enabled languages)
- [ ] Client access management screen
- [ ] Full preview mode (mobile + desktop toggle)

### Phase 8 — Payments & Email

> Money in, notifications out.

- [ ] Payment provider adapter pattern (with `mode` field)
- [ ] **SSLCommerz gateway integration** (automatic mode)
- [ ] bKash direct gateway integration (automatic mode)
- [ ] Nagad direct gateway integration (automatic mode)
- [ ] Bank transfer flow (manual mode)
- [ ] COD flow (manual mode)
- [ ] Payment mode switching logic in checkout
- [ ] React Email templates (all transactional emails, bilingual)
- [ ] Resend integration
- [ ] Email sending service (with automatic status-based triggers)

### Phase 9 — Feature Packs (Industry-Specific)

> Modular add-ons for specific industries.

- [ ] Feature flag system (with SSR-compatible cookie/header parsing)
- [ ] useFeature hook
- [ ] Conditional rendering throughout storefront
- [ ] Fashion pack (size guide, color swatches)
- [ ] Beauty pack (ingredients, shade selector)
- [ ] Electronics pack (specifications, warranty)
- [ ] Food pack (nutrition facts, allergens)
- [ ] Books pack (ISBN, author, publisher)

### Phase 10 — Polish, Testing & Launch

> Quality assurance and first deployment.

- [ ] End-to-end testing of full agency workflow
- [ ] Performance optimization (bundle size, image loading, caching)
- [ ] Security hardening (CSRF, rate limiting, input sanitization)
- [ ] Accessibility audit (ARIA, keyboard nav, screen reader)
- [ ] **Mobile responsiveness audit** (test on real devices)
- [ ] **Touch interaction audit** (tap targets, swipe gestures)
- [ ] **Google Sign-In end-to-end testing**
- [ ] **Payment mode testing** (manual + automatic flows)
- [ ] **Bilingual testing** (English + Bangla content rendering)
- [ ] Error boundary implementation
- [ ] Loading states + skeleton screens
- [ ] Clone + deploy documentation
- [ ] First client deployment

---

## 28. Testing Strategy

### Unit Tests

- **Framework:** Vitest
- **Coverage:** Services, utilities, validation schemas
- **Example:** Product service correctly calculates discount prices

### Integration Tests

- **Framework:** Vitest + Prisma (test database)
- **Coverage:** API routes, controller → service → repository flow
- **Example:** POST /api/products creates product and returns 201

### End-to-End Tests

- **Framework:** Playwright
- **Coverage:** Critical user flows
- **Flows to test:**
  1. Customer: Browse → Add to cart → Checkout → Order confirmation (Manual + Automatic payment)
  2. Customer: Sign in with Google → Browse → Purchase
  3. Admin: Login → Create product → Manage order
  4. Builder: Login → Configure theme → Set payment mode → Save → Verify storefront
  5. Blog: Create post with Tiptap → Publish → Verify on storefront
  6. Language: Switch language → Verify translated content

### Test Database

- Separate Neon branch for testing (Neon branching is free)
- Seed data script for consistent test state

---

## 29. Security

| Concern              | Solution                                          |
| -------------------- | ------------------------------------------------- |
| Authentication       | NextAuth.js with httpOnly cookies (not localStorage) |
| Password storage     | bcrypt with salt rounds ≥ 12                       |
| Google OAuth         | Server-side OAuth flow via NextAuth (no client-side token handling) |
| CSRF protection      | NextAuth built-in CSRF + SameSite cookie attribute |
| Rate limiting        | next-rate-limit on auth + payment endpoints (see table below) |
| Input validation     | Zod schemas on all API inputs                      |
| SQL injection        | Prisma ORM (parameterized queries by default)      |
| XSS                  | React auto-escapes + CSP headers + Tiptap sanitized output |
| CORS                 | Restrict to same-origin (Vercel handles this)      |
| File upload          | Validate file type + size before Cloudinary upload  |
| Environment secrets  | Vercel encrypted env vars, never in Git            |
| Dependency security  | npm audit in CI pipeline                           |
| Admin access         | IP allowlist option for /builder routes            |
| Payment credentials  | Encrypted at rest in DB using PAYMENT_ENCRYPTION_KEY |
| Payment data         | Never store card numbers — SSLCommerz/bKash handle PCI compliance |

### Rate Limits

| Endpoint Group | Limit | Window |
| -------------- | ----- | ------ |
| Auth (login/register) | 10 requests | per minute |
| Password reset | 3 requests | per hour |
| Payment create | 5 requests | per minute |
| Order create | 10 requests | per minute |
| Product search | 30 requests | per minute |
| Config update | 20 requests | per minute |
| General API | 100 requests | per minute |

---

## 30. Performance

| Area                 | Strategy                                          |
| -------------------- | ------------------------------------------------- |
| Server rendering     | SSR for all pages, ISR with on-demand revalidation |
| Image optimization   | Cloudinary transformations + Next.js Image         |
| Bundle size          | Dynamic imports for Dashboard/Builder (not loaded for customers) |
| Database queries     | Prisma select (pick only needed fields), indexes   |
| API response caching | Next.js Data Cache with tag-based on-demand revalidation |
| Static assets        | Vercel Edge CDN (automatic)                       |
| Fonts                | next/font with font-display: swap, subset for Bengali |
| Code splitting       | Route-based (automatic with App Router)            |
| Third-party scripts  | Load analytics async, defer non-critical scripts   |
| Mobile performance   | Responsive images (srcset), reduced animation on low-end devices |
| Zero-cost idle       | No timed revalidation — $0 compute when nothing changes |

---

## 31. Error Handling & Logging

### API Error Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid product data",
    "details": [
      { "field": "price", "message": "Price must be a positive number" }
    ]
  }
}
```

### Error Codes

| Code                 | HTTP Status | Description                          |
| -------------------- | ----------- | ------------------------------------ |
| VALIDATION_ERROR     | 400         | Invalid input data                   |
| UNAUTHORIZED         | 401         | Missing or invalid token             |
| FORBIDDEN            | 403         | Insufficient permissions             |
| NOT_FOUND            | 404         | Resource not found                   |
| CONFLICT             | 409         | Duplicate resource (e.g., email)     |
| RATE_LIMITED         | 429         | Too many requests                    |
| INTERNAL_ERROR       | 500         | Unexpected server error              |
| PAYMENT_FAILED       | 402         | Payment processing failed            |

### Logging

- **Development:** Console logging with structured format
- **Production:** Vercel Logs (included free) for serverless function logs
- **Error tracking:** Consider Sentry free tier (5K events/month) for production error monitoring

---

## 32. Environment Variables

```env
# Database
DATABASE_URL=postgresql://...@neon.tech/motioncommerce

# NextAuth.js
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<random-32-chars>

# Google OAuth
GOOGLE_CLIENT_ID=<from-google-cloud-console>
GOOGLE_CLIENT_SECRET=<from-google-cloud-console>

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend (Email)
RESEND_API_KEY=
EMAIL_FROM=noreply@domain.com

# Payment credential encryption key
# Used to encrypt/decrypt gateway credentials (SSLCommerz, bKash, Nagad)
# stored in the database (StoreConfig.paymentConfig).
# Gateway credentials are configured from Builder UI — NOT stored as env vars.
PAYMENT_ENCRYPTION_KEY=<random-32-chars>

# Google Analytics
NEXT_PUBLIC_GA_ID=

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

---

## 33. Success Criteria

A new client website can be launched by:

1. Clone the master repository
2. Create a new GitHub repository
3. Create a new Neon database (free tier)
4. Deploy to Vercel (free tier)
5. Set environment variables
6. Run `npx prisma migrate deploy && npx prisma db seed`
7. Open the Project Builder (`/builder`)
8. Configure: Theme → Branding → Language → Homepage → Features → Navigation → Footer → SEO → Store → Payment Mode
9. Create client dashboard account
10. QA and deliver

**Zero code changes required unless the client needs a genuinely new feature.**

### Measurable KPIs

| Metric                                    | Target              |
| ----------------------------------------- | -------------------- |
| Time from clone to live site              | < 4 hours            |
| Code changes required per client          | 0 lines              |
| Monthly hosting cost per client           | $0 (free tiers)      |
| Storefront page load (LCP)               | < 2.5 seconds        |
| Lighthouse Performance score             | > 90                  |
| Lighthouse Mobile score                  | > 85                  |
| Number of configurable sections          | 15+ at launch        |
| Number of theme presets                  | 8 at launch          |
| Supported payment methods               | 6 (SSLCommerz, bKash, Nagad, Bank, COD + Google Pay via SSLCommerz) |
| Supported languages                     | 2 (English + Bangla) |
| Authentication methods                  | 2 (Credentials + Google) |

---

## 34. Developer Documentation Strategy

To ensure seamless onboarding of new developers and long-term maintainability, the project will maintain comprehensive internal documentation alongside the codebase. 

### Core Documentation Requirements

- **Codebase Mapping:** Every major feature, section, and configuration object must be documented with its exact location in the folder structure (e.g., "The Hero section is located at `src/components/sections/hero/` and its schema is in `src/config/sections/hero.schema.ts`").
- **How-To Guides:** Step-by-step instructions on how to add new:
  - Theme presets
  - Section components for the Homepage Builder
  - Payment gateway adapters
  - Feature packs
- **Inline Documentation:** Complex logic (like the on-demand revalidation, feature flags hook, and payment routing) must have clear, explanatory comments within the code.
- **Onboarding Guide (`CONTRIBUTING.md` / `DEVELOPMENT.md`):** A centralized guide explaining how to set up the local environment, run tests, and understand the core architecture (Storefront vs. Dashboard vs. Builder). 
- **Living Document:** This Master Plan serves as the high-level architecture. The codebase documentation will map these concepts to actual implementation files, making it trivial for any new developer to ask "where do I go to change X?" and find the answer immediately.

---

## Changelog (v2.0 → v3.0 → v3.1)

| Change | v2.0 | v3.0 | v3.1 |
| ------ | ---- | ---- | ---- |
| Default language | Bangla (bn) | **English (en)** with Bangla bilingual | — |
| Payment system | bKash, Nagad, Bank, COD only | **Dual Mode: Manual + Automatic (SSLCommerz)** | **Credentials in DB only** (not env vars), added `PaymentInfo` model |
| Payment config split | — | Agency → mode/methods, Client → MFS/bank | Added `PaymentInfo` Prisma model + API endpoints |
| Page revalidation | Timed (every 60s) | **On-demand revalidation** | — |
| Authentication | Manual JWT | **NextAuth.js** with Credentials + **Google Sign-In** | — |
| Blog editor | Markdown/Rich text (unspecified) | **Tiptap** rich text editor | — |
| Builder branding | Unbranded | **MotionBite branded** with version tracking | — |
| Design approach | Not specified | **Mobile-first design** | — |
| SEO impact | Not analyzed | **Full SEO & speed analysis** | — |
| Cart | — | Server-side only (required login) | **Client-side localStorage** (guest-friendly) + server sync on login |
| Guest checkout | — | Not supported | **Supported** — userId nullable, shipping snapshot on Order |
| Branding | — | Agency-only | **Split** — agency sets initial, client updates from Dashboard |
| Footer credit | — | — | **MotionBite credit** toggle + customizable label |
| Feature flags | — | Client-side hook only | **Both** server-side `getFeature()` + client-side `useFeature()` |
| Section props | — | Plain strings | **Localizable** — `localizable: true` flag generates `{prop}Localized` sibling |
| Middleware | — | — | **next-intl matcher** documented (skip /dashboard, /builder, /api) |
| Rate limiting | — | Mentioned only | **Specific limits defined** per endpoint group |
| Env vars | — | Payment creds in env vars | **Payment creds removed from env** — DB-only + encryption key |
| Seed script | — | Mentioned | **Contents specified** (admin user, configs, 5 categories, 10 products, 3 posts) |
| Database indexes | — | None | **Added** on Product, Order, BlogPost, Review |
| WishlistItem | — | Product-level only | **Variant support** — optional variantId |
| Pagination | — | Not specified | **Standardized format** (offset-based, page/limit/total) |
| Product filters | — | Not specified | **Defined** (price, category, sort, in-stock, on-sale) |
| Email triggers | — | Basic set | **Added** manual payment verification notification to admin |
| WhatsApp Orders | — | — | **New** zero-DB side channel; feature flag `whatsappOrders`; `whatsappNumber` + template in SiteConfig |

---

*Last updated: July 2026*
*Version: 3.1*
