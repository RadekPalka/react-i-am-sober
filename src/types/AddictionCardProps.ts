export type AddictionCardProps = {
	name: string;
	costPerDay: number;
	deadline: string | null;
	id: number;
	removeAddiction: (id: number) => void;
};
