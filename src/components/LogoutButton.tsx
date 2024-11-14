import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './StyledButton';
import { logout } from '../clients/AccountClients';
import { removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
type Props = {
	width?: string;
	height?: string;
	borderRadius?: string;
};
export const LogoutButton: React.FC<Props> = ({
	width,
	height,
	borderRadius,
}) => {
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
		<StyledButton
			$width={width}
			$height={height}
			$borderRadius={borderRadius}
			onClick={handleLogoutButton}
		>
			Wyloguj się
		</StyledButton>
	);
};
