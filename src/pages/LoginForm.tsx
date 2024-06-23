import { StyledForm } from '../components/StyledForm';
import { StyledInput } from '../components/StyledInput';
import { StyledH1 } from '../components/StyledH1';
import { StyledSection } from '../components/StyledSection';
import { AuthInput } from '../components';

export const LoginForm: React.FC = () => {
	return (
		<StyledSection>
			<StyledH1>Strona logowania</StyledH1>
			<StyledForm>
				<AuthInput value='' labelText='Login' onChange={() => {}} type='text' />
				<AuthInput
					value=''
					labelText='Hasło'
					onChange={() => {}}
					type='password'
				/>
			</StyledForm>
		</StyledSection>
	);
};
