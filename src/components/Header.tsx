import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledHeader = styled.header`
	background-color: #e7e2dc;
`;
const StyledNav = styled.nav`
	background-color: #f5f1ef;
	right: 0;
	text-align: right;
	height: 100px;
`;

const StyledLink = styled(Link)`
	margin-right: 20px;

	&:visited {
		color: black;
	}
`;
const StyledH1 = styled.h1`
	text-align: center;
`;
const StyledUl = styled.ul`
	list-style-type: none;
	margin: 0 auto;
	width: 60%;
`;
const StyledLi = styled.li`
	display: inline-block;
	line-height: 100px;
`;
const StyledHeaderContent = styled.div`
	margin: 0 auto;
	width: 60%;
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
				<StyledUl>
					<StyledLi>
						<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink to='/login-page'>Zaloguj się</StyledLink>
					</StyledLi>
				</StyledUl>
			</StyledNav>
			<StyledHeaderContent>
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
			</StyledHeaderContent>
		</StyledHeader>
	);
};
