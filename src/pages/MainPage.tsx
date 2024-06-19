import { Link } from 'react-router-dom';
import { Header } from '../components/';
import styled from 'styled-components';

const StyledNav = styled.nav``;

const StyledLink = styled(Link)`
	position: absolute;
`;
export const MainPage: React.FC = () => {
	return (
		<>
			<Header />
			<StyledNav>
				<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
				<StyledLink to='/login-page'>Zaloguj się</StyledLink>
			</StyledNav>
		</>
	);
};
