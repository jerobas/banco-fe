import { IPlayer } from "../interfaces";

export const useMovePawns = (
  updatedPlayers: any,
  newPlayers: any,
  boardSize: number,
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  canvasRect: DOMRect | undefined
) => {
  const cellSizeX = canvasRect!.width / boardSize;
  const cellSizeY = canvasRect!.height / boardSize;

  updatedPlayers.forEach((player, index) => {
    let targetStep = player.position;
    let money = player.money;
    let currentStep = newPlayers[index].position;
    const intervalId = setInterval(() => {
      if (currentStep === targetStep) {
        clearInterval(intervalId);
      } else {
        currentStep = (currentStep + 1) % (boardSize * 4 - 4);
        if (currentStep === 0) {
          newPlayers[index].position_fe.y -= cellSizeY;
        } else if (currentStep < boardSize) {
          newPlayers[index].position_fe.x += cellSizeX;
        } else if (currentStep < boardSize * 2 - 1) {
          newPlayers[index].position_fe.y += cellSizeY;
        } else if (currentStep < boardSize * 3 - 2) {
          newPlayers[index].position_fe.x -= cellSizeX;
        } else {
          newPlayers[index].position_fe.y -= cellSizeY;
        }

        setPlayers((prevPlayers) => {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[index] = {
            ...updatedPlayers[index],
            position_fe: { ...newPlayers[index].position_fe },
            position: currentStep,
            money,
          };
          return updatedPlayers;
        });
      }
    }, 200);
  });

  setButtonDisabled(false);
};
