import { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../types/UserData';
import { UserContextType } from '../types/UserContextType';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [userData, setUserData] = useState<UserData>({
		id: '',
		login: '',
		addictionType: '',
		addictionFreeDate: new Date()
			.toLocaleDateString('en-CA', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			})
			.replaceAll(',', ''),
		addictionDailyCost: 0,
	});

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
};
