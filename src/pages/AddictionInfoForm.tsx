import { Form } from '../components';
import { useEffect } from 'react';
import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { getUserData } from '../clients/AccountClients';
export const AddictionInfoForm: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		getUserData(navigate, setUserData);
	}, [navigate, setUserData]);
	if (!userData.id) {
		return <h1>Loading</h1>;
	}
	return (
		<>
			<StyledSection>
				<HeadingContainer>
					<StyledH1>Witaj {userData.login}</StyledH1>
				</HeadingContainer>

				<Form />
			</StyledSection>
		</>
	);
};
