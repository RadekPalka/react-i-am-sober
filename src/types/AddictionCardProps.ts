export type AddictionCardProps = {
	name: string;
	costPerDay: number;
	id: string;
	removeAddiction: (id: string) => void;
};
