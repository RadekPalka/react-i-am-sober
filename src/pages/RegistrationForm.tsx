import { LoginInputRegistration, PasswordInputRegistration } from "../components"
export const RegistrationForm : React.FC = () =>{
  return(
    <>
      <h1>Rejestracja</h1>
      <LoginInputRegistration/>
      <PasswordInputRegistration/>
    </>
  )
}