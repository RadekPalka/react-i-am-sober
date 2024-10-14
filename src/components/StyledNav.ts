import styled from 'styled-components';
type StyledNavProps = {
	$justifyContent: 'end' | 'center';
};
export const StyledNav = styled.nav<StyledNavProps>`
	display: flex;
	justify-content: ${(props) => props.$justifyContent};
	right: 0;
	height: 100px;

	@media (max-width: 768px) {
		display: none;
	}
`;
