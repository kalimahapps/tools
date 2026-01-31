<template>
	<div
		class="bg-sky-50
			dark:bg-sky-950
			border
			dark:border-sky-800
			border-sky-300
			end-0
			fixed
			bottom-8
			flex
			items-center
			flex-wrap
			gap-2
			max-w-xl
			p-4
			rounded
			transition-all
			dark:text-sky-200"
		:class="canDisplay ? 'translate-x-0' : 'translate-x-full'"
	>
		<div
			class="absolute
				top-0
				cursor-pointer
				end-2
				opacity-50
				hover:opacity-100
				p-2
				text-2xl
				transition-opacity"
			@click="onCloseClick"
		>
			×
		</div>
		<div
			class="flex
				sm:flex-row
				items-center
				flex-col
				gap-4
				md:gap-8
				w-full"
		>
			<img src="/safha.png" alt="Safha Nuxtjs" class="h-[75px]">
			<div
				class="flex flex-col gap-2"
			>
				<h1 class="font-bold text-xl">
					Try Safha!
				</h1>
				<div class="">
					Multipurpose, Clean and Modern Nuxt.js UI Kit
				</div>
			</div>
		</div>
		<div class="flex justify-center gap-8 ms-auto w-full md:w-1/2">
			<div
				v-for="counter in counters"
				:key="counter.label"
				class="flex justify-center items-center flex-col gap-1"
			>
				<span class="font-medium">
					{{ counter.value }}
				</span>
				<span>
					{{ counter.label }}
				</span>
			</div>
		</div>
		<div
			class="flex
				justify-center
				items-center
				gap-4
				mt-4
				md:mt-0
				w-full
				md:w-1/3"
		>
			<div>
				<a
					href="https://safha.kalimah-apps.com/"
					class="bg-emerald-500
						dark:bg-emerald-800
						hover:bg-emerald-600
						no-underline!
						px-4
						py-2
						rounded-md
						text-white!
						transition-all!"
				>
					Explore
				</a>
			</div>
			<div>
				<a
					href="https://kalimahapps.lemonsqueezy.com/buy/1aaaaddf-53d2-4ff5-8669-1e2786431f62"
					class="bg-sky-500
						dark:bg-sky-800
						hover:bg-sky-600
						no-underline!
						px-4
						py-2
						rounded-md
						text-white!
						transition-all!"
				>
					Buy
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
const counters = [
	{
		label: 'Components',
		value: '110+',
	},
	{
		label: 'Demos',
		value: '30+',
	},
];

const lastPromotion = useStorage('safha-promotion', 0);
const canDisplay = computed(() => {
	if (!lastPromotion.value) {
		return true;
	}

	const now = Date.now();
	const weekInMs = 1000 * 60 * 60 * 24 * 7;
	if (now - lastPromotion.value > weekInMs) {
		return true;
	}

	return false;
});

const onCloseClick = () => {
	lastPromotion.value = Date.now();
};
</script>
