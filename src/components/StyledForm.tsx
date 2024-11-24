import styled from 'styled-components';
type Props = {
	$width?: string;
};
export const StyledForm = styled.form<Props>`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: ${(props) => props.$width || '75%'};

	margin: 0 auto;
	@media (max-width: 768px) {
		width: 100%;
	}
`;
