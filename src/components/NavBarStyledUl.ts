import styled from 'styled-components';
type UlStyledProps = {
	$justifyContent?: string;
	$width?: string;
	$isResponsive?: boolean;
	$isDisplay?: boolean;
};
export const NavBarStyledUl = styled.ul<UlStyledProps>`
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.$justifyContent || 'center'};
	list-style-type: none;
	margin-right: 20px;
	width: ${(props) => props.$width || '200px'};
	@media (max-width: 768px) {
		display: ${(props) => (props.$isDisplay ? 'block' : 'none')};
		flex-direction: column;
	}
`;
