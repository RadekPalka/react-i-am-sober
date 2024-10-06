import React from 'react';
import { LastIncidentsListProps } from '../types/LastIncidentsListProps';
import { StyledButton } from './StyledButton';
import { formatDateForDisplay } from '../clients/dateUtils';

export const LastIncidentsList: React.FC<LastIncidentsListProps> = ({
	lastIncidents,
	removeIncident,
	buttonDisabled,
}) => {
	const formatDate = (date: string) => formatDateForDisplay(new Date(date));
	return (
		<>
			<p>Twoje incydenty</p>
			<ul>
				{lastIncidents.map((incident) => (
					<li key={incident.id}>
						<div>
							<p>{formatDate(incident.incidentDate)}</p>
							<StyledButton
								onClick={() => removeIncident(incident.id)}
								disabled={buttonDisabled}
							>
								Usuń
							</StyledButton>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};
