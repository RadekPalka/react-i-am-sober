import { AddictionData } from './AddictionData';

export type AddictionInputsProps = {
	setUserAddiction: React.Dispatch<React.SetStateAction<AddictionData>>;
	userAddiction: AddictionData;
};
