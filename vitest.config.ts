import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';
import VueIconsPlugin from '@kalimahapps/vue-icons/vite';

export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
		// autoimport tools except test files
			dirs: ['./tools/**', '!./tools/**/tests'],
			dts: true,
			// global imports to register
			imports: [
			// presets
				'vue',
			],
			eslintrc: {
				enabled: true,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true,
			},
		}),
		VueIconsPlugin(),
	],
	test: {
		environment: 'happy-dom',
		exclude: [...configDefaults.exclude],
		coverage: {
			provider: 'istanbul',
			reporter: ['text'],
			exclude: [...configDefaults.coverage?.exclude ?? [], 'tools/**/tests/**'],
		},
	},
});