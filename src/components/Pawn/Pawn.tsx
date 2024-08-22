import React from "react";
import { PawnProps, PawnStyled } from "./Pawn.styles";

const Pawn: React.FC<PawnProps> = ({ color, position }) => {
  return <PawnStyled color={color} position={position} />;
};

export default Pawn;
