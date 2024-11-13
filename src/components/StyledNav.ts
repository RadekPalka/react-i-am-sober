import styled from 'styled-components';
type Props={
 $jusifyContent?: 'end'
}
export const StyledNav = styled.nav<Props>`
	top: 50px;
 
	right: 0;

	@media (min-width: 769px) {
		display: flex;
		position: static;
		background-color: transparent;
		width: 100%;
	}
`;
