<template>
	<div
		class="-translate-x-1/2
			hover:opacity-100
			absolute
			left-1/2
			bg-(--vp-c-bg)
			border-radius-0.3em-0.3em-0-0
			duration-300
			flex
			flex-col
			gap-6
			h-[400px]
			mx-auto
			opacity-10
			p-4
			px-6
			select-none
			shadow-lg
			transform
			transition-all
			w-full"
		:class="getContainerClasses"
	>
		<ColorSlider />
		<Divider />
		<div
			class="flex grow gap-5 overflow-auto"
		>
			<div
				class="flex grow-0 shrink-0 flex-col overflow-auto w-[11%]"
			>
				<h3 class="font-medium">
					Stack
				</h3>
				<GradientStack />
			</div>
			<Divider direction="vertical" />
			<div
				class="flex
					grow-0
					shrink-0
					flex-col
					gap-3
					overflow-auto
					w-[21%]"
			>
				<h3 class="font-medium">
					Options
				</h3>
				<ButtonGroup
					v-model="selectedGradient.type"
					title="Type"
					:options="['linear', 'radial']"
				/>
				<template v-if="selectedGradient.type === 'radial'">
					<ButtonGroup
						v-model="selectedGradient.shape"
						title="Shape"
						:options="['ellipse', 'circle']"
					/>
					<template v-if="selectedGradient.shape === 'ellipse'">
						<RangeControl
							v-model.number="selectedGradient.width"
							title="Width"
							:min="0"
							:max="100"
							:step="1"
							unit="%"
						/>
						<RangeControl
							v-model.number="selectedGradient.height"
							title="Height"
							:min="0"
							:max="100"
							:step="1"
							unit="%"
						/>
					</template>
					<template v-if="selectedGradient.shape === 'circle'">
						<RangeControl
							v-model.number="selectedGradient.length"
							title="Length"
							:min="0"
							:max="1000"
							:step="1"
							unit="px"
						/>
					</template>
					<RangeControl
						v-model.number="selectedGradient.yOffset"
						title="Y-Offset"
						:min="0"
						:max="100"
						:step="1"
						unit="%"
					/>
					<RangeControl
						v-model.number="selectedGradient.xOffset"
						title="X-Offset"
						:min="0"
						:max="100"
						:step="1"
						unit="%"
					/>
				</template>
				<KnobControl
					v-if="selectedGradient.type === 'linear'"
					v-model="selectedGradient.angle"
					class="mt-8"
				/>
			</div>
			<Divider direction="vertical" />
			<div class="flex shrink-0 flex-col overflow-auto">
				<h3 class="font-medium">
					Colors
				</h3>
				<Chrome v-model="colorPickerValue" />
			</div>
			<Divider direction="vertical" />
			<div class="flex flex-col overflow-auto">
				<h3 class="font-medium">
					Presets
				</h3>
				<ColorsPresets />
			</div>
			<Divider direction="vertical" />
			<div class="flex shrink-0 justify-between flex-col">
				<VuePopper hover placement="top" :show-arrow="false">
					<ButtonControl
						class="p-2 text-sm"
						@click="copy(fullCss)"
					>
						<CoCopy v-if="!copied" />
						<AkCheck v-if="copied" />
					</ButtonControl>
					<template #content>
						<div class="p-2 text-xs">
							Copy the CSS code
						</div>
					</template>
				</VuePopper>
				<VuePopper hover placement="top" :show-arrow="false">
					<ButtonControl
						class="p-2 text-sm"
						@click="resetSelectedGradient"
					>
						<ReResetLeftLine />
					</ButtonControl>
					<template #content>
						<div class="p-2 text-xs">
							Reset the gradient
						</div>
					</template>
				</VuePopper>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Payload } from '@ckpack/vue-color';
import { Chrome } from '@ckpack/vue-color';
import VuePopper from '@kalimahapps/vue-popper';
import { useClipboard } from '@vueuse/core';
import ColorSlider from './ColorSlider.vue';
import GradientStack from './GradientStack.vue';
import RangeControl from './RangeControl.vue';
import Divider from './Divider.vue';
import ColorsPresets from './ColorsPresets.vue';
import KnobControl from './KnobControl.vue';
import ButtonGroup from './ButtonGroup.vue';
import ButtonControl from './ButtonControl.vue';

const {
	currentColor,
	colorPickerValue,
	selectedGradient,
	gradientOptions,
	fullCss,
	showControlsContainer,
} = useGradientStore();

const updatePicker = function (color: Payload) {
	currentColor.value = color;
};

const { copy, copied } = useClipboard();

const resetSelectedGradient = function () {
	selectedGradient.value = cloneObject(gradientOptions);
};

const getContainerClasses = computed(() => {
	const classes = [];
	if (showControlsContainer.value) {
		classes.push('bottom-0');
	} else {
		classes.push('-bottom-[312px]');
	}

	return classes;
});
watch(() => {
	return colorPickerValue;
}, () => {
	updatePicker(colorPickerValue.value);
}, {
	deep: true,
});
</script>

<style>
.vc-chrome{
	background-color: transparent !important;
	font-family: inherit !important;
	box-shadow: none !important;
}

.vc-chrome-body{
	background-color: transparent !important;
	border: 1px solid var(--vp-c-border) !important;
	border-top: none !important;
}
</style>