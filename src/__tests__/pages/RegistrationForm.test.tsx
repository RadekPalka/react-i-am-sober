import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RegistrationForm } from '../../pages';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
	toast: {
		error: jest.fn(),
		success: jest.fn(),
	},
}));

describe('RegistrationForm Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
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
	it('should show error message if login is too short', async () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const loginInput = screen.getByLabelText('Podaj swój login');
		const submitButton = screen.getByRole('button');

		await userEvent.type(loginInput, 'abc');
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Login musi mieć co najmniej 4 znaki'
		);
	});

	it('should show error message if login is incorrect', async () => {
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		const loginInput = screen.getByLabelText('Podaj swój login');
		const passwordInput = screen.getByLabelText('Podaj swoje hasło');
		const submitButton = screen.getByRole('button');

		await userEvent.type(loginInput, 'login');
		await userEvent.type(passwordInput, '!secretpassword');
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Hasło musi zawierać znak specjalny, literą i cyfrę'
		);
	});
});
