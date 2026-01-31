<template>
	<h2 class="border-0! mt-0!">
		Tools
	</h2>
	<div class="grid grid-cols-3 gap-4">
		<a
			v-for="tool in tools"
			:key="tool.link"
			:href="`${tool.link}`"
			class="bg-(--vp-c-bg-soft)
				border
				hover:border-(--vp-c-brand-1)
				border-(--vp-c-divider)
				no-underline!
				p-6
				rounded-xl
				transition-all!"
		>
			<h2
				class="border-0! my-0! py-0! text-(--vp-c-text-1) text-lg!"
			>
				{{ tool.label }}
			</h2>
			<p
				class="text-(--vp-c-text-2)"
			>
				{{ tool.description }}
			</p>
		</a>
	</div>
</template>

<script setup lang="ts">
const tools = [
	{
		link: '/vue-composition-converter/info.html',
		label: 'Vue Composition Converter',
		description: 'Converts Vue 2 Options API to Vue 3 Composition API',
	},
	{
		link: '/gradient-generator/info.html',
		label: 'Gradient Generator',
		description: 'Generate CSS gradients',
	},
];
</script>