import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 🚀 Automatically open browser
    port: 5173,
  },
});
