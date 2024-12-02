import styled from 'styled-components';

export const AddictionDetailCard = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 10px;

	&:nth-child(1) {
		grid-area: name;
	}

	&:nth-child(2) {
		grid-area: cost;
	}

	&:nth-child(3) {
		grid-area: startDate;
	}

	&:nth-child(4) {
		grid-area: totalDays;
	}

	&:nth-child(5) {
		grid-area: sobrietyDays;
	}

	&:nth-child(6) {
		grid-area: incidents;
	}

	&:nth-child(7) {
		grid-area: maxStreak;
	}

	&:nth-child(8) {
		grid-area: currentStreak;
	}

	&:nth-child(9) {
		grid-area: savedMoney;
	}

	&:nth-child(10) {
		grid-area: estimatedMonthlySavings;
	}

	&:nth-child(11) {
		grid-area: estimatedAnnualSavings;
	}
	&:nth-child(12) {
		grid-area: calendar;
	}
	&:nth-child(13) {
		grid-area: chart;
	}
`;
