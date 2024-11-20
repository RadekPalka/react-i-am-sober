import styled from 'styled-components';
type UlStyledProps = {
	$isDisplay?: boolean;
};
export const NavList = styled.ul<UlStyledProps>`
	display: flex;
	align-items: center;
	justify-content: end;
	list-style-type: none;
	width: 290px;
	@media (max-width: 768px) {
		position: fixed;
		width: 100%;
		top: 50px;
		left: 0;
		display: ${(props) => (props.$isDisplay ? 'block' : 'none')};
		flex-direction: column;
	}
`;
