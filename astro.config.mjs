import { defineConfig } from 'astro/config';

// https://astro.build/config
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://whwen.github.io',
  integrations: [
    starlight({
      title: '我的令人愉悦的文档网站',
    }),
  ],
});