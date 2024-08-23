import { IPlayer } from "../interfaces";

export const useResize = (
  boardPosition: DOMRect | undefined | null,
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  playersRef: any
) => {
  let updatedPlayers = playersRef.current.map((player) => {
    return {
      ...player,
      position_fe: {
        x:
          player.position_fe.x -
          player.initialBoardPosition.left +
          boardPosition!.left,
        y:
          player.position_fe.y -
          player.initialBoardPosition.top +
          boardPosition!.top,
      },
    };
  });
  setPlayers(updatedPlayers);
};
