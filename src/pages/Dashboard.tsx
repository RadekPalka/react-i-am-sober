import { useEffect } from 'react';
import { Form } from '../components/Form';
import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserData } from '../types/UserData';

export const Dashboard: React.FC = () => {
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
		<div>
			<h1>Dashboard</h1>
			<p>Witaj {userData.login}</p>
			<Form />
		</div>
	);
};
