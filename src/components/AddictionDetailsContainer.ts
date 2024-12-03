import styled from 'styled-components';

export const AddictionDetailsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 280px);
	grid-template-rows: repeat(4, 30vh);
	justify-content: center;
	gap: 20px;
	grid-template-areas:
		'name cost startDate calendar calendar calendar'
		'totalDays sobrietyDays incidents calendar calendar calendar'
		'maxStreak currentStreak savedMoney estimatedMonthlySavings estimatedAnnualSavings .'
		'chart chart chart chart chart chart';

	@media (max-width: 1536px) {
		grid-template-columns: repeat(4, 280px);
		grid-template-rows: repeat(5, 30%);
		grid-template-areas:
			'name cost calendar calendar '
			'startDate totalDays calendar calendar '
			'sobrietyDays incidents maxStreak currentStreak '
			'savedMoney estimatedMonthlySavings estimatedAnnualSavings .'
			'chart chart chart chart';
	}

	@media (max-width: 1280px) {
		grid-template-columns: repeat(3, 28%);
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
