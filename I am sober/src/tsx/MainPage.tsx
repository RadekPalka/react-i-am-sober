import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Form } from './Form';
import { UserData } from '../ts/types';

interface MainPageProps {
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	
}

export const MainPage: React.FC<MainPageProps> = ({
	userData,
	setUserData,
}) => {
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/dashboard');
	};
	return (
		<>
			<Header />
			<section>
				<Form
					onSubmit={handleSubmit}
					addictionType={userData.addictionType}
					addictionFreeDate={userData.addictionFreeDate}
					addictionDailyCost={userData.addictionDailyCost}
					setUserData={setUserData}
				/>
			</section>
		</>
	);
};
