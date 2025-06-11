import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import { useBoardClick } from "../../hooks/useBoardClick";
import { useConfigPosition } from "../../hooks/useConfigPosition";
import { usePosition } from "../../hooks/usePosition";
import { useSocket, socket } from "../../hooks/useSocket";
import { IPlayer, SocketEvent, User } from "../../interfaces";
import { drawBoard, pawnColors } from "../../utils";
import CardComponent from "../Card";
import LeaderboardModal from "../LeaderBoard";
import Pawn from "../Pawn";
import { BoardContainer } from "./styles";

const BoardCanvas = forwardRef<HTMLCanvasElement, any>((_, ref) => {
  const { id } = useParams();
  const { emitAsync } = useSocket();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [cellSize, setCellSize] = useState<{ width: number; height: number }>({
    width: 80,
    height: 80,
  });
  const [userOwner, setUserOwner] = useState<User>();
  const [currentTurn, setCurrentTurn] = useState<User>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [boardSize, setboardSize] = useState<number>(15);
  const [cardPosition, setCardPosition] = useState<number | null>(null);
  const [isModalCardOpen, setModalCardOpen] = useState<boolean>(true);

  const playersRef = useRef<any>(players);
  const canvasRect = useRef<any>(null);

  const handleUpdateAndSetup = (
    board_size: number,
    owner: User
  ): Promise<DOMRect> => {
    return new Promise((resolve) => {
      setboardSize(board_size);

      const canvas = (ref as React.MutableRefObject<HTMLCanvasElement>).current;

      if (canvas) {
        setTimeout(() => {
          drawBoard(canvas, board_size, 80);
          setUserOwner(owner);

          const canvasRect = canvas.getBoundingClientRect();

          setCellSize({
            width: canvasRect.width / board_size,
            height: canvasRect.height / board_size,
          });

          resolve(canvasRect);
        }, 0);
      }
    });
  };

  useLayoutEffect(() => {
    playersRef.current = players;
  }, [players]);

  useLayoutEffect(() => {
    const setup = async () => {
      const { room, owner, board_size } = await emitAsync(SocketEvent.SETUP, {
        id: Number(id),
      });

      if (room.users) {
        canvasRect.current = await handleUpdateAndSetup(board_size, owner);
      }
    };
    const update = async () => {
      const response = await emitAsync(SocketEvent.UPDATE, { id: Number(id) });
      const { room, board_size, owner } = response!;

      if (room && room.game_state) {
        const canvasRect_ = await handleUpdateAndSetup(board_size, owner);
        canvasRect.current = canvasRect_;
        if (canvasRect_) {
          let updatedPlayers = room.users.map((player, index) => {
            return {
              initialBoardPosition: {
                x: canvasRect_!.left,
                y: canvasRect_!.top - 29.5,
                width: canvasRect_!.width,
                height: canvasRect_!.height,
              },
              position_fe: usePosition(
                player.position,
                board_size,
                canvasRect_
              ),
              color: pawnColors[index],
              ...player,
            };
          });
          setPlayers(updatedPlayers);
          setCurrentTurn(room.current_user_turn!);
          setVisible(true);
        }
      } else if (room && !room.game_state) {
        setup();
      }
    };
    update();
  }, [id, ref, boardSize]);

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

  const handleStartGame = async () => {
    const { type, room } = await emitAsync(SocketEvent.START, {
      roomId: Number(id),
    });
    if (type) {
      const canvas = (ref as React.MutableRefObject<HTMLCanvasElement>).current;
      if (canvas) {
        canvasRect.current = canvas.getBoundingClientRect();
        setCellSize({
          width: canvasRect!.current.width / boardSize,
          height: canvasRect!.current.height / boardSize,
        });
      }
      useConfigPosition(
        room.users,
        playersRef,
        canvasRect.current,
        boardSize,
        setPlayers,
        setButtonDisabled
      );
      setCurrentTurn(room.current_user_turn!);
      setVisible(true);
    }
  };

  const handleDice = async () => {
    setButtonDisabled(true);
    let { users, currentTurn } = await emitAsync(SocketEvent.ROLL_DICES, {
      roomId: Number(id),
    });
    setCurrentTurn(currentTurn!);
    useConfigPosition(
      users!,
      playersRef,
      canvasRect.current,
      boardSize,
      setPlayers,
      setButtonDisabled
    );
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
      {!visible && userOwner?.socket_id === socket.id && (
        <button onClick={handleStartGame}>Start</button>
      )}
      <div>
        {currentTurn?.socket_id == socket.id && (
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
