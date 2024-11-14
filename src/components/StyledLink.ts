import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
	$display?: string;
	$width?: string;
	$height?: string;
	$border?: string;
	$borderRadius?: string;
	$backgroundColor?: string;
	$color?: string
};

export const StyledLink = styled(Link)<Props>`
	color: {(props)=> props.$color || 'inherit'};
	display: ${(props) => props.$display};
	width: ${(props) => props.$width};
	height: ${(props) => props.$height};
	border-radius: ${(props) => props.$borderRadius};
	background-color: ${(props)=> props.$backgroundColor}
`;
