import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		// Enables global test methods like describe, it, and expect
		globals: true,
		// Simulates a browser environment in Node.js
		environment: 'jsdom',
		// Path to your test setup file
		setupFiles: './test/setup.ts',
		include: ['**/*.{test,spec}.{ts,tsx}'],
		// Optional: handles CSS imports smoothly during testing
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			exclude: ['node_modules/', 'src/test/'],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
	},
});
