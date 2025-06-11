import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useSocket } from "../../hooks/useSocket";
import { SocketEvent } from "../../interfaces";
import ModalWrapper from "../../styles/ModalWrapper.styles";
import { useModal } from "../../hooks/useModals";

function JoinRoomModal({ roomName, roomId, hasPassword, toggle }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { emitAsync } = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (hasPassword && !password.trim()) {
      setError("A senha é obrigatória!");
      return;
    }

    const { flag } = await emitAsync(SocketEvent.JOIN, {
      name: roomName,
      password,
    });
    if (flag) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <ModalWrapper hasHeight height="min-content" hasWidth width="100%">
      <div className="bg-[#222222] rounded-xl p-8 w-full max-w-md">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-cyan-400">{roomName}</h1>
          <button onClick={toggle} className="text-red-600 hover:text-red-800">
            <FaTimes size={20} />
          </button>
        </header>

        <form onSubmit={handleJoinRoom} className="flex flex-col gap-6 w-full">
          {hasPassword && (
            <input
              type="password"
              autoComplete="off"
              placeholder={error ? "A senha é obrigatória!" : "Senha da sala"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={`px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 border ${
                error ? "border-red-700" : "border-transparent"
              } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            />
          )}

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 text-white py-3 rounded-md font-semibold disabled:opacity-50"
          >
            Entrar
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
}

const JoinRoom = ({ roomName, roomId }) => {
  const { modal, toggle } = useModal(() => (
    <JoinRoomModal toggle={toggle} roomId={roomId} roomName={roomName} />
  ));

  const JoinRoomButton = () => (
    <button
      onClick={toggle}
      className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 text-white px-6 py-3 rounded-md font-semibold disabled:opacity-50"
    >
      Entrar na sala
    </button>
  );

  return (
    <>
      <JoinRoomButton />
      {modal}
    </>
  );
};

export default JoinRoom;
