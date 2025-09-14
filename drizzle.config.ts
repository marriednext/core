// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_lahdK9bx6Zpy@ep-wandering-credit-afx4zknv-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
