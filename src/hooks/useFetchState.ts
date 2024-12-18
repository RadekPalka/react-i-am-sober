import { useMemo, useState } from 'react';
type Status = 'loading' | 'success' | 'error';
type StatusKeys = Record<Status, string>;
export const useFetchState = (
	successTitle: string = 'Success',
	initialValue: Status = 'loading'
): [Status, (newValue: Status) => void] => {
	const titles = useMemo<StatusKeys>(
		() => ({
			loading: 'Loading',
			success: successTitle,
			error: 'Error',
		}),
		[successTitle]
	);
	const [value, setValue] = useState(initialValue);

	const updateValue = (newValue: Status) => {
		setValue(newValue);
	};
	document.title = titles[value];

	return [value, updateValue];
};
