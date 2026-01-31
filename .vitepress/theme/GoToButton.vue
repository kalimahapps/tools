<template>
	<div class="flex justify-center mb-2 mt-8">
		<a
			v-bind="$attrs"
			class="bg-(--vp-button-brand-bg)
				hover:bg-(--vp-button-brand-hover-bg)
				border
				hover:border-(--vp-button-brand-hover-border)
				border-(--vp-c-brand-3)
				mx-auto
				no-underline!
				px-6
				py-3
				rounded-md
				text-(--vp-button-brand-text)!
				hover:text-(--vp-button-brand-hover-text)
				transition-all!"
		>
			<slot />
		</a>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
});
</script>