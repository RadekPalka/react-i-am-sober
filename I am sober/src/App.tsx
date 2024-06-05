import { useState } from 'react';
import { Header } from './tsx/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<>
			<Header />

			<Router>
				<Routes>
					<Route path='/' />
					<Route path='/dashboard' />
				</Routes>
			</Router>
		</>
	);
};

export default App;
