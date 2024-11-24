import styled from 'styled-components';
type Props = {
	$margin?: string;
};
export const StyledInput = styled.input<Props>`
	display: block;
	background-color: #e0ddf6;
	margin: ${(props) => props.$margin};
	padding: 5px 10px;
	border-radius: 10px;
	&:focus {
		background-color: #c7c4e2;
	}
`;
