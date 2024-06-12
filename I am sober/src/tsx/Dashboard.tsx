import { useUserContext } from "./UserContext";


export const Dashboard: React.FC = () => {
	const { userData }= useUserContext()
	console.log(userData)
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};
