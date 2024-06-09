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
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 75%;
	margin: 0 auto;
	.input-container {
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap;
		margin-bottom: 10px;
		padding: 30px 0;
	}
	button {
		display: block;
		width: 100px;
		height: 50px;
		color: #FFF;
		margin: 0 auto 0 auto;
		background-color: #693eb7;
		text-align: center;
		font-family: "LXGW WenKai TC", cursive;
		transition: background-color .5s;
		cursor: pointer;
		&:hover{
			background-color: #8b60d9;
		}
	}
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
			<div className='input-container'>
				<AddictionInput value={addictionType} setUserData={setUserData} />
			</div>
			<div className='input-container'>
				<DateInput value={addictionFreeDate} setUserData={setUserData} />
			</div>
			<div className='input-container'>
				<DailyCostInput value={addictionDailyCost} setUserData={setUserData} />
			</div>
			<button type='submit'>Dalej</button>
		</StyledForm>
	);
};
