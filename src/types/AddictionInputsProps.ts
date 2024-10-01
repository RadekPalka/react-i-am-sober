import { AddictionData } from './AddictionData';

export type AddictionInputsProps = {
	isInputDisabled: boolean;
	setUserAddiction: React.Dispatch<React.SetStateAction<AddictionData>>;
	userAddiction: AddictionData;
	max?: string;
};
