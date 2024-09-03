import styled from 'styled-components';
type StyledLiProps = {
	$background: string;
	$border?: string;
	$color: string;
};
export const StyledLi = styled.li<StyledLiProps>`
	display: block;
	padding: 8px;
	color: ${(props) => props.$color};
	font-size: 12px;
	background: ${(props) => props.$background};
	border: ${(props) => props.$border || '1px solid #999'};
	border-radius: 10px;
	text-align: center;
`;
