import styled, { css } from "styled-components";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  ${(props) =>
    props.isOpen
      ? css`
          display: block;
        `
      : css`
          display: none;
        `};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
`;

export const PlayerRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Crown = styled.span`
  margin-left: 8px;
  color: gold;
`;
