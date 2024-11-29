import React, { useEffect, useState } from 'react';
import { IncidentType } from '../types/IncidentType';
import { StyledCalendar } from './StyledCalendar';
import styled from 'styled-components';

const Title = styled.p`
	position: absolute;
	top: 0;
	width: 100%;
	text-align: center;
	left: 0;
`;
type IncidentsCalendarProps = {
	detoxStartDate: string;
	lastIncidents: IncidentType[];
};

export const IncidentsCalendar: React.FC<IncidentsCalendarProps> = ({
	detoxStartDate,
	lastIncidents,
}) => {
	const [markedDates, setMarkedDates] = useState<{ [key: string]: boolean }>(
		{}
	);

	useEffect(() => {
		const incidentDates = lastIncidents.reduce(
			(acc: { [key: string]: boolean }, incident) => {
				const dateKey = new Date(incident.incidentDate).toDateString();
				acc[dateKey] = true;
				return acc;
			},
			{}
		);

		setMarkedDates(incidentDates);
	}, [lastIncidents]);
	const tileClassName = ({ date }: { date: Date }) => {
		const dateKey = date.toDateString();
		return markedDates[dateKey] ? 'incident-day' : '';
	};

	return (
		<>
			<Title>Kalendarz incydentów</Title>
			<StyledCalendar
				tileClassName={tileClassName}
				minDate={new Date(detoxStartDate)}
				maxDate={new Date()}
			/>
		</>
	);
};
