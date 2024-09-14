export type AddictionDetailsProps = {
	id: number;
	name: string;
	costPerDay: number;
	createdAt: string;
	deadline: string;
	lastIncidents: { id: number; createdAt: string }[];
	numberOfIncidents: number;
	limitOfLastIncidents: number;
};
