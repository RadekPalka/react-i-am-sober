import { ChangeEvent } from "react";
import { StyledInput } from "../styles/StyledInput";
import { UserData } from "../ts/types";
interface DailyCostInputProps {
	value: number;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}
export const DailyCostInput: React.FC<DailyCostInputProps> = ({value, setUserData}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prevState => ({
      ...prevState,
      addictionDailyCost: Number(e.target.value)
    }));
  };
	return (
		<>
			<label htmlFor='daily-cost'>
				Ile pieniędzy dziennie traciłeś na uzależnienie?
			</label>
			<StyledInput
			type='number'
			id='daily-cost'
			min="0"
			value={value || ""}
			onChange={handleChange}
			required
			/>
		</>
	);
};
