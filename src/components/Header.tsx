import styled from 'styled-components';
import { HeaderContent } from './HeaderContent';
import { Nav } from './Nav';

const StyledHeader = styled.header`
	background-color: #e7e2dc;
`;

export const Header: React.FC = () => {
	return (
		<StyledHeader>
			<Nav />
			<HeaderContent />
		</StyledHeader>
	);
};
