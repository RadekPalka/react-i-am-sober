import { createAccount } from '../../clients/AccountClients';
import api from '../../api/api';

import { toast } from 'react-toastify';

const mockNavigate = jest.fn();

jest.mock('../../api/api', () => ({
	post: jest.fn(),
}));
jest.mock('react-toastify', () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));
const mockedApi = api as jest.Mocked<typeof api>;

describe('api tests', () => {
	it('should show success message and navigate on successful account creation', async () => {
		mockedApi.post.mockResolvedValueOnce({ data: {} });
		await createAccount('login', 'password', mockNavigate);

		expect(toast.success).toHaveBeenCalledWith(
			'Rejestracja zakończona sukcesem'
		);
		expect(mockNavigate).toHaveBeenCalledWith('/login-page');
	});
});
