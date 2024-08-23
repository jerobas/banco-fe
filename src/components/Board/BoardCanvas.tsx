import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../services/Auth";
import { drawBoard } from "../../utils";
import { BoardContainer } from "./BoardCanvas.styles";

import LeaderboardModal from "../LeaderBoard/LeaderboardModal";
import Pawn from "../Pawn/Pawn";

import { useConfigPosition } from "../../hooks/useConfigPosition";
import { IBoardProps, IPlayer, IPlayerDefaults } from "../../interfaces";

const BoardCanvas: React.FC<IBoardProps> = ({ boardSize, centerImageUrl }) => {
  const { id } = useParams();
  const boardRef = useRef<HTMLCanvasElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [userOwner, setUserOwner] = useState<IPlayerDefaults>();
  const [ip, setIpOwner] = useState();
  const [currentTurn, setCurrentTurn] = useState<IPlayerDefaults>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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

  const handleGameStateUpdate = (data) => {
    if (data.type === true) {
      socket.on("playersStates", (data) => {
        setCurrentTurn(data.currentTurn);
        useConfigPosition(
          data.users,
          playersRef,
          boardRef.current?.getBoundingClientRect(),
          boardSize,
          setPlayers,
          setButtonDisabled
        );
      });
      setCurrentTurn(data.room.current_user_turn);
      setVisible(true);
    }
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
