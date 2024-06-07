import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "Mojaui",
      fileName: "mojaui",
      formats: ["umd", "es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "tailwindcss",
        "react-icons",
        "next-themes",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
          tailwindcss: "tailwindcss",
          "react-icons": "react-icons",
          "next-themes": "next-themes",
        },
      },
    },
  },
  plugins: [react(), dts({ rollupTypes: true })],
  server: { host: true, port: 3000 },
})
