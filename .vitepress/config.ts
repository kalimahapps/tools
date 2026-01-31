import { defineConfig } from 'vitepress';

export default defineConfig({
	title: 'Kalimah Tools',
	description: 'A collection of tools',
	head: [
		[
			'link', {
				rel: 'icon',
				href: '/logo.svg',
				type: 'image/svg+xml',
			},
		],
		[
			'script',
			{
				async: '',
				src: 'https://www.googletagmanager.com/gtag/js?id=G-0N928V7RV2',
			},
		],
		[
			'script',
			{},
			`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0N928V7RV2');`,
		],
	],
	themeConfig: {
		logo: '/logo.svg',
		nav: [
			{
				text: 'Home',
				link: '/',
			},
			{
				text: 'Safha',
				link: 'https://safha.kalimah-apps.com/',
			},
			{
				text: 'Blog',
				link: 'https://kalimah-apps.com/',
			},
			{
				text: 'Projects',
				link: 'https://kalimah-apps.com/projects',
			},
			{
				text: 'Resources',
				link: 'https://resources.kalimah-apps.com/',
			},
		],

		sidebar: [
			{
				text: 'Tools',
				items: [
					{
						text: 'Vue Composition Converter',
						link: '/vue-composition-converter/info',
					},
					{
						text: 'Gradient Generator',
						link: '/gradient-generator/info',
					},
				],
			},
		],
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/kalimahapps/tools',
			},
			{
				icon: 'npm',
				link: 'https://www.npmjs.com/org/kalimahapps',
			},
			{
				icon: 'twitter',
				link: 'https://twitter.com/kalimahapps',
			},
		],
	},
});
