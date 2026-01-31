import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import AutoImport from 'unplugin-auto-import/vite';
import VueIconsPlugin from '@kalimahapps/vue-icons/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	worker: {
		format: 'es',
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	plugins: [
		tsconfigPaths(),
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
		tailwindcss(),
	],
});