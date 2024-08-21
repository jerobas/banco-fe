import styled from "styled-components";

const playerColor = {
  0: (props) => props.theme.dark.green,
  1: (props) => props.theme.dark.blue,
  2: (props) => props.theme.dark.pink,
  3: (props) => props.theme.dark.yellow,
};

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 1.2rem;
  width: 100%;

  > div {
    min-height: 2rem;
  }

  button {
    background-color: green;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    height: 2rem;
    letter-spacing: 1.2px;
    width: 8rem;
  }
`;

export const GameLayout = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const BoardContainer = styled.div`
  border: none;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(11, 30px);
  grid-template-rows: repeat(11, 30px);
  margin: 0 auto;
  max-width: 880px;
  transform: rotateX(56deg) rotateZ(45deg);
`;

export const StartGame = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.dark.blue};
  border: none;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.White_300};
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  height: 2.5rem;
  justify-content: center;
  letter-spacing: 1.2px;
  outline: none;
  padding: 0.075rem;
  width: 4.5rem;

  &:focus {
    border-color: ${(props) => props.theme.darkest.blue};
  }
`;

export const ImageContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  grid-column: 2 / span 9;
  grid-row: 2 / span 9;
  justify-content: space-between;
  transform-style: preserve-3d;
`;

export const Cell = styled.div`
  align-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.ownerCell == null ? "#fff" : playerColor[props.ownerCell]};
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  justify-items: center;
  position: relative;
`;
export const Square = styled.div`
  background-color: ${(props) => playerColor[props.color](props)};
  border-radius: 50%;
  height: 10px;
  left: ${(props) => props.position.x1}px;
  margin: -5px 0 0 -5px;
  position: absolute;
  top: ${(props) => props.position.y1}px;
  transition: left 0.5s ease, top 0.5s ease;
  width: 10px;
`;
