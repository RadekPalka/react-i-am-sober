import { UserAddictions } from './../../types/UserAddictions';
const numbersOfIncidents = [10, 20, 50, 100, 150, 200];
export const generateTestAddictions = (): UserAddictions[] =>
	numbersOfIncidents.map(
		(number, index): UserAddictions => ({
			id: index.toString(),
			name: `Test ${number} incydentów`,
			costPerDay: 10,
			numberOfIncidents: number,
		})
	);
