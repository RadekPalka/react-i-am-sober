import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './StyledButton';
import { logout } from '../clients/AccountClients';
import { removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';

export const LogoutButton: React.FC = () => {
	const navigate = useNavigate();
	const handleLogoutButton = () => {
		logout()
			.then((res) => {
				removeToken();
				console.log(res);
				toast.success('Zostałeś wylogowany(a) pomyślnie');
				navigate('/login-page');
			})
			.catch((error) => {
				console.log(error);
				toast.error('Błąd połączenia. Spróbuj ponownie później');
			});
	};
	return (
		<StyledButton
			$padding='6px'
			$margin='10px 5px'
			onClick={handleLogoutButton}
		>
			Wyloguj się
		</StyledButton>
	);
};
