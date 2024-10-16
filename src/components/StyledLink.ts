import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
	$display?: string;
	$padding?: string;
	$margin?: string;
};

export const StyledLink = styled(Link)<Props>`
	color: inherit;
	display: ${(props) => props.$display};
	padding: ${(props) => props.$padding};
	margin: ${(props) => props.$margin};
`;
