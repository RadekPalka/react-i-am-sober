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
	const startDate = new Date(addictionDetails?.detoxStartDate);
	const today = new Date();

	const getDatesBetween = (start: Date, end: Date): Date[] => {
		const dates: Date[] = []; // Określamy typ tablicy jako Date[]
		const current = new Date(start);
		while (current <= end) {
			dates.push(new Date(current));
			current.setDate(current.getDate() + 1);
		}
		return dates;
	};

	const dates = getDatesBetween(startDate, today);

	const incidentsPerDay: Record<string, number> =
		addictionDetails?.lastIncidents?.reduce((acc, incident) => {
			const dateKey = incident.incidentDate.split('T')[0];
			if (!acc[dateKey]) {
				acc[dateKey] = 0;
			}
			acc[dateKey] += 1;
			return acc;
		}, {} as Record<string, number>) || {};

	const chartData = dates.map((date) => ({
		date: date.getTime(),
		incidents: incidentsPerDay[date.toISOString().split('T')[0]] || 0,
	}));

	return (
		<ChartContainer>
			<h2>Incydenty w czasie</h2>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart data={chartData}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='date'
						scale='time'
						type='number'
						domain={[startDate.getTime(), today.getTime()]}
						tickFormatter={(tick) => {
							const date = new Date(tick);
							return `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;
						}}
					/>
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
