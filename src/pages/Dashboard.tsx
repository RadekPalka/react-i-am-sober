import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React from 'react';
import { StyledNav } from '../components/StyledNav';
import { StyledUl } from '../components/StyledUl';
import { StyledLi } from '../components/StyledLi';
import { StyledLink } from '../components/StyledLink';
export const Dashboard: React.FC = () => {
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
