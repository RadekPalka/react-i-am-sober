export type AddictionDetailsProps = {
	id: number;
	name: string;
	costPerDay: number;
	detoxStartDate: string;
	createdAt: string;
	lastIncidents: { id: number; createdAt: string }[];
	numberOfIncidents: number;
	limitOfLastIncidents: number;
};
