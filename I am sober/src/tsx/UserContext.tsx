import { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../types/UserData';
import { UserContextType } from '../types/UserContextType';

// Tworzenie kontekstu z domyślną wartością undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook do używania kontekstu
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Typowanie propsów UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// Komponent dostarczający kontekst
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
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
