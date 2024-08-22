import React, { useEffect, useRef, useState } from "react";
import { BsFillChatDotsFill, BsFillSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getUserFromLocalStorage, socket } from "../../services/Auth";
import { globalTheme } from "../../styles/theme/global.theme";
import { ChatArea, ChatContainer, ChatInputContainer } from "./Chat.styles";

const Chat = () => {
  const user = getUserFromLocalStorage();
  const { id } = useParams();
  const messagesRef = useRef<HTMLUListElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.emit("rooms:updateUserInGameIfReload", id);

    const handleSystemMessage = ({
      message,
      system,
    }: {
      message: string;
      system: boolean;
    }) => {
      setMessages((prevMessages) => {
        const exists = prevMessages.some(
          (msg) =>
            msg.user === "System" &&
            msg.message === message &&
            msg.system === system
        );

        if (exists) {
          return prevMessages;
        }
        return [...prevMessages, { user: "System", message, system }];
      });
    };

    socket.on("receiveMessageSystem", handleSystemMessage);

    return () => {
      socket.off("receiveMessageSystem", handleSystemMessage);
    };
  }, [id]);

  useEffect(() => {
    const handleMessage = ({
      user,
      message,
      system,
    }: {
      user: string;
      message: string;
      system: boolean;
    }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: user, message, system },
      ]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.emit("rooms:leave", id);
      socket.off("receiveMessage", handleMessage);
    };
  }, [id]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.length > 0) {
      socket.emit("room:chat", id, message);
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const getUserName = (msgUser: any | { name: string }) => {
    return msgUser && msgUser.name ? msgUser.name : msgUser;
  };

  return (
    <ChatArea>
      <ChatContainer>
        <ul ref={messagesRef}>
          {messages.map((msg, index) => (
            <li
              key={index}
              style={{
                justifyContent: msg.system
                  ? "center"
                  : getUserName(msg.user) === user
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
                {msg.system ? msg.user : getUserName(msg.user)}:
              </strong>
              {msg.message}
            </li>
          ))}
        </ul>
        <ChatInputContainer>
          <BsFillChatDotsFill id="icon" />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Chat..."
          />
          <BsFillSendFill id="iconSend" onClick={handleSendMessage} />
        </ChatInputContainer>
      </ChatContainer>
    </ChatArea>
  );
};

export default Chat;
