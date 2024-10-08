import styled from 'styled-components';
type UlStyledProps = {
	$justifyContent?: string;
	$width?: string;
};
export const StyledUl = styled.ul<UlStyledProps>`
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.$justifyContent || 'space-between'};
	list-style-type: none;
	margin-right: 20px;
	width: ${(props) => props.$width || '200px'};
`;
