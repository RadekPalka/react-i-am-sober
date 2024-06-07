import styled from 'styled-components'

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form : React.FC<FormProps> = ({onSubmit}) =>{
  

  

  return(
    <form onSubmit={onSubmit} >
      <button type='submit'>Dalej</button>
    </form>
  )
}