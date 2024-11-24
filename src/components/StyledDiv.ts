import styled from 'styled-components';

type Props = {
	$width?: string;
	$margin?: string;
};

export const StyledDiv = styled.div<Props>`
	display: flex;
	width: ${(props) => props.$width};
	margin: ${(props) => props.$margin || '5px 0'};
	justify-content: space-around;
	gap: 3px;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;
