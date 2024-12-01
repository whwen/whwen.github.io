import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'wHw',
			social: {
				github: 'https://github.com/whwen',
			},
			sidebar: [
				{
					label: '目录',
					items: [
						// Each item here is one entry in the navigation menu.
						// https://diataxis.fr/how-to-guides/
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Java',
					// https://diataxis.fr/reference/
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
