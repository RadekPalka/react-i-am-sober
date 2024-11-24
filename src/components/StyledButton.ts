import styled from 'styled-components';

type Props = {
	$width?: string;
	$height?: string;
	$margin?: string;
};

export const StyledButton = styled.button<Props>`
	display: block;
	width: ${(props) => props.$width || '90px'};
	height: ${(props) => props.$height || '30px'};
	margin: ${(props) => props.$margin};
	border-radius: 15px;
	font-family: inherit;
	background-color: black;
	color: white;

	font-weight: 300;
	font-style: normal;
	cursor: pointer;
	border: none;
	transition: background-color 0.5s;

	&:disabled {
		cursor: progress;
		background-color: #333;
	}
`;
