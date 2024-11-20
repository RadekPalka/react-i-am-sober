import styled from 'styled-components';

type Props = {
	$justifyContent?: 'start' | 'end' | 'space-between' | 'space-around';
};
export const NavBarWrapper = styled.nav<Props>`
	display: flex;
	justify-content: ${(props) => props.$justifyContent || 'space-around'};
`;
