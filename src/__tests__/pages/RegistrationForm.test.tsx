import { render, screen } from '@testing-library/react';
import { RegistrationForm } from '../../pages';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';

describe('RegistrationForm Component', () => {
	it('should render the login input with correct label', async () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const loginInputElement = await screen.findByLabelText('Podaj swój login');
		expect(loginInputElement).toBeInTheDocument();
	});

	it('should render the password input with correct label', async () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const passwordInputElement = await screen.findByLabelText(
			'Podaj swoje hasło'
		);
		expect(passwordInputElement).toBeInTheDocument();
	});

	it('should render the confirm password input with correct label', async () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const confirmPasswordInputElement = await screen.findByLabelText(
			'Potwierdź hasło'
		);
		expect(confirmPasswordInputElement).toBeInTheDocument();
	});
});
