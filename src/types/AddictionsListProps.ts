import { UserAddictions } from './UserAddictions';

export type AddictionsListProps = {
	userAddictions: UserAddictions[];
	setUserAddictions: React.Dispatch<React.SetStateAction<UserAddictions[]>>;
	isPaginationButtonEnabled: boolean;
	isButtonDisabled: boolean;
	setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	updateUserAddictions: () => void;
};
