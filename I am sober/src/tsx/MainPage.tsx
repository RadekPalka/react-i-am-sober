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
	return (
		<>
			<Header />
			<section>
				<Form
					addictionType={userData.addictionType}
					addictionFreeDate={userData.addictionFreeDate}
					addictionDailyCost={userData.addictionDailyCost}
					setUserData={setUserData}
				/>
			</section>
		</>
	);
};
