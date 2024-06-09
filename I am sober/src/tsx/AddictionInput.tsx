import { ChangeEvent } from "react";
import { StyledInput } from "../styles/StyledInput";
import { UserData } from "../ts/types";

interface AddictionTypeProps {
	value: string;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}
export const AddictionInput: React.FC<AddictionTypeProps> = ({value, setUserData}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prevState => ({
      ...prevState,
      addictionType: e.target.value
    }));
  };
	return (
		<>
			<label htmlFor="addiction-choice'">Od czego jesteś uzależniony</label>
			<StyledInput
			id='addiction-choice'
			list='Addiction-type'
			value={value}
			onChange={handleChange}
			required
			/>
			<datalist id='Addiction-type'>
				<option value='Alkohol' />
				<option value='Narkotyki' />
				<option value='Pornografia' />
				<option value='Hazard' />
			</datalist>
		</>
	);
};
