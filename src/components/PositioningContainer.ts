import styled from 'styled-components';

type Props = {
	$width?: string;
	$justifyContent?: 'center';
};

export const PositioningContainer = styled.div<Props>`
	display: flex;
	justify-content: ${(props) => props.$justifyContent || 'space-between'};
	width: ${(props) => props.$width || '100%'};
	margin: 10px 0;
`;
