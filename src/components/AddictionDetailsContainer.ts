import styled from 'styled-components';

export const AddictionDetailsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 15%);
	grid-template-rows: repeat(6, 300px);
	margin: 0 20px;
	gap: 20px;
	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 30%);
		grid-template-rows: repeat(6, 150px);
	}
`;
