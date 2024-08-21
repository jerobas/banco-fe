import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #fff;
  background-color: ${(props) => props.theme.dark.blue};
  border: 1px solid #707070;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 150px;
  position: relative;
  width: 150px;

  main {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 3px;
  }
`;
