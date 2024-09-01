import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { AddictionInfoForm } from './pages/AddictionInfoForm';
import { UserProvider } from './context/UserContext';

import { Dashboard, MainPage, RegistrationForm, LoginForm } from './pages';

const AppWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	justify-content: center;
	align-items: center;
	font-family: 'LXGW WenKai TC', cursive;
	font-weight: 300;
	font-style: normal;
	background-color: #f5f5f5;
`;

const App: React.FC = () => {
	return (
		<AppWrapper>
			<UserProvider>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/addiction-info' element={<AddictionInfoForm />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/registration-page' element={<RegistrationForm />} />
					<Route path='/login-page' element={<LoginForm />} />
				</Routes>
			</UserProvider>
		</AppWrapper>
	);
};

export default App;
