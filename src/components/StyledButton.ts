import styled from 'styled-components';

type StyledButtonProps = {
	$width?: string;
	$height?: string;
	$borderRadius?: string;
};

export const StyledButton = styled.button<StyledButtonProps>`
	display: block;
	width: ${(props) => props.$width || '90px'};
	height: ${(props) => props.$height || '30px'};
	background-color: black;
	color: #fff;
	border-radius: ${(props) => props.$borderRadius || '10px'};
	font-family: 'LXGW WenKai TC', sans-serif;
	font-weight: 300;
	font-style: normal;
	cursor: pointer;
	border: none;
	&:hover {
		background-color: #333;
	}
	&:disabled {
		cursor: progress;
		background-color: #000;
	}
`;
