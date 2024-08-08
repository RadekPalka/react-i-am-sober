import styled from 'styled-components';
import { HeaderContent } from './HeaderContent';
import { Nav } from './Nav';
import React from 'react';
const StyledMain = styled.main`
	 background-color: #e7e2dc; 

`;

export const Header: React.FC = () => {
	return (
		<StyledMain>
			<Nav padding='3px 6px'/>
			<HeaderContent />
		</StyledMain>
	);
};
