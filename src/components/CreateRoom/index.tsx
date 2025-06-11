import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import ApiService from "../../api/index";
import { IRoom, ResponseWithMessageAndData } from "../../interfaces";
import { useModal } from "../../hooks/useModals";
import { useNavigate } from "react-router-dom";

import ModalWrapper from "../../styles/ModalWrapper.styles";

function CreateRoomModal({ toggle }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome é obrigatório!");
      return;
    }

    const response = await ApiService.post<
      ResponseWithMessageAndData<"room", IRoom>
    >("/rooms", { name, password });

    if (response.status === 201) navigate(`/room/${response.data.room.id}`);
  };

  return (
    <ModalWrapper hasHeight height="min-content" hasWidth width="100%">
      <div className="bg-[#222222] rounded-xl p-8 w-full max-w-md">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-cyan-400">Criar nova sala</h1>
          <button
            onClick={toggle}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </header>

        <form
          onSubmit={handleCreateRoom}
          className="flex flex-col gap-6 w-full"
        >
          <input
            type="text"
            autoComplete="off"
            placeholder={error ? "O nome é necessário" : "Nome da sala"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className={`px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 border ${
              error ? "border-red-700" : "border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          />
          <input
            type="password"
            autoComplete="off"
            placeholder="Senha da sala (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 text-white py-3 rounded-md font-semibold disabled:opacity-50"
          >
            Criar
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
}

const CreateRoom = () => {
  const { modal, toggle } = useModal(() => <CreateRoomModal toggle={toggle} />);

  const CreateRoomButton = () => (
    <button
      onClick={toggle}
      className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 text-white px-6 py-3 rounded-md font-semibold disabled:opacity-50"
    >
      Criar sala
    </button>
  );

  return (
    <>
      <CreateRoomButton />
      {modal}
    </>
  );
};

export default CreateRoom;
