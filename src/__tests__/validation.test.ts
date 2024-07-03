// __tests__/example.test.ts

import { validateInput } from '../utils/validation';

describe('Validation functions', () => {
	it('should return true for valid input', () => {
		const regex = /^[a-zA-Z0-9]+$/;
		const input = 'ValidInput123';
		expect(validateInput(input, regex)).toBe(true);
	});

	it('should return false for invalid input', () => {
		const regex = /^[a-zA-Z0-9]+$/;
		const input = 'Invalid Input!';
		expect(validateInput(input, regex)).toBe(false);
	});
});
