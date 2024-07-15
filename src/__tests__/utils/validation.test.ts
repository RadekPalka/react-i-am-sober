import { validateInput } from '../../utils/validation';
import { PASSWORD_REGEX } from '../../utils/constans';

describe('Validation functions', () => {
	it('should return true for valid input', () => {
		const input = '!ValidInput123';
		expect(validateInput(input, PASSWORD_REGEX)).toBe(true);
	});
	it('should return true for valid input', () => {
		const input = '!1Tajnehasło';
		expect(validateInput(input, PASSWORD_REGEX)).toBe(true);
	});

	it('should return false for invalid input', () => {
		const input = 'Invalid Input!';
		expect(validateInput(input, PASSWORD_REGEX)).toBe(false);
	});
});
