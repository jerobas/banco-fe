import { IPlayer } from "../interfaces";

export const useResize = (
  boardPosition: DOMRect | undefined | null,
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  playersRef: any
) => {
  let updatedPlayers = playersRef.current.map((player) => {
    const newPosition = {
      x:
        ((player.position_fe.x - player.initialBoardPosition.left) /
          player.initialBoardPosition.width) *
          boardPosition!.width +
        boardPosition!.left,
      y:
        ((player.position_fe.y - player.initialBoardPosition.top) /
          player.initialBoardPosition.height) *
          boardPosition!.height +
        boardPosition!.top,
    };
    return {
      ...player,
      position_fe: newPosition,
      initialBoardPosition: {
        left: boardPosition!.left,
        top: boardPosition!.top,
        width: boardPosition!.width,
        height: boardPosition!.height,
      },
    };
  });
  setPlayers(updatedPlayers);
};
