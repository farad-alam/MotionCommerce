// @ts-nocheck
import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});
