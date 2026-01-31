<template>
	<div
		class="h-[calc(100dvh-64px)]
			max-w-[1040px]
			mx-auto
			overflow-hidden
			relative"
	>
		<div
			class="fixed inset-0 z-1"
			:style="{
				background: fullCss
			}"
		/>
		<CheckeredBg class="fixed~ z-0" size="lg" />
		<ControlsContainer	id="controls-container" class="z-2" />
	</div>
</template>

<script lang="ts" setup>
import ControlsContainer from './components/ControlsContainer.vue';
import CheckeredBg from './components/CheckeredBg.vue';
const { fullCss, showPresets, showControlsContainer } = useGradientStore();

onBeforeMount(() => {
	/**
	 * Close the presets container when scrolling down
	 */
	/* eslint {complexity: ["warn", 7]} */
	window.addEventListener('wheel', (event: WheelEvent) => {
		// Scrolling up
		if (event.deltaY < 0) {
			showControlsContainer.value = event.deltaY < 0;
			return;
		}

		const target = event.target as HTMLElement;

		// Scrolling down
		if (showPresets.value) {
			const parent = target.closest('#presets-container');
			if (parent || target.id === 'presets-container') {
				return;
			}
			showPresets.value = false;

			return;
		}

		// check parents for controls-container
		const parent = target.closest('#controls-container');
		if (parent || target.id === 'controls-container') {
			return;
		}

		showControlsContainer.value = false;
	});
});
</script>