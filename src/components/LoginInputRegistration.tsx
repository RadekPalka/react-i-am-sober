import { ChangeEvent } from 'react';
import { useUserContext } from './UserContext';
import { StyledDiv } from "../styles/StyledDiv"
import { StyledInput } from "../styles/StyledInput"
export const LoginInputRegistration : React.FC = () =>{
  const {userData, setUserData} = useUserContext()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData((prevState) => ({
			...prevState,
			login: e.target.value,
		}));
	};
  return(
    <StyledDiv>
      <label htmlFor="login">Podaj swój login</label>
      <StyledInput
      value={userData.login}
      onChange={handleChange}
      type="text"
      id="login"
      />
    </StyledDiv>
  )
}