import { useEffect } from 'react';
import { Form } from '../components/Form';
import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Dashboard: React.FC = () => {
	const { userData } = useUserContext();
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
			<Form />
		</div>
	);
};
