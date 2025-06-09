import { styled } from "styled-components";

const RoomsPageButton = styled.button`
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

export default RoomsPageButton;