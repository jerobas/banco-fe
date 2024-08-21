import React from "react";

import Modal from "../Modal/Modal";
import { Wrapper } from "./CardModas.styles";

export default function CardModal({ open, data, close }) {
  const handleOutsideClick = (e) => {
    if (open && e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <Modal visible={open} onClick={handleOutsideClick}>
      <Wrapper>
        <main>{data}</main>
      </Wrapper>
    </Modal>
  );
}
