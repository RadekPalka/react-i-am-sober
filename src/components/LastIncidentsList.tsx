import React from 'react';
import { LastIncidentsListProps } from '../types/LastIncidentsListProps';
import { StyledButton } from './StyledButton';
import { formatDateForDisplay } from '../clients/dateUtils';
import { StyledUl } from './StyledUl';
import styled from 'styled-components';

const StyledLi = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
`;
const StyledParagraph = styled.p`
	align-content: center;
	height: 30px;
`;
export const LastIncidentsList: React.FC<LastIncidentsListProps> = ({
	lastIncidents,
	removeIncident,
	buttonDisabled,
}) => {
	const formatDate = (date: string) => formatDateForDisplay(new Date(date));
	return (
		<>
			<p>Twoje incydenty</p>
			<StyledUl>
				{lastIncidents.map((incident) => (
					<StyledLi key={incident.id}>
						<StyledParagraph>
							{formatDate(incident.incidentDate)}
						</StyledParagraph>
						<StyledButton
							onClick={() => removeIncident(incident.id)}
							disabled={buttonDisabled}
						>
							Usuń
						</StyledButton>
					</StyledLi>
				))}
			</StyledUl>
		</>
	);
};
