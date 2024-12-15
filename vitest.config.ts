import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths({
      loose: true,
      root: "./",
    }),
    react(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "vitest.setup.tsx",
    coverage: {
      provider: "v8",
      extension: [".tsx", ".ts"],
      exclude: ["next-env.d.ts"],
    },
  },
});
