import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSocket, socket } from "../../hooks/useSocket";

import Layout from "../../components/Layout";
import { removeUserFromLastRoom } from "../../services/Auth";
import CreateRoom from "../../components/CreateRoom";
import JoinRoom from "../../components/JoinRoom";
import {
  Row,
  Column,
  RoomsContainer,
  RoomsPage,
  Button,
  RoomStyle,
} from "./styles";
import { SocketEvent, Room } from "../../interfaces";

export default function Rooms() {
  const { emitAsync } = useSocket();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [joinIsVisible, setJoinIsVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const [full, setFull] = useState(false);
  const [salas, setSalas] = useState<{
    salas: Room[];
    defaultSalas: Room[];
  }>({ salas: [], defaultSalas: [] });

  const handleJoinRoom = async ({ name, password }) => {
    const { flag } = await emitAsync(SocketEvent.JOIN, { name, password })
    if (flag) {
      navigate(`/room/${salas.salas[selectedRoom].id}`)
    }
  };

  const JoinRoomButton = () => (
    <Button
      // disabled={full || !(selectedRoom < salas.numberOfRooms)}
      disabled={false}
      onClick={() => {
        handleJoinRoom({
          name: salas.salas[selectedRoom].name,
          password: salas.salas[selectedRoom].password,
        });
      }}
    >
      Entrar na sala
    </Button>
  );

  // this should probably be in the room page
  useEffect(() => {
    const leaveRoom = async () => {
      await removeUserFromLastRoom();
    };
    leaveRoom();
  }, []);

  useEffect(() => {
    const loadRooms = async () => {
      const { rooms } = await emitAsync(SocketEvent.GET_ROOMS);
      console.log(rooms)
      setSalas({ salas: rooms, defaultSalas: rooms })
    }
    loadRooms();
  }, []);

  useEffect(() => {
    if (searchInput.length > 0) {
      let filtradas = salas.defaultSalas?.filter((room) =>
        room.name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setSalas((prev) => ({
        ...prev,
        salas: filtradas
      }));
    } else {
      setSalas((prev) => ({
        ...prev,
        salas: prev.defaultSalas,
      }));
    }
  }, [searchInput]);

  const handleSearchInputChange = (e) => {
    const inputVal = e.target.value;
    setSearchInput(inputVal);
  };

  return (
    <Layout>
      <RoomsPage>
        <RoomsContainer>
          <div>
            <h2>Número de Salas: {salas.salas ? salas.salas.length : 0}</h2>
            <Column style={{ width: "100%", padding: "10px" }}>
              <input
                placeholder="Buscar sala..."
                onChange={handleSearchInputChange}
                value={searchInput}
              />
            </Column>
          </div>
          <div style={{ minHeight: "3rem" }}>
            {salas.salas &&
              salas.salas.length > 0 &&
              salas.salas?.map((sala, index) => {
                return (
                  <RoomStyle
                    selected={index === selectedRoom}
                    onClick={() => {
                      setSelectedRoom(index);
                      setFull(true);
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
          <JoinRoomButton />
        </Row>
        {/* <JoinRoom
          isOpen={joinIsVisible}
          handleClose={() => { }}
          // handleClose={(data) => {
          //   if (data) {
          //     let createdRoom = {
          //       name: salas.rooms[selectedRoom][1],
          //       password: data,
          //     };
          //     handleJoinRoom(createdRoom);
          //   } else setJoinIsVisible(false);
          // }}
          roomName={salas && selectedRoom + 1}
        /> */}
      </RoomsPage>
    </Layout>
  );
}
