import { StyledInput } from "../styles/StyledInput";
export const AddictionInput: React.FC = () => {
	return (
		<>
			<label htmlFor="addiction-choice'">Od czego jesteś uzależniony</label>
			<StyledInput id='addiction-choice' list='Addiction-type' required/>
			<datalist id='Addiction-type'>
				<option value='Alkohol' />
				<option value='Narkotyki' />
				<option value='Pornografia' />
				<option value='Hazard' />
			</datalist>
		</>
	);
};
