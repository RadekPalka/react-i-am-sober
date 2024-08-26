import React from 'react';
import { useUserContext } from '../context/UserContext';

export const AddictionCard: React.FC = () => {
	const { userData } = useUserContext();
	return (
		<div>
			<h2>{userData.addictionType}</h2>
			<p>{userData.addictionDailyCost}</p>
			<p>{userData.addictionFreeDate}</p>
		</div>
	);
};
