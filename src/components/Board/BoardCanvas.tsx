import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../services/Auth";
import { drawBoard } from "../../utils";
import { BoardContainer } from "./BoardCanvas.styles";

import LeaderboardModal from "../LeaderBoard/LeaderboardModal";
import Pawn from "../Pawn/Pawn";

import { useConfigPosition } from "../../hooks/useConfigPosition";
import { useResize } from "../../hooks/useResize";

import {
  IGameStateUpdated,
  IPlayer,
  IPlayerDefaults,
  IPlayersStates,
  IRoom,
} from "../../interfaces";

const BoardCanvas: React.FC = () => {
  const { id } = useParams();
  const boardRef = useRef<HTMLCanvasElement>(null);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [userOwner, setUserOwner] = useState<IPlayerDefaults>();
  const [ip, setIpOwner] = useState<string>();
  const [currentTurn, setCurrentTurn] = useState<IPlayerDefaults>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [boardSize, setboardSize] = useState<number>(15);

  const playersRef = useRef<any>(players);
  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    socket.emit("rooms:setup", id);
    socket.on(
      "setup",
      ({
        room,
        owner,
        board_size,
      }: {
        room: IRoom;
        owner: IPlayerDefaults;
        board_size: number;
      }) => {
        if (room.users) {
          const canvas = document.getElementById(
            "lopoly-board"
          ) as HTMLCanvasElement;
          setboardSize(board_size);
          drawBoard(canvas, board_size, 80);
          setUserOwner(owner);
          setIpOwner(room!.owner_ip);
        }
      }
    );

    socket.on("gameStateUpdated", (data: IGameStateUpdated) =>
      handleGameStateUpdate(data)
    );

    return () => {
      socket.off("setup");
      socket.off("gameStateUpdated");
    };
  }, [id]);

  useEffect(() => {
    const handleTabPress = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setModalOpen(!isModalOpen);
        e.preventDefault();
      }
    };

    window.addEventListener("resize", () =>
      useResize(
        boardRef.current?.getBoundingClientRect(),
        setPlayers,
        playersRef
      )
    );
    document.addEventListener("keydown", handleTabPress);
    return () => {
      window.removeEventListener("resize", () =>
        useResize(
          boardRef.current?.getBoundingClientRect(),
          setPlayers,
          playersRef
        )
      );
      document.removeEventListener("keydown", handleTabPress);
    };
  }, []);

  const handleGameStateUpdate = (data: IGameStateUpdated) => {
    if (data.type) {
      socket.on("playersStates", (data: IPlayersStates) => {
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
      setCurrentTurn(data.room.current_user_turn!);
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
