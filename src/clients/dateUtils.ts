export const formatDateForInput = (date: Date): string => {
	return date.toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};

export const formatDateForDisplay = (date: Date): string => {
	return date.toLocaleDateString('pl', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};
