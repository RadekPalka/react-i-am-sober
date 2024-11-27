import styled from 'styled-components';
type Props = {
	$width?: string;
};
export const StyledForm = styled.form<Props>`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: ${(props) => props.$width};
	align-items: center;

	margin: 0 auto;
	@media (max-width: 768px) {
		width: 100%;
	}
`;
