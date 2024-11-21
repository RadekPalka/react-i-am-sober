import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
	$width?: string;
	$margin?: string;
};

export const StyledLinkButton = styled(Link)<Props>`
	display: block;
	width: ${(props) => props.$width || '150px'};
	margin: ${(props) => props.$margin};
	height: 30px;
	border-radius: 15px;
	text-decoration: none;
	background-color: black;
	color: white;
	line-height: 30px;
	text-align: center;
`;
