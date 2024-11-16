import styled from 'styled-components';

type StyledButtonProps = {
	$width?: string;
	$height?: string;
	$borderRadius?: string;
	$backgroundColor?: string;
	$color?: string;
};

export const StyledButton = styled.button<StyledButtonProps>`
	display: block;
	width: ${(props) => props.$width || '90px'};
	height: ${(props) => props.$height || '30px'};
	background-color: ${(props) => props.$backgroundColor || 'black'};
	color: ${(props) => props.$color || 'white'};
	border-radius: ${(props) => props.$borderRadius || '10px'};
	font-family: 'LXGW WenKai TC', sans-serif;
	font-weight: 300;
	font-style: normal;
	cursor: pointer;
	border: none;
	transition: background-color 0.5s;
	&:hover {
		background-color: #333;
	}
	&:disabled {
		cursor: progress;
		background-color: #000;
	}
`;
