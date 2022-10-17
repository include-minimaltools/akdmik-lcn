import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      assets: path.resolve(__dirname, "./src/assets"),
      routes: path.resolve(__dirname, "./src/routes"),
      styles: path.resolve(__dirname, "./src/styles"),
      pages: path.resolve(__dirname, "./src/pages"),
      utils: path.resolve(__dirname, "./src/utils"),
      modules: path.resolve(__dirname, "./src/modules"),
      data: path.resolve(__dirname, "./src/data"),
      models: path.resolve(__dirname, "./src/models"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      "redux-store": path.resolve(__dirname, "./src/redux-store"),
    },
  },
});
