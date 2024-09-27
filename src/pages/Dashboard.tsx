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
	console.log(userData);
	const pageSize = 10;
	const navigate = useNavigate();
	const updateUserAddictions = () => {
		console.log(pageNumber);
		getPaginatedAddictions(pageNumber)
			.then((response) => {
				console.log(response.data);
				setUserAddictions([...userAddictions, ...response.data]);
				setStatus('success');

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
				if (!error.status || error.status.code === 500) {
					toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
					console.log('Error');
				} else if (error.status.code === 400) {
					toast.error('Operacja się nie powiodła');
				} else if (error.status.code === 401) {
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

				console.log(response.data);
				updateUserAddictions();
			})
			.catch((error) => {
				if (!error.response || error.response.status === 500) {
					toast.error('Błąd połączenia. Spróbuj ponownie później');
					console.log(error);
					setStatus('error');
				} else if (error.response.status === 401) {
					removeToken();
					console.error('Error fetching data:', error);
					toast.error('Błąd autoryzacji');
					navigate('/login-page');
				}
				console.log('ok');
			});
	};

	useEffect(() => {
		updateUserData();
	}, []);

	if (status === 'loading') {
		return <h1>Loading</h1>;
	} else if (status === 'error') {
		return <button>Odśwież</button>;
	}
	return (
		<>
			<StyledNav $justifyContent='end'>
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

				<StyledNav $justifyContent='center'>
					<StyledUl $justifyContent='center'>
						<StyledLi $color='#e3e3e3' $background='#2c2c2c'>
							<StyledLink to='/create-addiction'>
								Dodaj nowe uzależnienie
							</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNav>
			</HeadingContainer>
		</>
	);
};
