export type AddictionCardProps = {
	name: string;
	costPerDay: number;
	id: number;
	removeAddiction: (id: number) => void;
};
