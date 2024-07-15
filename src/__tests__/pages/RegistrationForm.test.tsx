import { render, screen } from '@testing-library/react';
import { RegistrationForm } from '../../pages';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
describe('Check number of inputs', () => {
	it('should have three inputs', () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const inputElements = screen.findAllByRole('textbox');
		expect(inputElements).toHaveLength(3);
	});
});
