import { HeaderContent } from './HeaderContent';

import React from 'react';
import { StyledAuthMessage } from './StyledAuthMessage';
import { StyledLink } from './StyledLink';
import { StyledAuthMessagesWrapper } from './StyledAuthMessagesWrapper';

export const Main: React.FC = () => {
	return (
		<main>
			<HeaderContent />
			<StyledAuthMessagesWrapper>
				<StyledAuthMessage>
					<span>Masz już konto? </span>
					<StyledLink to='/login-page'>Zaloguj się</StyledLink>
				</StyledAuthMessage>
				<StyledAuthMessage>lub</StyledAuthMessage>
				<StyledAuthMessage>
					<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
				</StyledAuthMessage>
			</StyledAuthMessagesWrapper>
		</main>
	);
};
