import { UserData } from "../ts/types";

interface DashboardProps {
	userData: UserData;
	
}
export const Dashboard : React.FC<DashboardProps> = ({userData}) =>{
  console.log(userData)
  return(
    <div>
      <h1>Dashboard</h1>
    </div>
  )
} 