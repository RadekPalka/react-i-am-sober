import { Link } from "react-router-dom"
import { Header } from "../components/"
export const MainPage : React.FC =() =>{
  return(
    <>
      <h1>I am sober</h1>
      <Header />
      <Link to="/registration-page">Zarejestruj się</Link>
      <Link to="/login-page">Zaloguj się</Link>
    </>
  )
}