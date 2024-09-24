import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import {
	Dashboard,
	MainPage,
	RegistrationForm,
	LoginForm,
	CreateAddictionPage,
} from './pages';
import { AddictionDetails } from './pages/AddictionDetails';

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
					<Route path='/create-addiction' element={<CreateAddictionPage />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/registration-page' element={<RegistrationForm />} />
					<Route path='/login-page' element={<LoginForm />} />
					<Route
						path='/addiction/:addictionId'
						element={<AddictionDetails />}
					/>
				</Routes>
			</UserProvider>
		</AppWrapper>
	);
};

export default App;
