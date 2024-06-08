import styled from 'styled-components';
import { AddictionInput } from './AddictionInput';
import { DateInput } from './DateInput';
import { DailyCostInput } from './DailyCostInput';


interface FormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form: React.FC<FormProps> = ({ onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
      <AddictionInput/>
      <DateInput/>
      <DailyCostInput/>
			<button type='submit'>Dalej</button>
		</form>
	);
};
