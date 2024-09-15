import React from 'react';
import { AddictionCard } from './AddictionCard';
import { AddictionsListProps } from '../types/AddictionsListProps';
export const AddictionsList: React.FC<AddictionsListProps> = ({
	userAddictions,
}) => {
	return (
		<div>
			<ul>
				{userAddictions.map((addiction) => (
					<li key={addiction.id}>
						<AddictionCard
							name={addiction.name}
							costPerDay={addiction.costPerDay}
							deadline={addiction.deadline}
							id={addiction.id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
