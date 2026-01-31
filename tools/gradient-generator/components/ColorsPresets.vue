<template>
	<div class="flex flex-col gap-4 h-full overflow-hidden">
		<div
			class="flex
				grow
				flex-wrap
				gap-2.5
				overflow-auto
				p-0.5
				soft-scrollbar"
		>
			<div
				v-for="(presetObj, index) in presetsFiltered()"
				:key="index"
				class="border-2
					border-white
					cursor-pointer
					relative
					rounded
					shadow-[0px_0px_0px_1px_gray]
					size-10
					transition-opacity
					hover:opacity-100"
				:style="presetObj.style"
				@click="applyGradient(presetObj)"
			/>
		</div>
		<ButtonControl class="py-0.5 text-sm" @click="showPresets = true">
			More
		</ButtonControl>
	</div>
	<Teleport to="body">
		<div
			id="presets-container"
			class="-translate-x-1/2
				bg-(--vp-c-bg)
				duration-300
				fixed
				bottom-0
				left-1/2
				flex
				flex-col
				h-[500px]
				mx-auto
				rounded
				shadow-lg
				transition-transform
				w-[calc(var(--vp-layout-max-width))]
				z-10"
			:class="getPresetsContainerClasses"
		>
			<div class="flex justify-between items-center gap-2 px-6 py-4">
				<h3 class="font-medium text-lg">
					Presets
				</h3>
				<div
					class="cursor-pointer
						opacity-80
						hover:opacity-100
						p-1
						transition-opacity"
					@click="showPresets = false"
				>
					<BsX class="text-xl" />
				</div>
			</div>
			<div
				class="flex
					grow
					flex-wrap
					gap-3
					overflow-auto
					pb-8
					pt-1
					px-6
					soft-scrollbar"
			>
				<div
					v-for="(presetObj, index) in presets"
					:key="index"
					class="border-2
						border-white
						cursor-pointer
						relative
						rounded
						shadow-[0px_0px_0px_1px_gray]
						size-20
						transition-opacity
						hover:opacity-100"
					:style="presetObj.style"
					@click="applyGradient(presetObj)"
				/>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import presets from '../presets';
import ButtonControl from './ButtonControl.vue';
import type { GradientColor } from '@/tools/gradient-generator/types';

type Preset = {
	colors: {
		value: string;
		stop: number;
		status: string;
	}[];
	style: {
		'background-image': string;
	};
	type: 'linear' | 'radial';
	angle: number;
};
const { showPresets } = useGradientStore();
const { selectedGradient } = useGradientStore();

const applyGradient = function (preset: Preset) {
	selectedGradient.value.type = preset.type;
	selectedGradient.value.angle = preset.angle;
	selectedGradient.value.colors = preset.colors.map((color) => {
		return {
			value: {
				hex: color.value,
				hex8: color.value,
			},
			stop: color.stop,
			status: color.status,
		} as GradientColor;
	});
};

const presetsFiltered = function () {
	const presetsLength = presets.length;

	// get 19 random elements
	const randoms = Array.from({ length: 20 }, () => {
		return Math.floor(Math.random() * presetsLength);
	});

	const array: Preset[] = [];
	for (const random of randoms) {
		array.push(presets[random]);
	}
	return array;
};

const getPresetsContainerClasses = computed(() => {
	const classes = [];
	if (showPresets.value) {
		classes.push('translate-y-0');
	} else {
		classes.push('translate-y-full');
	}

	return classes;
});

onKeyStroke('Escape', () => {
	showPresets.value = false;
});
</script>
