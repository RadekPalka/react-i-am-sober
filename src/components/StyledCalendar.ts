import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const StyledCalendar = styled(Calendar)`
	height: 70%;
	margin: 0 auto;
	width: auto;
	aspect-ratio: 1 / 1;
	@media (max-width: 1280px) {
		height: 90%;
	}
	&& .react-calendar__tile--active {
		background: none;
	}

	.react-calendar__navigation button {
		font-weight: 800;
	}
	.react-calendar__month-view__days__day {
		background-color: green;
		border: 1px solid white;
	}

	.incident-day {
		background-color: red;
		color: white;
	}
	@media (max-width: 768px) {
		transform: scale(1);
	}
`;
