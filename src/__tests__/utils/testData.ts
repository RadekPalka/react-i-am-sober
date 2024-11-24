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

const generateIncidents = (
	incidentIndex: number,
	maxDays: number
): IncidentType[] => {
	const minDays = 1;

	const totalIncidents = numbersOfIncidents[incidentIndex];
	let currentDate = new Date();

	const incidents = Array.from(
		{ length: totalIncidents },
		(_, index): IncidentType => {
			const randomDaysOffset = Math.floor(
				Math.random() * (maxDays - minDays + 1) + minDays
			);
			const randomMilliseconds = randomDaysOffset * 24 * 60 * 60 * 1000;

			currentDate = new Date(currentDate.getTime() - randomMilliseconds);

			return {
				id: index,
				incidentDate: currentDate.toISOString(),
			};
		}
	);

	return incidents;
};

export const generateTestAddictionDetails = (
	id: number
): AddictionDetailsProps => {
	return {
		...testIncidents[id],
		id: Number(id),
		detoxStartDate: '2020-01-01',
		limitOfLastIncidents: 0,
		createdAt: '2021-01-01',
		lastIncidents: generateIncidents(id, 7),
	};
};
