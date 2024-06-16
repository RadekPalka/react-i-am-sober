import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';
import { StyledDiv } from '../styles/StyledDiv'
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 75%;
	margin: 0 auto;
`;


const StyledButton = styled.button``;
export const Form: React.FC = () => {
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/dashboard');
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledDiv>
				<AddictionInput />
			</StyledDiv>
			<StyledDiv>
				<DateInput />
			</StyledDiv>
			<StyledDiv>
				<DailyCostInput />
			</StyledDiv>
			<StyledButton type='submit'>Dalej</StyledButton>
		</StyledForm>
	);
};
