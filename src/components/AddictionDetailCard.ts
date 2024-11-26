import styled from 'styled-components';

type Props = {
	$gridColumnEnd?: string;
};

export const AddictionDetailCard = styled.div<Props>`
	grid-column-end: ${(props) => props.$gridColumnEnd || 'span 2'};
	border: 1px solid black;
	border-radius: 10px;

	height: 300px;
`;
