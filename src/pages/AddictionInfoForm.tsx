import { Form } from '../components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserData } from '../types/UserData';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
import { getUserData } from '../clients/AccountClients';
export const AddictionInfoForm: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		getUserData(navigate, setUserData);
	}, []);

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
