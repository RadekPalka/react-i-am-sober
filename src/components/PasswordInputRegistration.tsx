import { ChangeEvent } from 'react';
import { useUserContext } from './UserContext';
import { StyledDiv } from "../styles/StyledDiv"
import { StyledInput } from "../styles/StyledInput"
export const PasswordInputRegistration : React.FC = () =>{
  const {userData, setUserData} = useUserContext()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState) => ({
			...prevState,
			password: e.target.value,
		}));
	};
  return(
    <StyledDiv>
      <label htmlFor="password">Podaj swoje hasło</label>
      <StyledInput
      value={userData.password}
      onChange={handleChange}
      type="text"
      id="password"
      />
    </StyledDiv>
  )
}