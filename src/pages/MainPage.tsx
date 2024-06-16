import { Link } from "react-router-dom"

export const MainPage : React.FC =() =>{
  return(
    <>
      <h1>I am sober</h1>
      <Link to="/registration-page">Zarejestruj się</Link>
      <Link to="/login-page">Zaloguj się</Link>
    </>
  )
}