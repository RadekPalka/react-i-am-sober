import { AddictionDetailsProps } from './AddictionDetailsProps';

export type EditAddictionFormProps = {
	name: string;
	costPerDay: number | string;
	id: string | undefined;
	detoxStartDate: string;
	createdAt: string;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAddictionDetails: React.Dispatch<
		React.SetStateAction<AddictionDetailsProps>
	>;
};
