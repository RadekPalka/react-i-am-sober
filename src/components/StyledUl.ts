import styled from 'styled-components';

type Props = {
	$display?: 'flex';
	$justifyContent?: 'space-around';
};

export const StyledUl = styled.ul<Props>`
	display: ${(props) => props.$display};
	justify-content: ${(props) => props.$justifyContent};
	list-style: none;
`;
