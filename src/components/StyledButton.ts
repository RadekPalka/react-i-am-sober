import styled from 'styled-components';

type StyledButtonProps = {
	$padding?: string;
	$margin?: string;
};

export const StyledButton = styled.button<StyledButtonProps>`
	display: block;
	margin: ${(props) => props.$margin || '10px auto'};
	background-color: black;
	color: #fff;
	padding: ${(props) => props.$padding || '8px 20px'};
	border-radius: 10px;
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
