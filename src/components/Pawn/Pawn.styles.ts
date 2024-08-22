import styled from "styled-components";

export interface PawnProps {
  color: string;
  position: { x: number; y: number };
}

export const PawnStyled = styled.div<PawnProps>`
  position: absolute;
  margin: 25px 0 0 25px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  transition: left 0.5s ease, top 0.5s ease;
`;
