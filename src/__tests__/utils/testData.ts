import { UserAddictions } from './../../types/UserAddictions';
import { AddictionDetailsProps } from '../../types/AddictionDetailsProps';
import { IncidentType } from '../../types/IncidentType';
const numbersOfIncidents = [10, 20, 50, 100, 150, 200];
export const testIncidents = numbersOfIncidents.map(
	(number, index): UserAddictions => ({
		id: index.toString(),
		name: `Test ${number} incydentów`,
		costPerDay: 10,
		numberOfIncidents: number,
	})
);

const generateIncidents = (numbersOfIncidents: number): IncidentType[] => {
	const incidents: IncidentType[] = [];
	for (let i = 0; i < numbersOfIncidents; i++) {
		console.log('ok');
		const randomYear = Math.floor(Math.random() * 3 + 2021);
		const randomMonth = Math.floor(Math.random() * 12 + 1)
			.toString()
			.padStart(2, '0');
		const randomDay = Math.floor(Math.random() * 27 + 1)
			.toString()
			.padStart(2, '0');
		const incident: IncidentType = {
			id: i,
			incidentDate: `${randomYear}-${randomMonth}-${randomDay}`,
		};
		!incidents.includes(incident) && incidents.push(incident);
	}
	return incidents.sort((a, b) => (a.incidentDate < b.incidentDate ? 1 : -1));
};

export const generateTestAddictionDetails = (
	id: number
): AddictionDetailsProps => {
	const p = {
		...testIncidents[id],
		id: Number(id),
		detoxStartDate: '2020-01-01',
		limitOfLastIncidents: 0,
		createdAt: '2021-01-01',
		lastIncidents: generateIncidents(testIncidents[id].numberOfIncidents),
	};
	return p;
};
