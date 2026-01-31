<template>
	<div
		class="absolute
			top-0
			group
			h-full
			transform
			transition-shadow
			w-[10px]
			z-1"
		:style="{
			left: selectedGradient.colors[index].stop + '%'
		}"
		:class="{
			hidden: selectedGradient.colors[index].status == 'out',
		}"
	>
		<span
			class="-translate-x-1/2
				absolute
				bottom-[85%]
				left-0
				border-[2px]
				border-white
				cursor-move
				flex
				justify-center
				items-center
				h-[20px]
				rotate-[-45deg]
				rounded-[40%_60%_100%_0%/100%_60%_40%_0%]
				shadow-[0px_0px_0px_2px_black]
				w-[20px]"
			:style="getStyle"
			@mousedown="dragStart(index)"
		/>
		<span
			class="-translate-x-1/2
				absolute
				bottom-full
				left-0
				transform
				translate-y-[-80%]"
		>
			<input
				v-model="colorStop"
				type="number"
				class="bg-(--vp-c-bg)!
					border!
					border-solid!
					border-zinc-600!
					rounded-md
					text-center
					focus:text-base
					transition-all
					focus:py-1!
					focus:w-12"
				min="0"
				size="3"
				max="100"
				:class="getInputClasses"
				@focus="onInputFocus(index)"
				@keydown.up.stop.prevent="increaseValue"
				@keydown.down.stop.prevent="decreaseValue"
				@input="parseDigits"
			>
		</span>
	</div>
</template>

<script lang="ts" setup>
const { parentContainer, color, index } = defineProps({
	/**
	 * The color of the stop
	 */
	color: {
		type: Object,
		required: true,
	},

	/**
	 * The index of the stop
	 */
	index: {
		type: Number,
		required: true,
	},

	/**
	 * The parent container
	 */
	parentContainer: {
		type: Object,
		required: true,
	},
});

const {
	selectedGradient,
	generateGradients,
	setColor,
	currentColorIndex,
} = useGradientStore();

const containerRect = ref();
const dragging = ref(false);

const colorStop = computed({
	get: () => {
		return selectedGradient.value.colors[index].stop;
	},
	set: (value: number) => {
		selectedGradient.value.colors[index].stop = value;
	},
});

const getStyle = computed(() => {
	const color = selectedGradient.value.colors[index];

	const style = {
		'background-color': color.value.hex,
		'box-shadow': '',
	};

	const isSelected = currentColorIndex.value === index;
	const isDragged = color.status === 'dragged';
	if (isSelected || isDragged) {
		style['box-shadow'] = '0 0 0 2px #2b2b2b, 0 0 0px 5px rgba(180, 180, 180, 0.6)';
	}
	return style;
});

const dragStart = function (index: number) {
	dragging.value = true;
	selectedGradient.value.colors[index].status = 'dragged';
	setColor(index);
};

const {
	increaseValue,
	decreaseValue,
	parseDigits,
} = useInput(colorStop);

const onInputFocus = function (index: number) {
	setColor(index);
};

const getInputClasses = computed(() => {
	const isSelected = currentColorIndex.value === index;
	const isDragged = color.status === 'dragged';
	return isSelected || isDragged ? 'text-base w-12 py-1' : 'text-xs w-10 py-1';
});

const dragStop = function () {
	if (!dragging.value) {
		return;
	}
	dragging.value = false;
	const { status } = color;

	// If element has been dragged out then delete it
	// (we have already checked we have more than two colors in doDrag function)
	if (status === 'out') {
		selectedGradient.value.colors.splice(index, 1);
	} else {
		selectedGradient.value.colors[index].status = 'in';
	}
};

const doDrag = function (event: MouseEvent) {
	if (!dragging.value) {
		return;
	}

	containerRect.value = parentContainer.getBoundingClientRect();

	// Get container coords
	const { left, top, height, width } = containerRect.value;

	// Get mouse position
	const x = event.clientX;
	const y = event.clientY;

	// Get how much the point should be moved
	const moveX = x - left;
	const moveYTop = y - (top - height);
	const moveYBottom = y - ((top + height) * 2);

	// Get move in percentage
	let percentage = (moveX * 100) / width;
	percentage = Math.min(Math.max(percentage, 0), 100);

	percentage = Math.round(percentage);

	selectedGradient.value.colors[index].stop = percentage;

	// If stop was dragged outside (i.e mouse moved outside bar)
	// then hide the stop. Also, it will be filtered out of the colors array
	// This will happen only if we have more then two elements
	const { length: colorLength } = selectedGradient.value.colors;
	selectedGradient.value.colors[index].status = (moveYTop <= 0 || moveYBottom >= 0) && colorLength > 2 ? 'out' : 'dragged';

	generateGradients();
};

onBeforeMount(() => {
	document.addEventListener('mouseup', dragStop);
	document.addEventListener('mousemove', doDrag);
});

onMounted(() => {
	containerRect.value = parentContainer?.getBoundingClientRect();
});
</script>