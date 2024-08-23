import styled from "styled-components";

export const BoardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
  canvas {
    /* transform: rotateX(56deg) rotateZ(45deg); */
    position: relative;
    border: 2px solid #333;
    transform-origin: center;
  }
`;
