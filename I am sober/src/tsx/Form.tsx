import styled from 'styled-components'

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form : React.FC<FormProps> = ({onSubmit}) =>{
  

  

  return(
    <form onSubmit={onSubmit}>
      <label htmlFor="addiction-choice'">Od czego jesteś uzależniony</label>
      <input id='addiction-choice' list='Addiction-type'/>
      <datalist id='Addiction-type'>
        <option value="Alkohol"/>
        <option value="Narkotyki"/>
        <option value="Pornografia"/>
        <option value="Hazard"/>
      </datalist>
      <button type='submit'>Dalej</button>
    </form>
  )
}