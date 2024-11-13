import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
	$display?: string;
	$width?: string;
	$height?: string;
	$border?: string;
	$borderRadius?: string;
};

export const StyledLink = styled(Link)<Props>`
	color: inherit;
	display: ${(props) => props.$display};
	width: ${(props) => props.$width};
	height: ${(props) => props.$height};
	border-radius: ${(props) => props.$borderRadius};
`;
