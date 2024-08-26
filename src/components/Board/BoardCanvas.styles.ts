import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
  padding: 10px;

  canvas {
    position: relative;
    width: 100%;
    max-width: 800px;
    max-height: 80vh;
    border: 2px solid #333;
    transform-origin: center;
  }
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  @media (max-width: 600px) {
    button {
      width: 100%;
      padding: 8px;
      font-size: 0.9rem;
    }
  }
`;
