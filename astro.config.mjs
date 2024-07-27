import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://ernesto1207.github.io',
  base: 'Restaurant-Monsefu',
  output: 'server',
  integrations: [tailwind(), svelte()],
  adapter: vercel()
});