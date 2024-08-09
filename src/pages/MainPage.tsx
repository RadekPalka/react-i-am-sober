import { Header } from '../components/';
import React from 'react';
import { Nav } from '../components/Nav';
export const MainPage: React.FC = () => {
	return (
		<>
			<header>
				<Nav />
			</header>
			<Header />
		</>
	);
};
