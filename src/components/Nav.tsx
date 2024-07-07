import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';

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
