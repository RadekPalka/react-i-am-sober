import styled from 'styled-components';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { UserData } from '../ts/types';

interface FormProps {
	addictionType: string;
	addictionFreeDate: string;
	addictionDailyCost: number;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StyledForm = styled.form`
	width: 50%;
	margin: 0 auto;
`;

export const Form: React.FC<FormProps> = ({
	addictionType,
	addictionFreeDate,
	addictionDailyCost,
	setUserData,
	onSubmit,
}) => {
	return (
		<StyledForm onSubmit={onSubmit}>
			<AddictionInput value={addictionType} setUserData={setUserData} />
			<DateInput value={addictionFreeDate} setUserData={setUserData} />
			<DailyCostInput value={addictionDailyCost} setUserData={setUserData} />
			<button type='submit'>Dalej</button>
		</StyledForm>
	);
};
