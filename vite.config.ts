import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                sw: './src/sw/index.ts',
                app: './index.html',
            },
            output: {
                entryFileNames(info) {
                    return info.name == 'sw' ? '[name].js' : 'assets/[name]-[hash].js';
                },
            }
        }
    },
    resolve: {
        alias: {
            '/sw.js': './src/sw/index.ts',
        },
    },
});
