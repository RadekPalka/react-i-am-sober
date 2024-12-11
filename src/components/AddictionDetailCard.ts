import styled from 'styled-components';
type Props = {
	$gridArea?: string;
};

export const AddictionDetailCard = styled.div<Props>`
	border: 1px solid black;
	border-radius: 10px;
	grid-area: ${(props) => props.$gridArea};
`;
