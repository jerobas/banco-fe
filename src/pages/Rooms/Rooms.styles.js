import { styled } from "styled-components";

export const Column = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  label {
    color: ${(props) => props.theme.dark.blue};
  }
  @media (max-width: 768px) {
    line-height: 2rem;
    font-size: 1.15rem;
    padding: 0.5rem;
  }
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const RoomsContainer = styled(Column)`
  min-height: 10rem;
  width: 100%;
  div {
    width: 100%;
  }
  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  input {
    border: 2px solid ${(props) => props.theme.dark.blue};
    border-radius: 8px;
    height: 2rem;
    outline: none;
    padding: 0.5rem;
    transition: border-color 0.3s;
    width: 100%;
    &:focus {
      border-color: ${(props) => props.theme.vivid.blue};
    }
  }
`;

export const Button = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.colors.White_400};
  border: 2px solid ${(props) => props.theme.dark.blue};
  border-radius: 8px;
  color: ${(props) => props.theme.dark.blue};
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  height: 2.5rem;
  justify-content: center;
  padding: 0 1rem;
  transition: all 0.4s ease;
  &:hover {
    background-color: ${(props) => props.theme.vivid.blue};
    color: #ffffff;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const RoomsPage = styled(Column)`
  color: #ffffff;
  height: 80%;
  justify-content: flex-start;
  padding: 2rem;
  h1,
  h2 {
    color: #ffffff;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 1.75rem;
    }
  }
`;

export const RoomStyle = styled(Row)`
  border: 1px solid ${(props) => props.theme.dark.blue};
  border-radius: 8px;
  cursor: pointer;
  justify-content: space-between;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.vivid.blue};
    color: #ffffff;
  }
`;
