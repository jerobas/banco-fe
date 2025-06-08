import { styled } from "styled-components";

export const Styles = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  `,
  ChatWrapper: styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f1f1f1;

    @media (min-width: 768px) {
      flex: 0.3;
    }
  `,
  BoardWrapper: styled.div`
    @media (min-width: 768px) {
      flex: 0.7;
    }
  `,
};
