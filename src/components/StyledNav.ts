import styled from 'styled-components';
type StyledNavProps = {
	$justifyContent: 'end' | 'center';
	$isVisible?: boolean;
};
export const StyledNav = styled.nav<StyledNavProps>`
	display: ${(props) => (props.$isVisible === false ? 'none' : 'flex')};
	justify-content: ${(props) => props.$justifyContent};
	right: 0;
	height: 100px;
	@media (min-width: 769px) {
		display: flex;
	}
`;
