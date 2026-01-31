<template>
	<div class="display flex items-end gap-1 group relative w-full" @wheel="handleScroll">
		<span
			class="absolute
				top-0
				capitalize
				group-focus-within:opacity-100
				opacity-50
				pointer-events-none
				text-gray-400
				text-left
				text-xs
				title
				transition-all
				z-10"
		>
			{{ title }}
		</span>
		<div class="flex grow">
			<input
				v-model="amount"
				type="range"
				:min="min"
				:max="max"
				:step="step"
				class="bg-zinc-300! cursor-pointer h-px w-full"
			>
		</div>
		<div class="text-end text-xs w-1/5">
			{{ amount }}{{ unit }}
		</div>
	</div>
</template>

<script setup lang="ts">
const { max, step } = defineProps({
	/**
	 * The title of the control.
	 */
	title: {
		type: String,
		required: true,
	},

	/**
	 * The minimum value of the range.
	 */
	min: {
		type: Number,
		required: true,
	},

	/**
	 * The maximum value of the range.
	 */
	max: {
		type: Number,
		required: true,
	},

	/**
	 * The step value of the range.
	 */
	step: {
		type: Number,
		required: true,
	},

	/**
	 * The unit to display after the amount.
	 */
	unit: {
		type: String,
		required: true,
	},
});

const amount = defineModel({
	type: Number,
	required: true,
});

const handleScroll = function (event: WheelEvent) {
	const current = amount.value;

	// Scrolling up
	if (event.deltaY < 0 && current < max) {
		amount.value = current + step;
	}

	// Scrolling down
	if (event.deltaY > 0 && current > 0) {
		amount.value = current - step;
	}
};
</script>

<style scoped>
input[type='range'] {
  --size: 10px;
  --width: 100%;
  --height: 2px;

  /* fix for FF unable to apply focus style bug  */
  border: 1px solid transparent;

  /*required for proper track sizing in FF*/
  width: 100%;

  /* Webkit */
  -webkit-appearance: none;

  &::-webkit-slider-runnable-track {
    width: var(--width);
    height: var(--height);
    border: none;
    border-radius: 3px;
    transition: all 0.2s;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: var(--size);
    width: var(--size);
    border-radius: 50%;
    background: var(--vp-c-brand-3);
    margin-top: -4px;
  }

  &:focus {
    outline: none;

    &::-moz-range-track {
      background: var(--vp-c-brand-soft);
    }

    &::-webkit-slider-runnable-track {
      background: var(--vp-c-brand-soft);
    }

    &::-ms-fill-lower {
      background: var(--vp-c-brand-soft);
    }

    &::-ms-fill-upper {
      background: var(--vp-c-brand-soft);
    }
  }

  /* FF */
  &::-moz-range-track {
    width: var(--width);
    height: var(--height);
    border: none;
    border-radius: 3px;
    transition: all 0.2s;
    z-index: 2;
  }

  &::-moz-range-thumb {
    border: none;
    height: var(--size);
    width: var(--size);
    border-radius: 50%;
    background: var(--vp-c-brand-3);
    z-index: 2;
  }

  /*hide the outline behind the border*/
  &:-moz-focusring {
    outline: 1px solid white;
    outline-offset: -1px;
  }

  /* IE*/
  &::-ms-track {
    width: var(--width);
    height: var(--height);

    /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
    background: transparent;

    /*leave room for the larger thumb to overflow with a transparent border */
    border-color: transparent;
    border-width: 6px 0;

    /*remove default tick marks*/
    color: transparent;
  }

  &::-ms-fill-lower {
    border-radius: 10px;
  }

  &::-ms-fill-upper {
    border-radius: 10px;
  }

  &::-ms-thumb {
    border: none;
    height: var(--size);
    width: var(--size);
    border-radius: 50%;
    background: var(--vp-c-brand-3);
    transform: translateY(20%);
  }
}
</style>