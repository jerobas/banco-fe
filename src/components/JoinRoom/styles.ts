import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #707070;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  header {
    border: none;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  h1{
    color: ${props => props.theme.dark.blue};
    font-size: 2rem;
    font-weight: bold;
  }

  main {
    padding: 30px;
  }

  @media (max-width: 1107px) {
    padding: 28px 0px;
  }
  input{
    background-color: ${props => props.theme.colors.White_400};
    border: none;
    border-radius: 8px;
    height: 1.75rem;
    outline: solid;
    outline-color: ${props => props.theme.dark.blue};
    outline-width: 0.075rem;
    padding: 0 1rem;
    width: 100%;
  }
  label{
    font-size: 0.89rem;
  }

  button{
    background-color: transparent;
    border: none;
    height: 2rem;
    outline: none;
    width: 2rem;
  }

  form button {
    background-color: ${props => props.theme.colors.White_400};
    border: none;
    border-radius: 8px;
    color: ${props => props.theme.dark.blue};
    font-size: 1rem;
    font-weight: bold;
    height: 1.75rem;
    letter-spacing: 0.047rem;
    outline: none;
    transition: .4s ease all;
    width: 30%;

    &:hover{
      color: ${props => props.theme.vivid.blue};
    }
  }
`
export const ErrorMessage = styled.div`
  color: ${props => props.theme.vivid.red};
  font-size: 0.75rem;
  margin-top: .13rem;
`;