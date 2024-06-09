import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './tsx/MainPage';
import { Dashboard } from './tsx/Dashboard';
import { UserData } from './ts/types';


const App: React.FC = () => {

	const [userData, setUserData] = useState<UserData>({
		addictionType : "",
		addictionFreeDate: new Date().toLocaleDateString('en-CA', {
			year: 'numeric', month: '2-digit', day: "2-digit", hour: "2-digit", minute: "2-digit", hour12 : false
		}).replaceAll(",",""),
		addictionDailyCost : 0
	})
	
	return (
		<>
			<Routes>
				<Route path='/' element={<MainPage userData={userData} setUserData={setUserData} />} />
				<Route path='/dashboard' element={<Dashboard userData={userData}/>} />
			</Routes>
		</>
	);
};

export default App;
