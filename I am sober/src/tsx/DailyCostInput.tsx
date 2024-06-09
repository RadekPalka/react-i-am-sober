import { StyledInput } from "../styles/StyledInput";
export const DailyCostInput: React.FC = () => {
	return (
		<>
			<label htmlFor='daily-cost'>
				Ile pieniędzy dziennie traciłeś na uzależnienie?
			</label>
			<StyledInput type='number' id='daily-cost' required/>
		</>
	);
};
