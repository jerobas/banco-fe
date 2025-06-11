import React, { useEffect, useRef, useState } from "react";
import { BsFillChatDotsFill, BsFillSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getUserFromLocalStorage } from "../../services/Auth";
import { socket, useSocket } from "../../hooks/useSocket";
import { SocketEvent } from "../../interfaces";

const Chat = () => {
  const user = getUserFromLocalStorage();
  const { id } = useParams();
  const { emitAsync } = useSocket();
  const messagesRef = useRef<HTMLUListElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
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
        return exists
          ? prevMessages
          : [...prevMessages, { user: "System", message, system }];
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
        { user, message, system },
      ]);
      if (!isOpen) setHasNewMessage(true);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.emit("rooms:leave", id);
      socket.off("receiveMessage", handleMessage);
    };
  }, [id, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatBox = document.getElementById("chat-box");
      if (chatBox && !chatBox.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) setHasNewMessage(false);
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (message.length > 0) {
      const { chatMessage, system } = await emitAsync(SocketEvent.CHAT, {
        roomId: Number(id),
        message,
      });
      const { user } = chatMessage;
      setMessages((prevMessages) => [
        ...prevMessages,
        { user, message, system },
      ]);
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSendMessage();
  };

  const getUserName = (msgUser: any | { name: string }) => {
    return msgUser && msgUser.name ? msgUser.name : msgUser;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg relative"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <BsFillChatDotsFill size={24} />
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="chat-box"
          className="absolute bottom-full mb-2 right-0 w-80 h-96 bg-white shadow-xl rounded-md flex flex-col overflow-hidden"
        >
          {" "}
          <div className="bg-cyan-700 text-white px-4 py-2 font-semibold">
            Chat da sala
          </div>
          <ul
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100"
          >
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`flex ${
                  msg.system
                    ? "justify-center"
                    : getUserName(msg.user) === user
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <span
                  className={`px-3 py-1 rounded-md text-sm ${
                    msg.system ? "text-green-600" : "bg-cyan-600 text-white"
                  }`}
                >
                  <strong>
                    {msg.system ? msg.user : getUserName(msg.user)}:
                  </strong>{" "}
                  {msg.message}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 px-2 py-2 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-3 py-1 border rounded-md outline-none text-gray-900"
            />
            <button onClick={handleSendMessage}>
              <BsFillSendFill size={20} className="text-cyan-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
