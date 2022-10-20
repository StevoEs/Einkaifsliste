import { defineConfig } from "vite";
export default defineConfig({
    css: {
        modules: {
          scopeBehaviour: 'global',
        },
      },
    root: "src",
    assetsInclude: ["./assets/**/*.*"],
    build: {
        sourcemap: true,
        emptyOutDir: true,
        outDir: "../dist"
    }
})