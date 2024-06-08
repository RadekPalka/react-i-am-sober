import { useState } from 'react';
import { MainPage } from './tsx/MainPage';

import { Dashboard } from './tsx/Dashboard';
import { Route, Routes } from 'react-router-dom';

type UserData = {
	addictionType: string,
	addictionFreeDate: Date,
	addictionDailyCost: number
}
const App: React.FC = () => {

	const [userData, setUserData] = useState<UserData>({
		addictionType : "",
		addictionFreeDate: new Date(),
		addictionDailyCost : 0
	})

	return (
		<>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</>
	);
};

export default App;
