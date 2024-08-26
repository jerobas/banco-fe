import React from "react";
import { IPawnProps } from "../../interfaces";
import { PawnStyled } from "./Pawn.styles";

const Pawn: React.FC<IPawnProps> = ({ color, position, cell_size }) => {
  return <PawnStyled color={color} position={position} cell_size={cell_size} />;
};

export default Pawn;
