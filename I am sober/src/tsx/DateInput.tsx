import { StyledInput } from "../styles/StyledInput";
export const DateInput: React.FC = () => {
	return (
		<>
			<label htmlFor='addiction-free-date'>
				Wybierz datę uwolnienia się od uzależnienia
			</label>
			<StyledInput type="datetime-local" id='addiction-free-date' required />
		</>
	);
};
