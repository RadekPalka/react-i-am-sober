import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main } from '../components/';
import { getToken } from '../clients/SessionTokenService';
import { NavBar } from '../components/NavBar';
import { Links } from '../types/Links';

export const MainPage: React.FC = () => {
	const navigate = useNavigate();

	document.title = 'Strona główna';
	const navBarElements: Links = {
		elements: [
			{
				type: 'link',
				label: 'Zarejestruj się',
				to: '/registration-page',
			},
			{
				type: 'link',
				label: 'Zaloguj się',
				to: '/login-page',
			},
		],
		styles: {
			navJustifyContent: 'end',
			width: '105px',
			height: '35px',
			linkColor: 'white',
			linkDisplay: 'block', 
			borderRadius: '15px',
			linkBackgroundColor: 'black',
		},
	};

	useEffect(() => {
		getToken() && navigate('/dashboard');
	}, []);

	return (
		<>
			<header>
				<NavBar linksObj={navBarElements} />
			</header>
			<Main />
		</>
	);
};
