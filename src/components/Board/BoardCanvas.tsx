import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../services/Auth";
import { drawBoard } from "../../utils/functions/movement";
import { BoardContainer } from "./BoardCanvas.styles";

import Pawn from "../Pawn/Pawn";
import LeaderboardModal from "../LeaderBoard/LeaderboardModal";

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

  const [pawns, setPawns] = useState<any>();

  const [steps, setSteps] = useState([0, 0]);

  useEffect(() => {
    socket.emit("rooms:setup", id);
    socket.on("setup", ({ room, owner }) => {
      if (room.users) {
        setUserOwner(owner);
        setIpOwner(room.owner_ip);
      }
    });

    socket.on("gameStateUpdated", handleGameStateUpdate);

    return () => {
      socket.off("setup");
      socket.off("gameStateUpdated", handleGameStateUpdate);
    };
  }, [id]);

  useEffect(() => {
    const canvas = document.getElementById("lopoly-board") as HTMLCanvasElement;
    drawBoard(canvas, boardSize, centerImageUrl, 80);
  }, [boardSize, centerImageUrl]);

  useEffect(() => {
    const handleTabPress = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        toggleModal();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabPress);
    return () => {
      document.removeEventListener("keydown", handleTabPress);
    };
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const pawnColors = {
    0: "red",
    1: "blue",
    2: "green",
    3: "yellow",
  };

  useEffect(() => {
    if (players) {
      const boardPosition = boardRef.current?.getBoundingClientRect();

      let aux = players?.map((_, i) => ({
        color: pawnColors[i],
        position: {
          x: boardPosition!.left,
          y: boardPosition!.top,
        },
      }));

      setPawns(aux);
    }
  }, [players, boardSize]);

  useEffect(() => {
    if (pawns && pawns.length > 0) {
      players?.forEach((player, i) => {
        movePawn(i, player.position);
      });
    }
  }, [pawns]);

  const handleGameStateUpdate = useCallback((data) => {
    if (data.type === true) {
      socket.on("playersStates", (data) => {
        setPlayers(data.users);
        setCurrentTurn(data.currentTurn);
      });
      setCurrentTurn(data.room.current_user_turn);
      setVisible(true);
    }
  }, []);

  const movePawn = useCallback(
    (index: number, targetStep: number) => {
      const newSteps = [...steps];
      let currentStep = newSteps[index];

      if (currentStep === targetStep) {
        setButtonDisabled(false);
        return;
      }

      const interval = setInterval(() => {
        currentStep = (currentStep + 1) % (boardSize * 4 - 4);
        newSteps[index] = currentStep;

        setSteps(newSteps);

        const newPawns = pawns.map((pawn, i) => {
          if (i === index) {
            let newPosition = { ...pawn.position };

            if (currentStep < boardSize) {
              // Move right
              newPosition.x += 80;
            } else if (currentStep < boardSize * 2) {
              // Move down
              newPosition.y += 80;
            } else if (currentStep < boardSize * 3) {
              // Move left
              newPosition.x -= 80;
            } else {
              // Move up
              newPosition.y -= 80;
            }

            return {
              ...pawn,
              position: newPosition,
            };
          }

          return pawn;
        });

        setPawns(newPawns);

        if (currentStep === targetStep) {
          clearInterval(interval);
          setButtonDisabled(false);
        }
      }, 200);
    },
    [steps, boardSize, pawns]
  );

  const handleStartGame = () => {
    socket.emit("game:start", id);
  };

  const handleDice = () => {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;

    setButtonDisabled(true);
    socket.emit("game:rollDices", {
      roomId: id,
      dices: [d1, d2],
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
      {pawns &&
        pawns.map((pawn, index) => (
          <Pawn key={index} color={pawn.color} position={pawn.position} />
        ))}
    </BoardContainer>
  );
};
export default BoardCanvas;
