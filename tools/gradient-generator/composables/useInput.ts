/*
* Handle text input changes
*/
const useInput = (reference: Ref<number>) => {
	const getEventData = function (event: Event) {
		if (!event.currentTarget) {
			return {
				min: 0,
				max: 0,
				value: 0,
			};
		}

		const min = Number.parseInt(event.currentTarget.min);
		const max = Number.parseInt(event.currentTarget.max);
		const currentValue = Number.parseInt(event.currentTarget.value);

		return {
			min,
			max,
			value: currentValue,
		};
	};

	const setValue = function (value: number) {
		reference.value = value;
	};

	const increaseValue = function (event: Event) {
		const data = getEventData(event);
		const currentValue = reference.value;

		if (currentValue < data.max) {
			setValue(currentValue + 1);
		} else if (currentValue === data.max) {
			setValue(data.min);
		}
	};

	const decreaseValue = function (event: Event) {
		const data = getEventData(event);
		const currentValue = data.value;

		if (currentValue > data.min) {
			setValue(currentValue - 1);
		} else if (currentValue === data.min) {
			setValue(data.max);
		}
	};

	const parseDigits = function (event: Event) {
		const data = getEventData(event);

		// First remove all non-digits chars
		data.value = Number.parseInt(data.value.toString());

		// if not a number then set to min
		if (Number.isNaN(data.value)) {
			data.value = data.min;
		}

		// Check number bounderis
		if (data.value > data.max) {
			data.value = data.max;
		}

		if (data.value < data.min) {
			data.value = data.min;
		}

		setValue(data.value);
	};

	return {
		increaseValue,
		decreaseValue,
		parseDigits,
	};
};

export default useInput;