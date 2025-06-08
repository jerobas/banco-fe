import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

import Modal from "../Modal";
import { Column } from "../../pages/Rooms/styles";
import { Container, ErrorMessage } from "./styles";
import ApiService from "../../api/index";
import { IconContext } from "react-icons/lib";
import { IRoom, ResponseWithMessageAndData } from "../../interfaces";

const CustomColumn = ({ children }) => (
  <Column
    style={{
      alignItems: "flex-start",
      width: "100%",
      gap: "0.08rem",
      marginBottom: "20px",
    }}
  >
    {children}
  </Column>
);

export default function CreateRom({ handleClose, isOpen }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome é obrigatório!");
      return;
    }

    const response = await ApiService.post<ResponseWithMessageAndData<"room", IRoom>>("/rooms", { name, password });

    if (response.status === 201) {
      handleClose({
        id: response.data.room.id,
        password: response.data.room.password,
        hasPassword: response.data.room.password.length > 0,
      });
    }
  };

  return (
    <Modal
      visible={isOpen}
      hasHeight={true}
      height="min-content"
      hasWidth={true}
      width="400px"
    >
      <Container>
        <header
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "none",
          }}
        >
          <div style={{ height: "36px", width: "36px" }} />
          <h1>Criar Sala</h1>
          <button onClick={() => handleClose()}>
            <IconContext.Provider value={{ size: "20px", color: "#ff0000" }}>
              <FaTimes />
            </IconContext.Provider>
          </button>
        </header>
        <main>
          <form onSubmit={handleCreateRoom}>
            <Column>
              <CustomColumn>
                <label>Nome da sala: </label>
                <input
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </CustomColumn>
              <CustomColumn>
                <label>Senha da sala: </label>
                <input
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CustomColumn>
              <button type="submit">Criar</button>
            </Column>
          </form>
        </main>
      </Container>
    </Modal>
  );
}
