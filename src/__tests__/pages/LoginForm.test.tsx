import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LoginForm } from '../../pages';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import { toast } from 'react-toastify';
import { loginAction } from '../../clients/AccountClients';

jest.mock('../../clients/AccountClients', () => ({
	loginAction: jest.fn(),
}));
jest.mock('react-toastify', () => ({
	toast: {
		error: jest.fn(),
		success: jest.fn(),
	},
}));

describe('LoginForm component', () => {
	let loginInput: HTMLElement;
	let passwordInput: HTMLElement;
	let submitButton: HTMLElement;

	beforeEach(() => {
		jest.clearAllMocks();
		render(
			<BrowserRouter>
				<LoginForm />
			</BrowserRouter>
		);

		loginInput = screen.getByLabelText('Login');
		passwordInput = screen.getByLabelText('Hasło');

		submitButton = screen.getByRole('button', { name: /zaloguj się/i });
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
	it('should call loginAction with correct arguments when form is submitted with valid data', async () => {
		await userEvent.type(loginInput, 'validLogin');
		await userEvent.type(passwordInput, 'półciężarówka@1');

		await userEvent.click(submitButton);

		expect(loginAction).toHaveBeenCalledWith(
			'validLogin',
			'półciężarówka@1',
			expect.any(Function)
		);
	});
});
