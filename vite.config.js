import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx, defineManifest } from '@crxjs/vite-plugin';
var manifest = defineManifest({
    manifest_version: 3,
    name: "AI Selector Edge Extension",
    version: "1.0.0",
    description: "Quick launcher for AI services for Microsoft Edge",
    action: {
        default_popup: "index.html",
        default_title: "AI Selector",
        default_icon: "icon.png"
    },
    icons: {
        "16": "icon.png",
        "32": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
    },
    permissions: []
});
export default defineConfig({
    plugins: [
        react(),
        crx({ manifest: manifest }),
    ],
});
