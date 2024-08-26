import styled from "styled-components";
import { IPawnProps } from "../../interfaces";

export const PawnStyled = styled.div<IPawnProps>`
  position: absolute;
  margin: 10px 0 0 10px;
  width: ${(props) => `calc(${props.cell_size.width}px - 20px)`};
  height: ${(props) => `calc(${props.cell_size.height}px - 20px)`};
  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  transition: left 0.5s ease, top 0.5s ease;I
  outline: none;
  user-select: none;
  pointer-events: none;
`;
