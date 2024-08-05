import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RegistrationForm } from '../../pages';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import { toast } from 'react-toastify';
import { createAccount } from '../../clients/AccountClients';
import {
	validateInputLength,
	validateInput,
	compareStrings,
} from '../../utils/validation';
jest.mock('../../clients/AccountClients', () => ({
	createAccount: jest.fn(),
}));
jest.mock('react-toastify', () => ({
	toast: {
		error: jest.fn(),
		success: jest.fn(),
	},
}));
jest.mock('../../utils/validation', () => ({
	validateInputLength: jest.fn(),
	validateInput: jest.fn(),
	compareStrings: jest.fn(),
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
		(validateInputLength as jest.Mock).mockReturnValue(false);
		(validateInput as jest.Mock).mockRejectedValue(false);
		(compareStrings as jest.Mock).mockReturnValue(false);
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Login musi mieć co najmniej 4 znaki'
		);
	});

	it('should show error message if password is incorrect', async () => {
		(validateInputLength as jest.Mock).mockReturnValue(true);
		(validateInput as jest.Mock).mockReturnValue(false);
		(compareStrings as jest.Mock).mockReturnValue(true);
		await userEvent.type(loginInput, 'validLogin');
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Hasło musi zawierać znak specjalny, literą i cyfrę'
		);
	});

	it('should show error message if password and confirm password dosent match', async () => {
		(validateInputLength as jest.Mock).mockReturnValue(true);
		(validateInput as jest.Mock).mockReturnValue(true);
		(compareStrings as jest.Mock).mockReturnValue(false);
		await userEvent.click(submitButton);

		expect(toast.error).toHaveBeenCalledWith(
			'Hasła nie są zgodne. Proszę upewnić się, że oba hasła są identyczne.'
		);
	});
	it('should call createAccount with correct arguments when form is submitted with valid data', async () => {
		(validateInputLength as jest.Mock).mockReturnValue(true);
		(validateInput as jest.Mock).mockReturnValue(true);
		(compareStrings as jest.Mock).mockReturnValue(true);
		await userEvent.click(submitButton);

		expect(createAccount).toHaveBeenCalled();
	});
});
