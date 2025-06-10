import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useSocket } from "../../hooks/useSocket";

import Layout from "../../components/Layout";
import { removeUserFromLastRoom } from "../../services/Auth";
import CreateRoom from "../../components/CreateRoom";
import JoinRoom from "../../components/JoinRoom";
import {
  Row,
  Column,
  RoomsContainer,
  RoomsPage,
  RoomStyle,
} from "./styles";
import { SocketEvent } from "../../interfaces";
import { useFilterSearchbar } from "../../hooks/useFilterSearchbar";
import { useQuery } from "@tanstack/react-query";

export default function Rooms() {
  const { emitAsync } = useSocket();
  const loadRooms = async () => await emitAsync(SocketEvent.GET_ROOMS);

  const { isPending, error, data } = useQuery({
    queryKey: ["loadRooms"],
    queryFn: loadRooms,
  })

  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { Searchbar, rooms } = useFilterSearchbar(isPending ? [] : data)

  const checkIfRooms = () => rooms && rooms.length > 0
  const getRoomId = () => checkIfRooms() && selectedRoom ? rooms[selectedRoom].id : ""
  const getRoomName = () => checkIfRooms() && selectedRoom ? rooms[selectedRoom].name : ""

  // this should probably be in the room page
  useEffect(() => {
    const leaveRoom = async () => {
      await removeUserFromLastRoom();
    };
    leaveRoom();
  }, []);

  return (
    <Layout>
      <RoomsPage>
        <RoomsContainer>
          <div>
            <h2>Número de Salas: {rooms ? rooms.length : 0}</h2>
            <Column style={{ width: "100%", padding: "10px" }}>
              <Searchbar />
            </Column>
          </div>
          <div style={{ minHeight: "3rem" }}>
            {checkIfRooms() && rooms.map((sala, index) => {
              return (
                <RoomStyle
                  selected={index === selectedRoom}
                  onClick={() => {
                    setSelectedRoom(index);
                  }}
                >
                  <Row style={{ width: "max-content", gap: ".3rem" }}>
                    <p>
                      {index + 1} - {sala.name}
                    </p>
                    {sala.has_password ? <FaLock /> : null}
                  </Row>
                  <p
                    style={{
                      color:
                        sala.users.length == sala.limit_of_users
                          ? "red"
                          : "green",
                      marginLeft: ".5rem",
                    }}
                  >
                    {sala.users.length}/{sala.limit_of_users}
                  </p>
                </RoomStyle>
              );
            })}
          </div>
        </RoomsContainer>
        <Row style={{ gap: "20px" }}>
          <CreateRoom />
          <JoinRoom
            disabled={!(checkIfRooms() && selectedRoom)}
            roomId={getRoomId()}
            roomName={getRoomName()}
          />
        </Row>
      </RoomsPage>
    </Layout>
  );
}
