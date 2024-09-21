import styled from 'styled-components';
type UlStyledProps = {
	$justifyContent?: string;
};
export const StyledUl = styled.ul<UlStyledProps>`
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.$justifyContent || 'space-between'};
	list-style-type: none;
	margin-right: 5px;
	width: 300px;
`;
