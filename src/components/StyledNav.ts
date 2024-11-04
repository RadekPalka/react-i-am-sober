import styled from 'styled-components';
type StyledNavProps = {
	$justifyContent: 'end' | 'center';
	$isVisible?: boolean;
	$isResponsive?: boolean;
};
export const StyledNav = styled.nav<StyledNavProps>`
	display: ${(props) => (props.$isVisible === false ? 'none' : 'flex')};
	position: ${(props) => props.$isResponsive && 'fixed'};
	top: 50px;
	background-color: ${(props) => props.$isResponsive && 'black'};
	width: ${(props) => props.$isResponsive && '100vw'};
	justify-content: ${(props) => props.$justifyContent};
	right: 0;
	height: ${(props) => (props.$isResponsive ? 'auto' : '100px')};
	@media (min-width: 769px) {
		display: flex;
		position: static;
		background-color: transparent;
		width: 100%;
	}
`;
