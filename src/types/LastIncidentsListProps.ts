import { IncidentType } from './IncidentType';

export type LastIncidentsListProps = {
	lastIncidents: IncidentType[];
	removeIncident: (incidentId: number) => void;
};
