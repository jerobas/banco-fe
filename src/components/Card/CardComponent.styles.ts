import styled from "styled-components";

export const CardContainer = styled.div<{ isFlipped: boolean }>`
  width: 300px;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
`;

export const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0)"};
`;

export const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #fff;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #f8f8f8;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transform: rotateY(180deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const CardName = styled.h2`
  margin: 10px 0;
`;

export const CardDescription = styled.p`
  margin: 10px 0;
`;

export const CardDetails = styled.div`
  text-align: left;
  width: 100%;
`;
