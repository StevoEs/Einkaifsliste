import { defineConfig } from "vite";
export default defineConfig({
    root: "src",
    assetsInclude: ["./assets/**/*.*"],
    build: {
        sourcemap: true,
        emptyOutDir: true,
        outDir: "../dist"
    }
})