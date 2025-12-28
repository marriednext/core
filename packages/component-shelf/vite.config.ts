import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      "react-redux",
      "@reduxjs/toolkit",
      "react-hook-form",
      "@radix-ui/react-label",
      "lucide-react",
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "date-fns",
    ],
  },
});

