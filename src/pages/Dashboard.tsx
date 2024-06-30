import { Form } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';

export const Dashboard: React.FC = () => {
	const { userData } = useUserContext();
	console.log(userData);
	return (
		<div>
			<h1>Dashboard</h1>
			<Form />
		</div>
	);
};
