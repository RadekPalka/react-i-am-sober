export const formatDateForInput = (date: Date): string => {
	return date
		.toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
		.replace(',', '');
};
