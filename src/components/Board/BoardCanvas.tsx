import React, {
  useRef,
  useState,
  forwardRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../services/Auth";
import { drawBoard } from "../../utils";
import { BoardContainer } from "./BoardCanvas.styles";

import LeaderboardModal from "../LeaderBoard/LeaderboardModal";
import Pawn from "../Pawn/Pawn";
import CardComponent from "../Card/CardComponent";

import { useConfigPosition } from "../../hooks/useConfigPosition";
import { useBoardClick } from "../../hooks/useBoardClick";
import { useResize } from "../../hooks/useResize";

import {
  IGameStateUpdated,
  IPlayer,
  IPlayerDefaults,
  IPlayersStates,
  IRoom,
} from "../../interfaces";

const BoardCanvas = forwardRef<HTMLCanvasElement, any>((_, ref) => {
  const { id } = useParams();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [cellSize, setCellSize] = useState<{ width: number; height: number }>({
    width: 80,
    height: 80,
  });
  const [userOwner, setUserOwner] = useState<IPlayerDefaults>();
  const [ip, setIpOwner] = useState<string>();
  const [currentTurn, setCurrentTurn] = useState<IPlayerDefaults>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [boardSize, setboardSize] = useState<number>(15);
  const [cardPosition, setCardPosition] = useState<number | null>(null);
  const [isModalCardOpen, setModalCardOpen] = useState<boolean>(true);

  const playersRef = useRef<any>(players);

  useLayoutEffect(() => {
    playersRef.current = players;
  }, [players]);

  useLayoutEffect(() => {
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
          setboardSize(board_size);

          const canvas = (ref as React.MutableRefObject<HTMLCanvasElement>)
            .current;

          if (canvas) {
            setTimeout(() => {
              drawBoard(canvas, board_size, 80);
              setUserOwner(owner);
              setIpOwner(room.owner_ip);

              const canvasRect = canvas.getBoundingClientRect();

              setCellSize({
                width: canvasRect.width / boardSize,
                height: canvasRect.height / boardSize,
              });
            }, 0);
          }
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
  }, [id, ref, boardSize]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const canvas = (ref as React.MutableRefObject<HTMLCanvasElement>).current;
  //     if (canvas) {
  //       const canvasRect = canvas.getBoundingClientRect();
  //       useResize(canvasRect, setPlayers, playersRef); // tem q corrigir a logica do resize
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [boardSize, ref]);

  useEffect(() => {
    const handleTabPress = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setModalOpen(!isModalOpen);
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabPress);

    return () => {
      document.removeEventListener("keydown", handleTabPress);
    };
  }, [isModalOpen]);

  const handleGameStateUpdate = (data: IGameStateUpdated) => {
    if (data.type) {
      socket.on("playersStates", (data: IPlayersStates) => {
        const canvas = (ref as React.MutableRefObject<HTMLCanvasElement>)
          .current;
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          setCellSize({
            width: canvasRect!.width / boardSize,
            height: canvasRect!.height / boardSize,
          });
          setCurrentTurn(data.currentTurn);
          useConfigPosition(
            data.users,
            playersRef,
            canvasRect,
            boardSize,
            setPlayers,
            setButtonDisabled
          );
        }
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

  useBoardClick(
    ref as React.MutableRefObject<HTMLCanvasElement>,
    boardSize,
    cellSize,
    setCardPosition,
    setModalCardOpen
  );

  const handleCloseModarCard = () => {
    setModalCardOpen(false);
  };

  return (
    <BoardContainer id="container">
      <LeaderboardModal
        players={players}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {isModalCardOpen && (
        <CardComponent position={cardPosition} onClose={handleCloseModarCard} />
      )}
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
      <canvas id="lopoly-board" ref={ref} />
      {players &&
        players.map((player, index) => (
          <Pawn
            key={index}
            color={player.color}
            position={player.position_fe}
            cell_size={cellSize}
          />
        ))}
    </BoardContainer>
  );
});
export default BoardCanvas;
