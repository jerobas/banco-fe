import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import BoardCanvas from "../../components/Board/BoardCanvas";
import Chat from "../../components/Chat/Chat";
import { socket } from "../../services/Auth";
import { Styles } from "./Room.styles";

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
