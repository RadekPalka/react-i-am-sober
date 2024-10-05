import { IncidentType } from './IncidentType';
export type AddictionDetailsProps = {
	id: number;
	name: string;
	costPerDay: number;
	detoxStartDate: string;
	createdAt: string;
	lastIncidents: IncidentType[];
	numberOfIncidents: number;
	limitOfLastIncidents: number;
};
