import styled from "styled-components";
type StyledLiProps ={
	$background : string
}
export const StyledLi = styled.li<StyledLiProps>`
	display: inline-block;
	line-height: 100px;
	
	background: ${(props) => props.$background};
	
	
	
`;