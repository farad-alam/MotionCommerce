# MotionCommerce Developer Guide

Welcome to the MotionCommerce codebase! This guide is designed to help new developers quickly understand the architecture, project structure, and feature locations so they can easily contribute to the product.

## Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Prisma 7 (with `@prisma/adapter-pg` driver)
- **Authentication**: NextAuth.js v5 (Beta)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Language**: TypeScript (Strict Mode)

## Project Structure & Architecture

The project follows a modular, controller-service-repository pattern on the backend to keep business logic decoupled from Next.js route handlers.

```text
MotionCommerce/
├── prisma/
│   ├── schema.prisma        # Database schema definitions
│   └── seed.ts              # Database seed script for default configurations
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── (storefront)/    # Public facing e-commerce UI
│   │   ├── dashboard/       # Admin Dashboard UI
│   │   └── api/             # RESTful API Endpoints (Delegates to Controllers)
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Base shadcn components (buttons, inputs)
│   │   ├── storefront/      # Storefront specific UI components
│   │   └── dashboard/       # Admin specific UI components
│   ├── lib/                 # Shared utilities, Prisma instance, NextAuth config
│   └── server/              # Backend Business Logic
│       ├── controllers/     # Validates HTTP requests, orchestrates services
│       ├── services/        # Core business logic and calculations
│       ├── repositories/    # Direct database interactions (Prisma queries)
│       └── middleware/      # Auth & Request validation middleware
```

## Where to Find Features

### 1. Configuration & Theming (Phase 2)
The platform is heavily "Configuration over Coding". Site settings, themes, and feature flags are stored in the database.
- **Database Model**: `SiteConfig`, `ThemeConfig`, `FeatureFlags` (`prisma/schema.prisma`)
- **Backend Logic**: `src/server/controllers/config.controller.ts`
- **Frontend Usage**: The storefront reads the active theme and dynamically injects CSS variables in `src/app/(storefront)/layout.tsx`.

### 2. Identity & Roles (Phase 3)
Authentication uses NextAuth v5 with Prisma Adapter.
- **Roles**: `SUPER_ADMIN`, `CLIENT_ADMIN`, `CUSTOMER`
- **Configuration**: `src/lib/auth.ts`
- **Route Protection**: Admin routes are protected via middleware (`src/server/middleware/auth.ts`).

### 3. Products & Categories (Phase 4)
Products have a parent-child relationship with Variants. Categories support infinite nesting (Self-referential relations).
- **Backend API**: `src/app/api/products/route.ts` & `src/app/api/categories/route.ts`
- **Controllers**: `product.controller.ts`, `category.controller.ts`
- **Admin UI**: Built using dynamic forms in the `/dashboard` routes.

### 4. Storefront UI (Phase 5)
The public-facing e-commerce store.
- **Location**: Everything under `src/app/(storefront)/`
- **Data Fetching**: Extracted into `src/lib/storefront-data.ts` to implement Next.js 16 caching and revalidation tags properly.

## Important Backend Patterns

### Controllers -> Services -> Repositories
Always keep route handlers thin. An API route should immediately delegate to a Controller.
```typescript
// src/app/api/products/route.ts
export async function GET(req: NextRequest) {
  return productController.getProducts(req);
}
```
The **Controller** uses Zod to validate input.
The **Service** executes the business logic.
The **Repository** performs the Prisma DB query.

### Database Client (Prisma 7)
Prisma 7 removed direct DB connections from `schema.prisma`. 
- **DB Connection**: Managed natively in `src/lib/prisma.ts` using `@prisma/adapter-pg` and the standard Postgres `Pool`.
- **Generating Prisma**: Run `npx prisma generate` after any schema changes.
- **Pushing Schema**: Run `npx prisma db push` to sync your local DB.

### API Response Standard
Use the unified response formatters located in `src/lib/api-response.ts`.
```typescript
return successResponse(data);
// or
return paginatedResponse(items, paginationMeta);
```

## Running the Application Locally
1. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and `AUTH_SECRET`.
2. Push schema to database: `npx prisma db push`
3. Seed default configurations: `npx prisma db seed`
4. Run development server: `pnpm run dev`
