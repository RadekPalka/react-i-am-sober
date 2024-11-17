import styled from 'styled-components';
type Props = {
	$justifyContent?: 'start' | 'end' | 'space-between' | 'space-around';
};
export const NavBarStyledNav = styled.nav<Props>`
	top: 50px;
	justify-content: ${(props) => props.$justifyContent || 'space-around'};
	right: 0;

	@media (min-width: 769px) {
		display: flex;
		position: static;
		background-color: transparent;
		width: 100%;
	}
`;
