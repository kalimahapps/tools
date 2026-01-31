<template>
	<div
		ref="slider"
		class="h-10 mt-2 relative shrink-0 w-full"
	>
		<div
			class="border-2
				border-white
				cursor-copy
				h-full
				relative
				rounded-md
				shadow-[0px_0px_0px_2px_black]
				w-full"
			@click="addColorStop"
		>
			<CheckeredBg size="md" class="rounded-md" />
			<div class="absolute inset-0 rounded-md" :style="displayBarGradient" />
		</div>

		<ColorStop
			v-for="(color, index) in colors"
			:key="index"
			:color="color"
			:index="index"
			:parent-container="slider"
		/>
	</div>
</template>

<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core';
import CheckeredBg from './CheckeredBg.vue';
import ColorStop from './ColorStop.vue';
import type { GradientColor } from '@/tools/gradient-generator/types';
const slider = ref();

const {
	colors,
	selectedGradient,
	setColor,
	generateGradients,
	currentColorIndex,
} = useGradientStore();

const randomColors = [
	'#1abc9c',
	'#16a085',
	'#2ecc71',
	'#27ae60',
	'#3498db',
	'#2980b9',
	'#34495e',
	'#2c3e50',
	'#ea4c88',
	'#ca2c68',
	'#9b59b6',
	'#8e44ad',
	'#f1c40f',
	'#f39c12',
	'#e74c3c',
	'#c0392b',
	'#ecf0f1',
	'#bdc3c7',
	'#7f8c8d',
];

const displayBarGradient = computed(() => {
	/* This function is used to provide the display bar the colors
	for the current selected gradient,
	This will always be linear so we need to perform separate action to getStyle
	*/
	const colorsArray = [];
	let style = '';
	colorsArray.push('90deg');

	const colorsClone: GradientColor[] = JSON.parse(JSON.stringify(colors.value));
	colorsClone.sort((firstColor, secondColor) => {
		return firstColor.stop - secondColor.stop;
	});

	for (const color of colorsClone) {
		if (color.status === 'out') {
			continue;
		}

		colorsArray.push(`${color.value.hex8} ${color.stop}%`);
		style = `linear-gradient(${colorsArray.join(', ')})`;
	}
	return {
		'background-image': style,
	};
});

const addColorStop = function (event: MouseEvent) {
	if (!event.target) {
		return;
	}

	// First get percentage based on click x position
	const containerRect = (event.target as HTMLElement).getBoundingClientRect();
	const { width, left } = containerRect;
	const moveX = event.clientX - left;

	// convert to percentage
	let percentage = (moveX * 100) / width;

	if (percentage < 0) {
		percentage = 0;
	}

	if (percentage > 100) {
		percentage = 100;
	}

	percentage = Math.round(percentage);

	// Choose a random color for the colors array and push it
	const color = randomColors[Math.floor(Math.random() * randomColors.length)];

	const colorObject = {
		value: {
			hex: color,
			hex8: color,
		},
		stop: percentage,
		status: 'in',
	};

	const { colors } = selectedGradient.value;
	colors.push(colorObject);

	// Once the new stop is added to the array set it so user can change its color
	setColor(colors.length - 1);

	generateGradients();
};

onKeyStroke('Delete', () => {
	const { length: colorLength } = selectedGradient.value.colors;
	if (colorLength <= 2) {
		return;
	}

	selectedGradient.value.colors.splice(currentColorIndex.value, 1);
});
</script>