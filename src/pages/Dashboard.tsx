import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { AddictionCard } from '../components/AddictionCard';
import { StyledButton } from '../components/StyledButton';
import { getToken, removeToken } from '../clients/SessionTokenService';
import { toast } from 'react-toastify';
import { UserAddictions } from '../types/UserAddictions';
type UserData = {
	id: number;
	username: string;
};
export const Dashboard: React.FC = () => {
	//const { userData, setUserData } = useUserContext();
	const [userData, setUserData] = useState<UserData>({ id: 0, username: '' });
	const navigate = useNavigate();
	const [userAddictions, setUserAddictions] = useState<UserAddictions[]>([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [token, setToken] = useState<string | null>('');
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isPaginationButtonEnabled, setIsPaginationButtonEnabled] =
		useState(true);
	console.log(userData);
	const pageSize = 10;
	const updateUserAddictions = () => {
		token &&
			getPaginatedAddictions(pageNumber)
				.then((response) => {
					setUserAddictions([...userAddictions, ...response.data]);
					console.log(response.data.length);
					if (response.data.length < pageSize) {
						setIsPaginationButtonEnabled((prevState) => (prevState = false));
					}
					console.log(userAddictions);
				})
				.catch((error) => {
					console.log(error);
				});
	};
	const updateUserData = () => {
		token &&
			fetchUserData()
				.then((response) => {
					setPageNumber((prevState) => prevState + 1);
					setUserData({
						id: response.data.id,
						username: response.data.username,
					});
					setIsDataLoaded(true);
					console.log(response.data);
					updateUserAddictions();
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					toast.error('Błąd autoryzacji');
				});
	};

	useEffect(() => {
		setToken(getToken());
		if (token) {
			updateUserData();
		} else {
			toast.error('Autoryzacja się nie udała. Proszę się zalogować');
			navigate('/login-page');
		}
	}, [token]);

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
				{userAddictions.length ? (
					<div>
						<ul>
							{userAddictions.map((addiction) => (
								<li key={uuidv4()}>
									<AddictionCard
										name={addiction.name}
										costPerDay={addiction.costPerDay}
										deadline={addiction.deadline}
									/>
								</li>
							))}
						</ul>
						{isPaginationButtonEnabled && (
							<StyledButton
								onClick={() => {
									console.log(pageNumber);
									updateUserAddictions();
								}}
							>
								Wczytaj kolejne
							</StyledButton>
						)}
					</div>
				) : (
					<StyledH1>
						Wygląda na to, że jeszcze nie dodałeś żadnego uzależnienia do
						monitorowania. Aby rozpocząć, kliknij poniższy link i wypełnij
						krótki formularz, który pomoże Ci śledzić swoje postępy.
					</StyledH1>
				)}
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
