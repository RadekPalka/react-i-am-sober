import React from 'react';
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
	const incidentsPerMonth = addictionDetails.lastIncidents.reduce(
		(acc, incident) => {
			const key = incident.incidentDate.slice(0, 7);
			const existingEntry = acc.find((entry) => entry.month === key);
			if (existingEntry) {
				existingEntry.incidents += 1;
			} else {
				acc.push({ month: key, incidents: 1 });
			}
			return acc;
		},
		[] as { month: string; incidents: number }[]
	);
	console.log(incidentsPerMonth);

	return (
		<ChartContainer>
			<h2>Incydenty w czasie</h2>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart data={incidentsPerMonth}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='month' />
					<YAxis allowDecimals={false} />
					<Tooltip
						labelFormatter={(label) => {
							const date = new Date(label);
							return `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;
						}}
						formatter={(value: number) => Math.round(value)}
					/>
					<Legend />
					<Bar dataKey='incidents' fill='#8884d8' />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};
