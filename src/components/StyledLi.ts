import styled from "styled-components";
type StyledLiProps ={
	$background : string,
	$padding: string
}
export const StyledLi = styled.li<StyledLiProps>`
	display: inline-block;
	padding: ${(props) => props.$padding};
	
	background: ${(props) => props.$background};
	
	
	
`;