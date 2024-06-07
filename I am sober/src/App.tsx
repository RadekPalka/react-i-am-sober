import { useState } from 'react';
import { MainPage } from './tsx/MainPage';

import { Dashboard } from './tsx/Dashboard';
import { Route, Routes} from 'react-router-dom'


const App: React.FC = () => {
	
	
	return (
		<>
						
				<Routes>
					<Route path='/'  element={<MainPage />}/>
					<Route path='/dashboard' element={<Dashboard/>} />
				</Routes>
			
			
			
		</>
	);
};

export default App;
