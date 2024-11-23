import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect, useState } from 'react';
import { StyledUl } from '../components/StyledUl';
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
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../clients/SessionTokenService';
import { handleNetworkError } from '../clients/ErrorHanlingUtils';
import styled from 'styled-components';
import { Link } from '../types/Link';
import { NavBar } from '../components/NavBar';
import { StyledLinkButton } from '../components/StyledLinkButton';
import { testIncidents } from '../__tests__/utils/testData';

const Nav = styled.nav`
	display: flex;
	justify-content: center;
`;
export const Dashboard: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const [userAddictions, setUserAddictions] = useState<UserAddictions[]>([]);
	const [pageNumber, setPageNumber] = useState(0);

	const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
		'success'
	);
	const [isPaginationButtonEnabled, setIsPaginationButtonEnabled] =
		useState(true);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const pageSize = 10;
	const navigate = useNavigate();

	const navBarElements: Link[] = [
		{
			id: 0,
			type: 'logout-button',
		},
	];

	const setPageTitle = (() => {
		if (status === 'loading') {
			document.title = 'Loading';
		} else if (status === 'success') {
			document.title = `Panel użytkownika ${userData.username}`;
		} else {
			document.title = 'Error';
		}
	})();

	// const updateUserAddictions = () => {
	// 	getPaginatedAddictions(pageNumber)
	// 		.then((response) => {
	// 			setUserAddictions([...userAddictions, ...response.data]);
	// 			setStatus('success');
	// 			setPageNumber(pageNumber + 1);
	// 			if (response.data.length < pageSize) {
	// 				setIsPaginationButtonEnabled((prevState) => (prevState = false));
	// 			}
	// 			setIsButtonDisabled((prevState) => (prevState = false));
	// 		})
	// 		.catch((error) => {
	// 			if (handleNetworkError(error)) {
	// 				toast.error('Błąd z połączeniem sieciowym. Spróbuj ponownie później');
	// 			} else if (error.response.status === 400) {
	// 				toast.error('Operacja się nie powiodła');
	// 			} else if (error.response.status === 401) {
	// 				removeToken();
	// 				toast.error('Błąd autoryzacji');
	// 				navigate('/login-page');
	// 			}
	// 			setIsButtonDisabled((prevState) => (prevState = false));
	// 		});
	// };
	const updateUserData = () => {
		fetchUserData()
			.then((response) => {
				setUserData({
					id: response.data.id,
					username: response.data.username,
				});
				// updateUserAddictions();
				setUserAddictions(testIncidents);
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
			<NavBar links={navBarElements} />

			<HeadingContainer>
				<StyledH1>Witaj {userData.username}</StyledH1>
			</HeadingContainer>

			{userAddictions.length > 0 ? (
				<AddictionsList
					userAddictions={userAddictions}
					// setUserAddictions={setUserAddictions}
					setIsButtonDisabled={setIsButtonDisabled}
					// updateUserAddictions={updateUserAddictions}
					isPaginationButtonEnabled={isPaginationButtonEnabled}
					isButtonDisabled={isButtonDisabled}
				/>
			) : (
				<NoAddictionsMessage />
			)}

			<Nav>
				<StyledUl>
					<li>
						<StyledLinkButton
							to='/create-addiction'
							$margin='5px'
							$width='210px'
						>
							Dodaj nowe uzależnienie
						</StyledLinkButton>
					</li>
				</StyledUl>
			</Nav>
		</>
	);
};
