import React, { useEffect, useState } from 'react';
import { IncidentType } from '../types/IncidentType';
import { StyledCalendar } from './StyledCalendar';
import { LabelContainer } from './LabelContainer';
import { DetailLabel } from './DetailLabel';
import { ValueContainer } from './ValueContainer';

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
			<LabelContainer>
				<DetailLabel>Kalendarz incydentów</DetailLabel>
			</LabelContainer>
			<ValueContainer>
				<StyledCalendar
					tileClassName={tileClassName}
					minDate={new Date(detoxStartDate)}
					maxDate={new Date()}
				/>
			</ValueContainer>
		</>
	);
};
