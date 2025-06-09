import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import BoardCanvas from "../../components/Board";
import Chat from "../../components/Chat";
import { socket } from "../../hooks/useSocket";
import { Styles } from "./styles";

export default function Room() {
  const { id } = useParams();
  const boardCanvasRef = useRef(null);

  useEffect(() => {
    socket.emit("rooms:updateUserInGameIfReload", id);

    return () => {
      socket.emit("rooms:leave", id);
    };
  }, [id]);

  return (
    <Styles.Container>
      <Styles.ChatWrapper>
        <Chat />
      </Styles.ChatWrapper>
      <Styles.BoardWrapper>
        <BoardCanvas ref={boardCanvasRef} />
      </Styles.BoardWrapper>
    </Styles.Container>
  );
}
