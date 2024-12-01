import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	work: defineCollection({
		type: 'content',
		schema: docsSchema(),
	}),
};
