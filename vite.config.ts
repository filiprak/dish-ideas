import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({

        }),
    ],
});
