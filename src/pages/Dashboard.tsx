import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect, useState } from 'react';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
	fetchUserData,
	getPaginatedAddictions,
	logout,
} from '../clients/AccountClients';

import { StyledButton } from '../components/StyledButton';
import { removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
import { UserAddictions } from '../types/UserAddictions';
import { AddictionsList } from '../components/AddictionsList';
import { NoAddictionsMessage } from '../components/NoAddictionsMessage';

export const Dashboard: React.FC = () => {
	const { userData, setUserData } = useUserContext();

	const navigate = useNavigate();
	const [userAddictions, setUserAddictions] = useState<UserAddictions[]>([]);
	const [pageNumber, setPageNumber] = useState(0);

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isPaginationButtonEnabled, setIsPaginationButtonEnabled] =
		useState(true);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	console.log(userData);
	const pageSize = 10;

	const updateUserAddictions = () => {
		console.log(pageNumber);
		getPaginatedAddictions(pageNumber)
			.then((response) => {
				console.log(response.data);
				setUserAddictions([...userAddictions, ...response.data]);
				setIsDataLoaded(true);
				setPageNumber((prevPageNumber) => prevPageNumber + 1);
				console.log(response.data);
				console.log(userAddictions);
				setPageNumber(pageNumber + 1);
				if (response.data.length < pageSize) {
					setIsPaginationButtonEnabled((prevState) => (prevState = false));
				}
				console.log(userAddictions);
				setIsButtonDisabled((prevState) => (prevState = false));
			})
			.catch((error) => {
				console.log(error);
				toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
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

				console.log(response.data);
				updateUserAddictions();
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				toast.error('Błąd autoryzacji');
			});
	};

	useEffect(() => {
		updateUserData();
	}, []);

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
	if (!isDataLoaded) {
		return <h1>Loading</h1>;
	}
	return (
		<>
			<StyledNav $justifyContent='end'>
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='transparent' $border='none'>
						<StyledButton onClick={handleLogoutButton}>
							Wyloguj się
						</StyledButton>
					</StyledLi>
				</StyledUl>
			</StyledNav>
			<HeadingContainer>
				<StyledH1>Witaj {userData.username}</StyledH1>
				<>
					{userAddictions.length > 0 ? (
						<AddictionsList userAddictions={userAddictions} />
					) : (
						<NoAddictionsMessage />
					)}
					{isPaginationButtonEnabled && (
						<StyledButton
							disabled={isButtonDisabled}
							onClick={async () => {
								setIsButtonDisabled(true);

								updateUserAddictions();
							}}
						>
							Wczytaj kolejne
						</StyledButton>
					)}
				</>

				<StyledNav $justifyContent='center'>
					<StyledUl>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/addiction-info'>
								Dodaj nowe uzależnienie
							</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</HeadingContainer>
		</>
	);
};
