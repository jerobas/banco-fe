import { IPlayer, IPlayerDefaults } from "../interfaces";
import { pawnColors } from "../utils";
import { useMovePawns } from "./useMovePawns";

export const useConfigPosition = (
  players_: IPlayerDefaults[],
  playersRef: any,
  boardPosition: DOMRect | undefined,
  boardSize: number,
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (playersRef.current.length == 0) {
    const initialBoardPosition = JSON.parse(JSON.stringify(boardPosition));
    let updatedPlayers = players_.map((player, index) => {
      return {
        initialBoardPosition: {
          x: initialBoardPosition!.left,
          y: initialBoardPosition!.top,
          width: initialBoardPosition!.width,
          height: initialBoardPosition!.height,
        },
        position_fe: {
          x: boardPosition!.left,
          y: boardPosition!.top,
        },
        color: pawnColors[index],
        ...player,
      };
    });
    setPlayers(updatedPlayers);
  } else {
    let updatedPlayers = players_.map((player, index) => {
      return {
        ...player,
        position_fe: playersRef.current[index].position_fe,
      };
    });
    useMovePawns(
      updatedPlayers,
      JSON.parse(JSON.stringify(playersRef.current)),
      boardSize,
      setPlayers,
      setButtonDisabled,
      boardPosition
    );
  }
  setButtonDisabled(false);
};
