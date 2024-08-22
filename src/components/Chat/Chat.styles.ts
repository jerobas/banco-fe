import styled from "styled-components";

export const ChatArea = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    padding: 10px;
    overflow-y: auto;
    max-height: 200px;
  }

  li {
    display: flex;
    padding: 5px;
    margin: 5px 0;
  }

  strong {
    margin-right: 10px;
  }

  div {
    display: flex;
    align-items: center;
    padding: 10px;
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    outline: none;
  }

  #iconSend {
    margin-left: 10px;
    cursor: pointer;
  }

  #icon {
    margin-right: 10px;
  }
`;
