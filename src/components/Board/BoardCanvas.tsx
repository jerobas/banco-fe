import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../services/Auth";
import { drawBoard, pawnColors } from "../../utils";
import { BoardContainer } from "./BoardCanvas.styles";

import LeaderboardModal from "../LeaderBoard/LeaderboardModal";
import Pawn from "../Pawn/Pawn";

interface BoardProps {
  boardSize: number;
  centerImageUrl: string;
}

const BoardCanvas: React.FC<BoardProps> = ({ boardSize, centerImageUrl }) => {
  const { id } = useParams();
  const boardRef = useRef<HTMLCanvasElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [players, setPlayers] = useState<any>([]);
  const [userOwner, setUserOwner] = useState<any>();
  const [ip, setIpOwner] = useState();
  const [currentTurn, setCurrentTurn] = useState<any>(0);
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const playersRef = useRef<any>(players);
  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    socket.emit("rooms:setup", id);
    socket.on("setup", ({ room, owner }) => {
      if (room.users) {
        setUserOwner(owner);
        setIpOwner(room.owner_ip);
      }
    });

    socket.on("gameStateUpdated", (data) => handleGameStateUpdate(data));

    return () => {
      socket.off("setup");
      socket.off("gameStateUpdated");
    };
  }, [id]);

  useEffect(() => {
    const canvas = document.getElementById("lopoly-board") as HTMLCanvasElement;
    drawBoard(canvas, boardSize, centerImageUrl, 80);
  }, [boardSize, centerImageUrl]);

  useEffect(() => {
    const handleTabPress = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setModalOpen(!isModalOpen);
        e.preventDefault();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleTabPress);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleTabPress);
    };
  }, []);

  const handleResize = () => {
    let boardPosition = boardRef.current?.getBoundingClientRect();
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

  const configDefaultPositions = (players_: any) => {
    if (playersRef.current.length == 0) {
      const boardPosition = boardRef.current?.getBoundingClientRect();
      const initialBoardPosition = JSON.parse(JSON.stringify(boardPosition));

      let updatedPlayers = players_.map((player, index) => {
        return {
          initialBoardPosition: {
            x: initialBoardPosition!.left,
            y: initialBoardPosition!.top,
          },
          position_fe: { x: boardPosition!.left, y: boardPosition!.top },
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
      movePawns(updatedPlayers);
    }
    setButtonDisabled(false);
  };

  const handleGameStateUpdate = (data) => {
    if (data.type === true) {
      socket.on("playersStates", (data) => {
        setCurrentTurn(data.currentTurn);
        configDefaultPositions(data.users);
      });
      setCurrentTurn(data.room.current_user_turn);
      setVisible(true);
    }
  };

  const movePawns = (updatedPlayers) => {
    const newPlayers = JSON.parse(JSON.stringify(playersRef.current));

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
            newPlayers[index].position_fe.y -= 80;
          } else if (currentStep < boardSize) {
            newPlayers[index].position_fe.x += 80;
          } else if (currentStep < boardSize * 2 - 1) {
            newPlayers[index].position_fe.y += 80;
          } else if (currentStep < boardSize * 3 - 2) {
            newPlayers[index].position_fe.x -= 80;
          } else {
            newPlayers[index].position_fe.y -= 80;
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

  const handleStartGame = () => {
    socket.emit("game:start", id);
  };

  const handleDice = () => {
    setButtonDisabled(true);
    socket.emit("game:rollDices", {
      roomId: id,
    });
  };

  return (
    <BoardContainer>
      <LeaderboardModal
        players={players}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {!visible && userOwner?.ip_address === ip && (
        <button onClick={handleStartGame}>Start</button>
      )}
      <div>
        {currentTurn?.ip_address == ip && (
          <button onClick={() => handleDice()} disabled={buttonDisabled}>
            Rodar dados!
          </button>
        )}
      </div>
      <canvas id="lopoly-board" ref={boardRef} />
      {players &&
        players.map((player, index) => (
          <Pawn
            key={index}
            color={player.color}
            position={player.position_fe}
          />
        ))}
    </BoardContainer>
  );
};
export default BoardCanvas;
