import styled from 'styled-components';

export const AddictionDetailsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 15%);
	grid-template-rows: repeat(4, 300px);
	justify-content: center;
	gap: 20px;
	grid-template-areas:
		'name cost startDate calendar calendar calendar'
		'totalDays sobrietyDays incidents calendar calendar calendar'
		'maxStreak currentStreak savedMoney estimatedMonthlySavings estimatedAnnualSavings .'
		'chart chart chart chart chart chart';

	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 30%);
		grid-template-rows: 150px 150px 150px 150px 400px 400px;
		grid-template-areas:
			'name cost startDate'
			'totalDays sobrietyDays incidents'
			'maxStreak currentStreak savedMoney'
			'estimatedMonthlySavings estimatedAnnualSavings .'
			'calendar calendar calendar'
			'chart chart chart';
	}
`;
