import { Form } from '../components';
import { useEffect } from 'react';

import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserData } from '../types/UserData';

import { StyledSection } from '../components/StyledSection';
import { StyledH1 } from '../components/StyledH1';
import { HeadingContainer } from '../components/HeadingContainer';
export const AddictionInfoForm: React.FC = () => {
	const { userData, setUserData } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('sessionToken');
		if (token) {
			axios
				.get('https://mentoring-api.vercel.app/api/v1/account/me', {
					headers: {
						Authorization: `${token}`,
					},
				})
				.then((response) => {
					console.log(response.data);
					setUserData((prevState: UserData) => ({
						...prevState,
						id: response.data.id,
						login: response.data.username,
					}));
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		} else {
			navigate('/');
		}
	}, []);
	console.log(userData);
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
