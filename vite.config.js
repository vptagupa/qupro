import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/app/js/app.jsx",
                "resources/app/assets/scss/app.scss",
            ],
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": "/resources/app",
        },
    },
});
