import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://vaccine-backend:8000",
        changeOrigin: false,
        secure: false
      }
    }
  }
});
