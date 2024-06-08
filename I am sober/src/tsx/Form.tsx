import { useNavigate } from 'react-router-dom';
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
}) => {
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/dashboard');
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<AddictionInput value={addictionType} setUserData={setUserData} />
			<DateInput value={addictionFreeDate} setUserData={setUserData} />
			<DailyCostInput value={addictionDailyCost} setUserData={setUserData} />
			<button type='submit'>Dalej</button>
		</StyledForm>
	);
};
