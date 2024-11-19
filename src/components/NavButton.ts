import styled from 'styled-components';

type NavBarStyledButtonProps = {
	$width?: string;
	$height?: string;
	$backgroundColor?: string;
	$hoverBackgroundColor?: string;
	$color?: string;
};

export const NavButton = styled.button<NavBarStyledButtonProps>`
	display: block;
	width: ${(props) => props.$width || '90px'};
	height: ${(props) => props.$height || '30px'};
	background-color: ${(props) => props.$backgroundColor || 'black'};
	color: ${(props) => props.$color || 'white'};
	border-radius: 15px;
	font-family: 'LXGW WenKai TC', sans-serif;
	font-weight: 300;
	font-style: normal;
	cursor: pointer;
	border: none;
	transition: background-color 0.5s;
	&:hover {
		background-color: ${(props) => props.$hoverBackgroundColor || '#333'};
	}
	&:disabled {
		cursor: progress;
		background-color: #000;
	}
	@media (max-width: 768px) {
		width: 100%;
		background-color: black;
		color: white;
		border-radius: 0;
		border-bottom: 1px solid white;

		&:hover {
			background-color: #333;
		}
	}
`;
