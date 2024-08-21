import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import { socket } from "../../services/Auth";
import { getUserFromLocalStorage } from "../../services/Auth";
import CreateRoom from "../CreateRoom/CreateRoom";
import JoinRoom from "../JoinRoom/JoinRoom";
import {
  Row,
  Column,
  RoomsContainer,
  RoomsPage,
  Button,
  RoomStyle,
} from "./Rooms.styles";

export default function Rooms() {
  const navigate = useNavigate();

  const user = getUserFromLocalStorage();

  const [searchInput, setSearchInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [joinIsVisible, setJoinIsVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [full, setFull] = useState(false);
  const [salas, setSalas] = useState([]);

  const Room = ({ children, selected, onClick }) => (
    <RoomStyle
      onClick={onClick}
      style={{ backgroundColor: selected ? "#FFFFFF20" : "transparent" }}
    >
      {children}
    </RoomStyle>
  );

  const handleJoinRoom = ({ name, password }) => {
    socket.emit("rooms:join", {
      name: name,
      password: password,
    });
  };
  const CreateRoomButton = () => (
    <Button
      onClick={() => {
        setIsVisible(true);
      }}
    >
      Criar sala
    </Button>
  );

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

  const handleModalClose = (createdRoom) => {
    if (createdRoom) {
      navigate(`/room/${createdRoom.id}`);
      setIsVisible(false);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    setSearchInput("");
    socket.emit("rooms:getRooms");
    socket.on("lobby", (data) => {
      setSalas({
        salas: data,
        defaultSalas: data,
      });
    });

    socket.on("joined", (data) => {
      if (data) {
        // navigate(`/room/${salas?.salas[selectedRoom]?.id}`);
        // socket.emit("rooms:getRooms");
        // setJoinIsVisible(false);
      }
    });

    return () => {
      socket.off("updateRooms");
      socket.off("joined");
    };
  }, []);

  useEffect(() => {
    if (searchInput.length > 0) {
      let sala = salas.defaultSalas?.filter((room) =>
        room[0].startsWith(searchInput)
      );
      setSalas({ ...salas, rooms: sala });
    } else {
      setSalas({ ...salas, rooms: salas.defaultSalas });
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
                  <Room
                    selected={index === selectedRoom}
                    onClick={() => {
                      setSelectedRoom(index);
                      setFull(true);
                    }}
                    key={index}
                  >
                    <Row style={{ width: "max-content", gap: ".3rem" }}>
                      <p>
                        {index + 1} - {sala.name}
                      </p>
                      {sala.password ? <FaLock /> : null}
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
                  </Room>
                );
              })}
          </div>
        </RoomsContainer>
        <Row style={{ gap: "20px" }}>
          <CreateRoomButton />
          <JoinRoomButton />
        </Row>
        <CreateRoom isOpen={isVisible} handleClose={handleModalClose} />
        <JoinRoom
          isOpen={joinIsVisible}
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
        />
      </RoomsPage>
    </Layout>
  );
}
