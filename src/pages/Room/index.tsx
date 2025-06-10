import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import BoardCanvas from "../../components/Board";
import Chat from "../../components/Chat";
import { useSocket } from "../../hooks/useSocket";
import { Styles } from "./styles";
import { SocketEvent } from "../../interfaces";

export default function Room() {
  const { id } = useParams();
  const { emitAsync } = useSocket();
  const boardCanvasRef = useRef(null);

  useEffect(() => {
    const update = async () => {
      console.log(id);
      if (id) await emitAsync(SocketEvent.UPDATE, { id: Number(id) });
    };
    update();
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
