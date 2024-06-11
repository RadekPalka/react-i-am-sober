import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './tsx/MainPage';
import { Dashboard } from './tsx/Dashboard';
import { UserProvider } from './UserContext'; // Importowanie UserProvider
import styled from 'styled-components';

const AppWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <AppWrapper>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </AppWrapper>
  );
};

export default App;
