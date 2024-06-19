import { Link } from 'react-router-dom';
import { Header } from '../components/';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  
`
export const MainPage: React.FC = () => {
	return (
		<>
			<Header />
			<StyledLink to='/registration-page'>Zarejestruj się</StyledLink>
			<StyledLink to='/login-page'>Zaloguj się</StyledLink>
		</>
	);
};
