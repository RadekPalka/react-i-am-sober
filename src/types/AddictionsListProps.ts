import { UserAddictions } from './UserAddictions';

export type AddictionsListProps = {
	userAddictions: UserAddictions[];
	setUserAddictions: React.Dispatch<React.SetStateAction<UserAddictions[]>>;
};
