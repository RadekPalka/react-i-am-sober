import styled from 'styled-components';

export const AddictionDetailsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 250px);
	grid-template-rows: repeat(4, 315px);
	justify-content: center;
	gap: 20px;
	grid-template-areas:
		'name cost startDate calendar calendar calendar'
		'totalDays sobrietyDays incidents calendar calendar calendar'
		'maxStreak currentStreak savedMoney monthlySavings annualSavings .'
		'chart chart chart chart chart chart';

	@media (max-width: 1536px) {
		grid-template-columns: repeat(4, 250px);
		grid-template-rows: repeat(5, 315px);
		grid-template-areas:
			'name cost calendar calendar '
			'startDate totalDays calendar calendar '
			'sobrietyDays incidents maxStreak currentStreak '
			'savedMoney monthlySavings annualSavings .'
			'chart chart chart chart';
	}

	@media (max-width: 1280px) {
		grid-template-columns: repeat(3, 250px);
		grid-template-rows: 315px 315px 315px 315px 400px 400px;
		grid-template-areas:
			'name cost startDate'
			'totalDays sobrietyDays incidents'
			'maxStreak currentStreak savedMoney'
			'monthlySavings annualSavings .'
			'calendar calendar calendar'
			'chart chart chart';
	}
`;
