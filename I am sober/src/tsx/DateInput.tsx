import { ChangeEvent } from "react";
import { StyledInput } from "../styles/StyledInput";
import { UserData } from "../ts/types";
interface DateInputProps{
	value: string;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
}
export const DateInput: React.FC<DateInputProps> = ({value, setUserData}) => {
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prevState => ({
      ...prevState,
      addictionFreeDate: e.target.value
    }));
  };
	return (
		<>
			<label htmlFor='addiction-free-date'>
				Wybierz datę uwolnienia się od uzależnienia
			</label>
			<StyledInput
			type="datetime-local"
			id='addiction-free-date'
			value={value}
			max={value}
			onChange={handleChange}
			required />
		</>
	);
};
