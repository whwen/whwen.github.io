import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    title: 'Whwen',
    integrations: [
      //https://starlight.astro.build/zh-cn/reference/configuration/
      starlight({
        title: 'Whwen',
        components: {
//           Head: './src/components/MainHead.astro',
//           Header: './src/components/Nav.astro',
//           ThemeSelect: './src/components/ThemeToggle.astro',
        },
        customCss: [
          // 你的自定义 CSS 文件的相对路径
//           './src/styles/global.css',
        ],
      }),
    ],
});
