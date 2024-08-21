import React from "react";
import { FaCrown } from "react-icons/fa";

import Modal from "../Modal/Modal";
import { Styles } from "./LeaderBoard.styles";

export default function LeaderBoard({ players, userOwner, isOpen, setOpen }) {
  const handleOutsideClick = (e) => {
    if (open && e.target === e.currentTarget) {
      setOpen();
    }
  };

  return (
    players && (
      <Modal visible={isOpen} onClick={handleOutsideClick}>
        <Styles.Container>
          <Styles.Title>LeaderBoard</Styles.Title>
          {players.map((player, i) => (
            <Styles.Content key={player.id}>
              <Styles.TitleContainer>
                {i + 1 + "º - " + player.name + " "}
                {userOwner === player.ip_address && <FaCrown />}
              </Styles.TitleContainer>
              <Styles.TextContainer value={player.money}>
                R$ {player.money}
              </Styles.TextContainer>
            </Styles.Content>
          ))}
        </Styles.Container>
      </Modal>
    )
  );
}
