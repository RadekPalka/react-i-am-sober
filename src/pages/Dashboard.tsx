import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect, useState } from 'react';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { useUserContext } from '../context/UserContext';
import {
	fetchUserData,
	getPaginatedAddictions,
} from '../clients/AccountClients';

import { toast } from 'react-toastify';
import { UserAddictions } from '../types/UserAddictions';
import { AddictionsList } from '../components/AddictionsList';
import { NoAddictionsMessage } from '../components/NoAddictionsMessage';
import { LogoutButton } from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../clients/SessionTokenService';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';
import { HamburgerButton } from '../components/HamburgerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Nav = styled.nav`
	display: flex;
	justify-content: center;
`;
export const Dashboard: React.FC = () => {
	const { userData, setUserData } = useUserContext();

	const [userAddictions, setUserAddictions] = useState<UserAddictions[]>([]);
	const [pageNumber, setPageNumber] = useState(0);

	const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
		'loading'
	);
	const [isPaginationButtonEnabled, setIsPaginationButtonEnabled] =
		useState(true);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const pageSize = 10;
	const navigate = useNavigate();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		document.title = 'Panel użytkownika';
		if (userData.username) {
			document.title += ` ${userData.username}`;
		}
	}, [userData.username]);

	const updateUserAddictions = () => {
		getPaginatedAddictions(pageNumber)
			.then((response) => {
				setUserAddictions([...userAddictions, ...response.data]);
				setStatus('success');
				setPageNumber(pageNumber + 1);
				if (response.data.length < pageSize) {
					setIsPaginationButtonEnabled((prevState) => (prevState = false));
				}
				setIsButtonDisabled((prevState) => (prevState = false));
			})
			.catch((error) => {
				if (handleNetworkError(error)) {
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
				} else if (error.response.status === 400) {
					toast.error('Operacja się nie powiodła');
				} else if (error.response.status === 401) {
					removeToken();
					toast.error('Błąd autoryzacji');
					navigate('/login-page');
				}
				setIsButtonDisabled((prevState) => (prevState = false));
			});
	};
	const updateUserData = () => {
		fetchUserData()
			.then((response) => {
				setUserData({
					id: response.data.id,
					username: response.data.username,
				});
				updateUserAddictions();
			})
			.catch((error) => {
				if (handleNetworkError(error)) {
					toast.error('Błąd połączenia. Spróbuj ponownie później');
					setStatus('error');
				} else if (error.response.status === 401) {
					removeToken();
					toast.error('Błąd autoryzacji');
					navigate('/login-page');
				}
			});
	};

	useEffect(() => {
		updateUserData();
	}, []);

	if (status === 'loading') {
		return <h1>Loading</h1>;
	} else if (status === 'error') {
		return <button onClick={() => navigate(0)}>Odśwież</button>;
	}
	return (
		<>
			<HamburgerButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
			>
				<FontAwesomeIcon icon={faBars} aria-hidden='true' />
			</HamburgerButton>

			<StyledNav
				$justifyContent='end'
				$isVisible={isMenuOpen}
				$isResponsive={true}
			>
				<StyledUl $justifyContent='end'>
					<StyledLi $color='#2c2c2c' $background='transparent' $border='none'>
						<LogoutButton />
					</StyledLi>
				</StyledUl>
			</StyledNav>

			<HeadingContainer>
				<StyledH1>Witaj {userData.username}</StyledH1>

				{userAddictions.length > 0 ? (
					<AddictionsList
						userAddictions={userAddictions}
						setUserAddictions={setUserAddictions}
						setIsButtonDisabled={setIsButtonDisabled}
						updateUserAddictions={updateUserAddictions}
						isPaginationButtonEnabled={isPaginationButtonEnabled}
						isButtonDisabled={isButtonDisabled}
					/>
				) : (
					<NoAddictionsMessage />
				)}

				<Nav>
					<StyledUl $justifyContent='center'>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/create-addiction'>
								Dodaj nowe uzależnienie
							</StyledLink>
						</StyledLi>
					</StyledUl>
				</Nav>
			</HeadingContainer>
		</>
	);
};
