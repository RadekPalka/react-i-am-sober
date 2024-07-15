import { render, screen } from '@testing-library/react';
import { RegistrationForm } from '../../pages';

describe('Check number of inputs', () => {
	it('should have three inputs', () => {
		render(<RegistrationForm />);

		const inputElements = screen.findAllByRole('textbox');
		expect(inputElements).toHaveLength(3);
	});
});
