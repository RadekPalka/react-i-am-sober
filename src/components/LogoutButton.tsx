import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../clients/AccountClients';
import { removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
import { NavButton } from './NavButton';
type Props = {
	width?: string;
	height?: string;
	borderRadius?: string;
};
export const LogoutButton: React.FC<Props> = ({ width, height }) => {
	const navigate = useNavigate();
	const handleLogoutButton = () => {
		logout()
			.then(() => {
				removeToken();
				toast.success('Zostałeś wylogowany(a) pomyślnie');
				navigate('/login-page');
			})
			.catch(() => {
				toast.error('Błąd połączenia. Spróbuj ponownie później');
			});
	};
	return (
		<NavButton
			$width={width}
			$height={height}
			$backgroundColor='#BF1F1F'
			$hoverBackgroundColor='#F23827'
			color='black'
			onClick={handleLogoutButton}
		>
			Wyloguj się
		</NavButton>
	);
};
