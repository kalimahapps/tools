<template>
	<div class="flex items-center gap-2">
		<h4 class="text-xs">
			{{ title }}
		</h4>
		<div class="flex">
			<div
				v-for="(option, index) in options"
				:key="index"
				class="border
					border-(--vp-c-brand-1)
					border-opacity-50
					cursor-pointer
					flex
					justify-center
					items-center
					px-2
					text-(--vp-c-brand-1)
					text-sm
					transition-colors
					hover:bg-(--vp-c-brand-soft)"
				:class="getClasses(option)"
				@click="selected = option"
			>
				{{ option }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	/**
	 * The title of the button group.
	 */
	title: {
		type: String,
		required: true,
	},

	/**
	 * The options to display in the button group.
	 */
	options: {
		type: Array as PropType<string[]>,
		required: true,
	},
});

const selected = defineModel({
	type: String,
	required: true,
});

const getClasses = function (option: string) {
	const classes = [];
	if (selected.value === option) {
		classes.push('bg-[var(--vp-c-brand-1)] hover:!bg-[var(--vp-c-brand-1)] !text-white');
	}

	return classes;
};
</script>