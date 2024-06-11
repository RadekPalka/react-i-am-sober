import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';




const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 75%;
	margin: 0 auto;
	.input-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 10px;
		padding: 30px 0;
	}
	button {
		display: block;
		width: 100px;
		height: 50px;
		color: #fff;
		margin: 0 auto;
		background-color: #693eb7;
		text-align: center;
		font-family: 'LXGW WenKai TC', cursive;
		transition: background-color 0.5s;
		cursor: pointer;
		&:hover {
			background-color: #8b60d9;
		}
	}
`;

export const Form: React.FC = () => {
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/dashboard');
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<div className='input-container'>
				<AddictionInput />
			</div>
			<div className='input-container'>
				<DateInput />
			</div>
			<div className='input-container'>
				<DailyCostInput/>
			</div>
			<button type='submit'>Dalej</button>
		</StyledForm>
	);
};
