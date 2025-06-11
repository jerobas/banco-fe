import styled from "styled-components";
import { IWrapper } from "../interfaces";

const ModalWrapper = styled.section<IWrapper>`
  align-items: center;
  align-self: center;
  border-radius: 8px;
  display: flex;
  height: ${(props) => (props.hasHeight ? props.height : "100%")};
  justify-content: center;
  padding: 1.5rem;
  width: ${(props) => (props.hasWidth ? props.width : "100%")};
`;

export default ModalWrapper;
