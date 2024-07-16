import { render, screen } from '@testing-library/react';
import user, { userEvent } from '@testing-library/user-event';
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
	it('should update login, password and confirm password states on input change', async () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const loginInput = screen.getByLabelText('Podaj swój login');
		const passwordInput = screen.getByLabelText('Podaj swoje hasło');
		const confirmPasswordInput = screen.getByLabelText('Potwierdź hasło');

		await userEvent.type(loginInput, 'testuser');
		await userEvent.type(passwordInput, 'Test@1234');
		await userEvent.type(confirmPasswordInput, 'Test@1234');
		console.log(loginInput);

		expect(loginInput).toHaveValue('testuser');
		expect(passwordInput).toHaveValue('Test@1234');
		expect(confirmPasswordInput).toHaveValue('Test@1234');
	});
});
