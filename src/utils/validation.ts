export const validateInputLength = (
	input: string,
	minLength: number
): boolean => {
	return input.length >= minLength;
};
export const validateInput = (input: string, regex: RegExp): boolean => {
	return regex.test(input);
};
export const compareStrings = (str1: string, str2: string): boolean => {
	return str1 === str2;
};
