import styled from 'styled-components';
type Props = {
	$gridArea?: string;
};

export const AddictionDetailCard = styled.div<Props>`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 10px;
	grid-area: ${(props) => props.$gridArea};
`;
