<template>
	<div class="flex justify-center relative" @wheel="handleCircleValue">
		<div
			ref="knobRange"
			class="border-2
				border-solid
				border-zinc-600/20
				relative
				rounded-full
				size-28
				transition-colors"
			:class="isKnobClicked ? 'border-(--vp-c-brand-soft)!' : ''"
			@click="updateCirclePosition"
		>
			<div class="absolute size-full" :style="getRotation">
				<div
					ref="knob"
					class="-translate-x-1/2
						-translate-y-1/2
						absolute
						top-0
						left-1/2
						bg-(--vp-c-brand-1)
						cursor-pointer
						rounded-full
						size-3.5"
				/>
			</div>
		</div>
		<div
			class="absolute
				flex
				justify-center
				items-center
				flex-col
				gap-1
				pointer-events-none
				size-full"
		>
			<span>
				<input
					v-model="degree"
					type="number"
					class="border
						focus:border-zinc-600/80
						border-solid
						border-transparent
						pointer-events-auto
						py-0.5
						rounded
						text-center
						text-lg
						transition-colors"
					min="0"
					max="360"
					size="3"
					step="1"
					@keydown.up.stop.prevent="increaseValue"
					@keydown.down.stop.prevent="decreaseValue"
					@input="parseDigits"
				>
			</span>
			<span class="text-xs">deg</span>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * The state of the knob click
 */
const isKnobClicked = ref(false);

/**
 * The knob control component
 */
const knobRange = ref<HTMLElement>();

/**
 * The circle bounding box
 */
const circle = ref();

/**
 * The knob ref
 */
const knob = ref();

/**
 * The degree value
 */
const degree = defineModel({
	type: Number,
	required: true,
});

const { increaseValue, decreaseValue, parseDigits } = useInput(degree);

const updateCirclePosition = function () {
	circle.value = knobRange.value.getBoundingClientRect();
	circle.value.radius = circle.value.height / 2;
};

const handleCircleValue = function (event: WheelEvent) {
	const max = 360;
	const current = degree.value;

	// Scrolling up
	if (event.deltaY < 0) {
		degree.value = current < max ? current + 1 : 0;
	}

	// Scrolling down
	if (event.deltaY > 0) {
		degree.value = current > 0 ? current - 1 : 360;
	}
};

const moveCircle = function (event: MouseEvent) {
	if (!isKnobClicked.value) {
		return;
	}

	const left = event.clientX - circle.value.x;
	const top = event.clientY - circle.value.y;

	const dx = circle.value.radius - left;
	const dy = circle.value.radius - top;

	// get angle
	const angle = Math.atan2(dy, dx);

	// -90 to start from from top center
	let degrees = ((angle * 180) / Math.PI) - 90;

	// the first quarter will be over positive and the rest of the circle will negative degrees.
	// Adjust for that case
	if (degrees < 0) {
		degrees = 360 - Math.abs(degrees);
	}

	degree.value = Number.parseInt(degrees);
};

const getRotation = computed(function () {
	return {
		transform: `rotate(${degree.value}deg)`,
	};
});

onBeforeMount(() => {
	// attach events to move picker inside wheel
	document.addEventListener('mousedown', (event: MouseEvent) => {
		if (event.target === knob.value) {
			isKnobClicked.value = true;
		}
	});

	document.addEventListener('mouseup', () => {
		return isKnobClicked.value = false;
	});
	document.addEventListener('mousemove', moveCircle);

	window.addEventListener('resize', updateCirclePosition);
});

onMounted(() => {
	updateCirclePosition();
});
</script>