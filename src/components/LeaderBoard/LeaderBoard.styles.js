import styled from "styled-components";

export const Styles = {
  Container: styled.div`
    background-color: white;
    border-radius: 8px;
    height: auto;
    width: 400px;

    *{
        cursor: default;
    }
  `,
  Title: styled.h1`
    font-size: 1.75rem;
    font-weight: bold;
    letter-spacing: 1.2px;
    padding: 1rem;
    text-align: center;
  `,
  Content: styled.div`
    border-top: 1px solid #ccc
    display: flex;
    flex-direction: column;
    padding: 1rem;
  `,
  TitleContainer: styled.h2`
    font-weight: bold;
    letter-spacing: 1.2px;
  `,
  TextContainer: styled.span`
    color: ${(props) => (props.value <= 0 ? "red" : "green")};
    font-size: 0.85rem;
    margin-top: 1px;
  `,
};
