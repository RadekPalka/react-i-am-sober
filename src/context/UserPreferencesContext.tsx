import { createContext, useContext, useState, ReactNode } from 'react';
import { UserPreferencesContextType } from '../types/UserPreferencesContextType';

const UserPreferencesContext = createContext<
	UserPreferencesContextType | undefined
>(undefined);

export const useUserPreferencesContext = () => {
	const context = useContext(UserPreferencesContext);
	if (!context) {
		throw new Error(
			'useUserPreferencesContext must be used within a UserPreferencesProvider'
		);
	}
	return context;
};

type UserPreferencesProviderProps = {
	children: ReactNode;
};

export const UserPreferencesProvider: React.FC<
	UserPreferencesProviderProps
> = ({ children }) => {
	const [isRemembered, setIsRemembered] = useState<boolean>(false);

	return (
		<UserPreferencesContext.Provider value={{ isRemembered, setIsRemembered }}>
			{children}
		</UserPreferencesContext.Provider>
	);
};
