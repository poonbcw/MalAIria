import 'dotenv/config';
import { defineConfig } from '@prisma/config';

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment variables");
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,  // ตรงนี้ Prisma จะใช้ DB URL จาก .env
  },
});
