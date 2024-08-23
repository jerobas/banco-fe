import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BoardCanvas from "../../components/Board/BoardCanvas";
import Chat from "../../components/Chat/Chat";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import { socket } from "../../services/Auth";
import { Styles } from "./Room.styles";

export default function Room() {
  const { id } = useParams();

  useEffect(() => {
    socket.emit("rooms:updateUserInGameIfReload", id);

    return () => {
      socket.emit("rooms:leave", id);
    };
  }, []);

  return (
    // <Layout>
    //   <Styles.Container>
    //     <Chat />
    //   </Styles.Container>
    // </Layout>
    <>
      <BoardCanvas boardSize={15} />
      <Chat />
      {/* <CardComponent /> */}
    </>
  );
}
