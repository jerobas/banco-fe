import React from "react";
import { IPawnProps } from "../../interfaces";
import { PawnStyled } from "./Pawn.styles";

const Pawn: React.FC<IPawnProps> = ({ color, position }) => {
  return <PawnStyled color={color} position={position} />;
};

export default Pawn;
