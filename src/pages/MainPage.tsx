import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main } from '../components/';
import { getToken } from '../clients/SessionTokenService';
import { NavBar } from '../components/NavBar';
import { Link } from '../types/Link';

export const MainPage: React.FC = () => {
	const navigate = useNavigate();

	document.title = 'Strona główna';
	const navBarElements: Link[] = [
		{
			id: 0,
			type: 'link',
			label: 'Zarejestruj się',
			to: '/registration-page',
		},
		{
			id: 1,
			type: 'link',
			label: 'Zaloguj się',
			to: '/login-page',
		},
	];

	useEffect(() => {
		getToken() && navigate('/dashboard');
	}, []);

	return (
		<>
			<header>
				<NavBar links={navBarElements} />
			</header>
			<Main />
		</>
	);
};
