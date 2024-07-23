import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RegistrationForm } from '../../pages';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import { toast } from 'react-toastify';
import { createAccount } from '../../clients/AccountClients';

jest.mock('../../clients/AccountClients', () => ({
	createAccount: jest.fn(),
}));
jest.mock('react-toastify', () => ({
	toast: {
		error: jest.fn(),
		success: jest.fn(),
	},
}));

describe('RegistrationForm Component', () => {
	let loginInput: HTMLElement;
	let passwordInput: HTMLElement;
	let confirmPasswordInput: HTMLElement;
	let submitButton: HTMLElement;
	beforeEach(() => {
		jest.clearAllMocks();
		render(
			<BrowserRouter>
				<RegistrationForm />
			</BrowserRouter>
		);

		loginInput = screen.getByLabelText('Podaj swój login');
		passwordInput = screen.getByLabelText('Podaj swoje hasło');
		confirmPasswordInput = screen.getByLabelText('Potwierdź hasło');
		submitButton = screen.getByRole('button', { name: /zarejestruj się/i });
	});

	it('should show error message if login is too short', async () => {
		await userEvent.type(loginInput, 'abc');
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Login musi mieć co najmniej 4 znaki'
		);
	});

	it('should show error message if password is incorrect', async () => {
		await userEvent.type(loginInput, 'login');
		await userEvent.type(passwordInput, '!secretpassword');
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Hasło musi zawierać znak specjalny, literą i cyfrę'
		);
	});

	it('should show error message if password and confirm password dosent match', async () => {
		await userEvent.type(loginInput, 'login');
		await userEvent.type(passwordInput, '!1secretpassword');
		await userEvent.type(confirmPasswordInput, '!secretpassword');
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Hasła nie są zgodne. Proszę upewnić się, że oba hasła są identyczne.'
		);
	});
	it('should call createAccount with correct arguments when form is submitted with valid data', async () => {
		await userEvent.type(loginInput, 'validLogin');
		await userEvent.type(passwordInput, 'półciężarówka@1');
		await userEvent.type(confirmPasswordInput, 'półciężarówka@1');
		await userEvent.click(submitButton);

		expect(createAccount).toHaveBeenCalledWith(
			'validLogin',
			'półciężarówka@1',
			expect.any(Function)
		);
	});
});
