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
	beforeEach(() => {
		jest.clearAllMocks();
		console.log = jest.fn();
	});
	it('should show success message and navigate on successful account creation', async () => {
		mockedApi.post.mockResolvedValueOnce({ data: {} });
		await createAccount('login', 'password', mockNavigate);
		expect(console.log).toHaveBeenCalled();
		expect(toast.success).toHaveBeenCalledWith(
			'Rejestracja zakończona sukcesem'
		);
		expect(mockNavigate).toHaveBeenCalledWith('/login-page');                      	xa
	});
	it('should show error when username is already taken', async () => {
		mockedApi.post.mockRejectedValueOnce({
			response: { status: 400 },
		});

		await createAccount('login', 'password', mockNavigate);

		expect(toast.error).toHaveBeenCalledWith('Podany login jest już zajęty');
	});
});
