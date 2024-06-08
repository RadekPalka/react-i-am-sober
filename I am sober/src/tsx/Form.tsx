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
        <option value="Alkohol" data-value="alcohol"/>
        <option value="Narkotyki" data-value="drugs"/>
        <option value="Pornografia" data-value="pornography"/>
        <option value="Hazard" data-value="gamble"/>
      </datalist>
      <button type='submit'>Dalej</button>
    </form>
  )
}