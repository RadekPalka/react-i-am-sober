import styled from 'styled-components';

export const StyledButton = styled.button`
	display: block;
	width: 90px;
	height: 30px;
	border-radius: 15px;
	font-family: 'LXGW WenKai TC', sans-serif;
	background-color: black;
	color: white;
	font-weight: 300;
	font-style: normal;
	cursor: pointer;
	border: none;
	transition: background-color 0.5s;

	&:disabled {
		cursor: progress;
		background-color: #000;
	}
`;
