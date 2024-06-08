import styled from 'styled-components';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';

const StyledForm = styled.form`
  width: 50%;
	margin: 0 auto;
`
interface FormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form: React.FC<FormProps> = ({ onSubmit }) => {
	return (
		<StyledForm onSubmit={onSubmit}>
      <AddictionInput/>
      <DateInput/>
      <DailyCostInput/>
			<button type='submit'>Dalej</button>
		</StyledForm>
	);
};
