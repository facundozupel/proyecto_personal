// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // Enable SSR for VPS deployment
  output: 'server',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
      },
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
});