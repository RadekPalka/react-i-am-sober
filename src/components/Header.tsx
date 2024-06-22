import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledHeader = styled.header`
	width: 50%;
	margin: 0 auto;
`;
const StyledNav = styled.nav``;

const StyledLink = styled(Link)`
	position: absolute;
`;
const StyledH1 = styled.h1`
	text-align: center;
`;
const StyledCongratulationsParagraph = styled.p`
	text-align: center;
	font-weight: 600;
`;
const StyledParagraph = styled.p`
	text-align: center;
`;
export const Header: React.FC = () => {
	return (
		<StyledHeader>
			<StyledNav>
				<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
				<StyledLink to='/login-page'>Zaloguj się</StyledLink>
			</StyledNav>
			<StyledH1>
				I am sober - aplikacja pomagająca w wyjściu z uzależnienia. Monitoruj
				swoją trzeźwość, śledź postępy i utrzymuj zdrowy styl życia.
			</StyledH1>
			<StyledCongratulationsParagraph>
				Przede wszystkim gratulacje
			</StyledCongratulationsParagraph>
			<StyledParagraph>
				Właśnie zrobiłeś duży krok ku trzeźwości
			</StyledParagraph>
		</StyledHeader>
	);
};
