import styled from 'styled-components';
export const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	gap: 3px;
	margin-top: 10px;
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;
