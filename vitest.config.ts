import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'mock-css-modules',
			transform(_, id) {
				if (id.endsWith('.module.css') || id.endsWith('.css')) {
					return {
						code: 'export default new Proxy({}, { get: (_, key) => key })',
						map: null,
					};
				}
			},
		},
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test/setup.ts',
		include: ['**/*.{test,spec}.{ts,tsx}'],
		css: false,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			exclude: ['node_modules/', 'src/test/'],
		},
		clearMocks: true,
		server: {
			deps: {
				inline: ['next-auth'],
			},
		},
	},
	css: {
		postcss: {
			plugins: [], // override vacío — ignora postcss.config.mjs
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
	},
});
