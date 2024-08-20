import styled from 'styled-components';
type StyledNavProps = {
	$justifyContent: 'end' | 'center';
};
export const StyledNav = styled.nav<StyledNavProps>`
	display: flex;
	justify-content: ${(props) => props.$justifyContent};
	background-color: white;
	border: solid 2px black;
	right: 0;

	height: 100px;
`;
