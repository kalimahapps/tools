import RangeControl from '../components/RangeControl.vue';
import KnobControl from '../components/KnobControl.vue';

import { mount } from '@vue/test-utils';
import { expect, it, describe } from 'vitest';

describe('ControlsContainer', () => {
	it('renders RangeControl', async () => {
		const wrapper = mount(RangeControl, {
			// attachTo: document.body,
			props: {
				'title': 'Test',
				'min': 0,
				'max': 100,
				'step': 1,
				'unit': 'px',
				'modelValue': 0,
				'onUpdate:modelValue': (value: number) => {
					wrapper.setProps({ modelValue: value });
				},
			},
		});

		await wrapper.trigger('wheel', { deltaY: -1 });
		await wrapper.trigger('wheel', { deltaY: -1 });
		expect(wrapper.props().modelValue).toBe(2);

		await wrapper.trigger('wheel', { deltaY: 1 });
		await wrapper.trigger('wheel', { deltaY: 1 });
		expect(wrapper.props().modelValue).toBe(0);
	});

	it('renders KnobControl', async () => {
		const wrapper = mount(KnobControl, {
			attachTo: document.body,
			props: {
				'modelValue': 0,
				'onUpdate:modelValue': (value: number) => {
					wrapper.setProps({ modelValue: value });
				},
			},
		});

		// Test wheel event
		await wrapper.trigger('wheel', { deltaY: -1 });
		await wrapper.trigger('wheel', { deltaY: -1 });
		expect(wrapper.props().modelValue).toBe(2);

		await wrapper.trigger('wheel', { deltaY: 1 });
		await wrapper.trigger('wheel', { deltaY: 1 });
		expect(wrapper.props().modelValue).toBe(0);

		// Scrolling down after reaching 0 should set the value to 360
		await wrapper.trigger('wheel', { deltaY: 1 });
		expect(wrapper.props().modelValue).toBe(360);

		// Scrolling up after reaching 360 should set the value to 0
		await wrapper.trigger('wheel', { deltaY: -1 });
		expect(wrapper.props().modelValue).toBe(0);

		const knobWrapper = wrapper.get({ ref: 'knob' });
		await knobWrapper.trigger('mousedown');

		// console.log(wrapper.find({ ref: 'knob' }));
		document.dispatchEvent(new MouseEvent('mousemove', {
			clientX: 200,
			clientY: 300,
		}));
		await nextTick();

		expect(wrapper.props().modelValue).toBe(146);

		document.dispatchEvent(new MouseEvent('mouseup'));
		expect(wrapper.vm.isKnobClicked).toBe(false);

		// Test input v-model
		const inputElement = wrapper.find('input');
		await inputElement.setValue(10);
		expect(wrapper.props().modelValue).toBe(10);

		// test input with arrow keys
		await inputElement.trigger('keydown', { key: 'up' });
		await inputElement.trigger('keydown', { key: 'up' });
		expect(wrapper.props().modelValue).toBe(12);

		await inputElement.trigger('keydown', { key: 'down' });
		await inputElement.trigger('keydown', { key: 'down' });
		await inputElement.trigger('keydown', { key: 'down' });

		expect(wrapper.props().modelValue).toBe(9);
	});
});