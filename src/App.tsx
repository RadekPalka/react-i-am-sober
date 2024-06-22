import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { AddictionInfoForm } from './pages/AddictionInfoForm';
import { UserProvider } from './components/UserContext';
import { Dashboard, MainPage, RegistrationForm, LoginForm } from './pages';

const AppWrapper = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	justify-content: center;
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
