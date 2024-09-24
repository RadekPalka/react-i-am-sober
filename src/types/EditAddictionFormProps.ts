import { AddictionDetailsProps } from './AddictionDetailsProps';

export type EditAddictionFormProps = {
	name: string;
	costPerDay: number;
	id: number;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAddictionDetails: React.Dispatch<
		React.SetStateAction<AddictionDetailsProps>
	>;
};
