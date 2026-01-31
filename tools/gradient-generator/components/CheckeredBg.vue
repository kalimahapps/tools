<template>
	<div class="absolute inset-0 bg" />
</template>

<script lang="ts" setup>
type Size = 'sm' | 'md' | 'lg';
const { size } = defineProps({
	/**
	 * The size of the checkered background
	 */
	size: {
		type: String as PropType<Size>,
		default: 'md',
	},
});

const sizesMap = {
	sm: {
		position: '0 0, 0.25em 0.25em',
		size: '0.5em 0.5em',
	},
	md: {
		position: '0 0, 0.5em 0.5em',
		size: '1em 1em',
	},
	lg: {
		position: '0 0, 1em 1em',
		size: '2em 2em',
	},
};

const sizeData = sizesMap[size];
</script>

<style scoped>
.bg {
	background: linear-gradient(
		45deg, rgba(0, 0, 0, 0.0980392) 25%,
		rgba(0, 0, 0, 0) 25%,
		rgba(0, 0, 0, 0) 75%,
		rgba(0, 0, 0, 0.0980392) 75%,
		rgba(0, 0, 0, 0.0980392) 0),
		linear-gradient(
			45deg, rgba(0, 0, 0, 0.0980392) 25%,
			rgba(0, 0, 0, 0) 25%,
			rgba(0, 0, 0, 0) 75%,
			rgba(0, 0, 0, 0.0980392) 75%,
			rgba(0, 0, 0, 0.0980392) 0),
		white;
	background-position: v-bind(sizeData.position);
	background-size: v-bind(sizeData.size);
}
</style>