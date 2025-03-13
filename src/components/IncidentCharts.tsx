import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { AddictionDetailsProps } from '../types/AddictionDetailsProps';

type Props = {
	addictionDetails: AddictionDetailsProps;
};
const ChartContainer = styled.div`
	width: 500px;
`;
export const IncidentCharts: React.FC<Props> = ({ addictionDetails }) => {
	const [incidentsPerMonth, setIncidentsPerMonth] = useState<
		{ index: string; incidentsNumber: number }[]
	>([]);
	useEffect(() => {
		const yearMonthIndexes: { index: string; incidentsNumber: number }[] = [];
		const lastIndex = addictionDetails.lastIncidents.length - 1;
		const firstIncident = addictionDetails.lastIncidents[lastIndex];

		const startDate = firstIncident.incidentDate.slice(0, 7);
		const startYear = parseInt(startDate);

		const startMonth = Number(startDate.slice(5, 7));

		const presentYear = new Date().getFullYear();

		const presentMonth = new Date().getMonth() + 1;

		let lastMonthIndex = 12;
		for (let i = startYear; i <= presentYear; i++) {
			if (i === presentYear) lastMonthIndex = presentMonth;
			let j = i === startYear ? startMonth : 1;

			for (j; j <= lastMonthIndex; j++) {
				const yearMonthIndex = `${i}-${j.toString().padStart(2, '0')}`;
				const incidentsNumber = addictionDetails.lastIncidents.filter((el) =>
					el.incidentDate.includes(yearMonthIndex)
				).length;
				yearMonthIndexes.push({
					index: `${i}-${j.toString().padStart(2, '0')}`,
					incidentsNumber,
				});
			}
		}
		setIncidentsPerMonth(yearMonthIndexes);
	}, [addictionDetails.lastIncidents]);

	return (
		<ChartContainer>
			<h2>Incydenty w czasie</h2>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart data={incidentsPerMonth}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='index'
						label={{
							value: 'Rok-miesiąc',

							position: 'insideBottom',
							dy: 20, // Dostosowanie pozycji etykiety
						}}
					/>
					<YAxis
						dataKey='incidentsNumber'
						label={{
							value: 'Liczba incydentów',
							angle: -90,
							dx: -5,
						}}
					/>
					<Tooltip formatter={(value) => [`${value}`, 'Liczba incydentów']} />
					<Legend wrapperStyle={{ bottom: 50, left: 360 }} />
					<Bar dataKey='incidentsNumber' name='Liczba incydentów' fill='#8884d8' />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};
