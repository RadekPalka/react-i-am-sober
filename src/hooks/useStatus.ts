import { useMemo, useState } from 'react';
type Status = 'loading' | 'success' | 'error';
export type StatusKeys = Record<Status, string>;
export const useStatus = (
	initialValue: Status,
	title: string = 'Success'
): [Status, (newValue: Status) => void] => {
	const titles = useMemo<StatusKeys>(
		() => ({
			loading: 'Loading',
			success: title,
			error: 'Error',
		}),
		[title]
	);
	const [value, setValue] = useState(initialValue);

	const updateValue = (newValue: Status) => {
		setValue(newValue);
	};
	document.title = titles[value];

	return [value, updateValue];
};
