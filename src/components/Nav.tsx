import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const StyledUl = styled.ul`
	list-style-type: none;
	margin: 0 auto;
	width: 60%;
`;
const StyledLi = styled.li`
	display: inline-block;
	line-height: 100px;
`;
export const Nav: React.FC = () => {
	return (
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
	);
};
