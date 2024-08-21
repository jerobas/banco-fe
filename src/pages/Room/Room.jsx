import { useEffect, useRef, useState } from "react";
import { BsFillChatDotsFill, BsFillSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

import Board from "../../components/Board/Board";
import Layout from "../../components/Layout/Layout";
import { getUserFromLocalStorage, socket } from "../../services/Auth";
import { globalTheme } from "../../styles/theme/global.theme";
import { Styles } from "./Room.styles";

export default function Room() {
  const user = getUserFromLocalStorage();
  const { id } = useParams();
  const messagesRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("rooms:updateUserInGameIfReload", id);
    socket.on("receiveMessageSystem", ({ message, system }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "System", message, system },
      ]);
    });

    return () => {};
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", ({ user, message, system }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: user, message, system },
      ]);
    });
    return () => {
      socket.emit("rooms:leave", id);
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.length > 0) socket.emit("room:chat", id, message);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <Styles.Container>
        <Board />
        <Styles.ChatArea>
          <Styles.ChatContainer>
            <ul ref={messagesRef}>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  style={{
                    justifyContent: msg.system
                      ? "center"
                      : msg.users === user
                      ? "left"
                      : "right",
                  }}
                >
                  <strong
                    style={{
                      color: msg.system
                        ? globalTheme.dark.green
                        : globalTheme.vivid.black,
                    }}
                  >
                    {msg.system ? msg.user : msg.user.name}:
                  </strong>
                  {msg.message}
                </li>
              ))}
            </ul>
            <div>
              <BsFillChatDotsFill id="icon" />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Chat..."
              />
              <BsFillSendFill
                id="iconSend"
                onClick={() => handleSendMessage()}
              />
            </div>
          </Styles.ChatContainer>
        </Styles.ChatArea>
      </Styles.Container>
    </Layout>
  );
}
