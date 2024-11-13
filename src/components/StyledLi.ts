import styled from 'styled-components';
type Props = {
	$backgrondColor? : string;
	$color? : string;
}

export const StyledLi = styled.li`
	display: block;
	background-color: black;
	padding: 8px;
	color: white;
	font-size: 12px;

	border-radius: 10px;
	text-align: center;
	list-style-type: none;
`;
