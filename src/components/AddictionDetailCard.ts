import styled from 'styled-components';

type Props = {
	$gridColumnStart?: string;
	$gridColumnEnd?: string;
	$gridRowStart?: string;
	$gridRowEnd?: string;
};

export const AddictionDetailCard = styled.div<Props>`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	grid-column-start: ${(props) => props.$gridColumnStart};
	grid-column-end: ${(props) => props.$gridColumnEnd || 'span 1'};
	grid-row-start: ${(props) => props.$gridRowStart || 'auto'};
	grid-row-end: ${(props) => props.$gridRowEnd || 'span 1'};
	border: 1px solid black;
	border-radius: 10px;
`;
