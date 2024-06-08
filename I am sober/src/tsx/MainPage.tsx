import { Header } from './Header';
import { Form } from './Form';
import { useNavigate } from 'react-router-dom';

export const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/dashboard');
	};
	return (
		<>
			<Header />
			<section>
				<Form onSubmit={handleSubmit} />
			</section>
		</>
	);
};
