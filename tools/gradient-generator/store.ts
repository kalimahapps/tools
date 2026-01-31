import { cloneObject } from './utils';
import type { GradientOptions, GradientColor } from './types';
import type { Payload } from '@ckpack/vue-color';

const gradientOptions = {
	type: 'linear',
	repeating: {
		selections: [false, true],
		selected: false,
	},
	angle: 0,
	shape: 'circle',
	height: 100,
	width: 100,
	length: 500,
	yOffset: 50,
	xOffset: 50,
	colors: [
		{
			value: {
				hex: '#6a85b6',
				hex8: '#6a85b6ff',
			},
			stop: 0,
			status: 'in',
		},
		{
			value: {
				hex: '#bac8e0',
				hex8: '#bac8e0ff',
			},
			stop: 100,
			status: 'in',
		},
	],
	style: {
		'background-image': '',
	},
	status: 'show',
};

const gradients = ref<GradientOptions[]>([]);
const currentGradientIndex = ref(0);
const currentColorIndex = ref(0);
const colorPickerValue = ref<Payload>({});
const showPresets = ref(false);
const showControlsContainer = ref(true);

/**
 * Only sort colors if they are not equal.
 * This will prevent unexpected behavior. For example, if
 * user moves color stop over another one they might
 * swap which is not what is expected
 *
 * @param  {GradientColor} a Color object
 * @param  {GradientColor} b Color object
 * @return {Number}          Sort order
 */
const sortColors = function (a: GradientColor, b: GradientColor): number {
	if (a.stop !== b.stop) {
		return a.stop - b.stop;
	}

	return 0;
};

// eslint-disable-next-line complexity
const generateGradients = function () {
	for (const [index, gradient] of gradients.value.entries()) {
		const gradientArray = [];
		const colorsArray = [];
		let css = '';

		// Clone colors array and sort
		const colors: GradientColor[] = cloneObject(gradient.colors);
		colors.sort(sortColors);

		for (const color of colors) {
			// If color is out of view (i.e user dragged
			// outside bar but has not deleted it yet don't show it)
			if (color.status === 'out') {
				continue;
			}
			colorsArray.push(`${color.value.hex8} ${color.stop}%`);
		}

		if (gradient.repeating.selected === true) {
			css = 'repeating-';
		}

		// Process each type by combining its related values
		// and set the stack box to represent its colors
		if (gradient.type === 'linear') {
			gradientArray.push(`${gradient.angle}deg`, colorsArray);
			css += `linear-gradient(${gradientArray.join(', ')})`;

			gradients.value[index].style['background-image'] = css;
		}

		if (gradient.type === 'radial') {
			const { yOffset, xOffset, shape, width, height, length } = gradient;

			const sizeCSS = shape === 'ellipse' ? `${width}% ${height}%` : `${length}px`;
			const positionCSS = `${xOffset}% ${yOffset}%`;

			gradientArray.push(colorsArray);

			css += `radial-gradient(${shape} ${sizeCSS} at ${positionCSS}, ${gradientArray.join(', ')})`;

			gradients.value[index].style['background-image'] = css;
		}
	}
};

const fullCss = computed(() => {
	const final = [];

	// First generator gradients
	generateGradients();

	for (const gradient of gradients.value) {
		if (gradient.status === 'hide') {
			continue;
		}

		final.push(gradient.style['background-image']);
	}

	return final.join(', ');
});

export const useGradientStore = () => {
	const selectedGradient = computed({
		get: () => {
			return gradients.value[currentGradientIndex.value] ?? gradientOptions;
		},
		set: (value: GradientOptions) => {
			gradients.value[currentGradientIndex.value] = value;
		},
	});

	const currentColor = computed({
		get: () => {
			return selectedGradient.value.colors[currentColorIndex.value].value.hex8;
		},
		set: (value: Payload) => {
			selectedGradient.value.colors[currentColorIndex.value].value = value;
		},
	});

	const setColor = function (colorIndex: number) {
		currentColorIndex.value = colorIndex;
		currentColor.value = selectedGradient.value.colors[colorIndex].value;
		colorPickerValue.value = selectedGradient.value.colors[colorIndex].value;
	};

	const colors = computed(() => {
		if (gradients.value.length === 0) {
			return [];
		}
		return selectedGradient.value.colors;
	});

	return {
		gradients,
		currentGradientIndex,
		colors,
		currentColor,
		currentColorIndex,
		setColor,
		gradientOptions,
		generateGradients,
		colorPickerValue,
		selectedGradient,
		fullCss,
		showPresets,
		showControlsContainer,
	};
};