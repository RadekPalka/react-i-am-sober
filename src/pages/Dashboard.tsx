import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React, { useEffect } from 'react';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../clients/AccountClients';
export const Dashboard: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		getUserData(navigate, setUserData);
	}, [navigate, setUserData]);
	return (
		<>
			<HeadingContainer>
				<StyledH1>
					Wygląda na to, że jeszcze nie dodałeś żadnego uzależnienia do
					monitorowania. Aby rozpocząć, kliknij poniższy link i wypełnij krótki
					formularz, który pomoże Ci śledzić swoje postępy.
				</StyledH1>
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
