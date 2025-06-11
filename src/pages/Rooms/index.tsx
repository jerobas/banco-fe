import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

import CreateRoom from "../../components/CreateRoom";
import JoinRoom from "../../components/JoinRoom";
import { useFilterSearchbar } from "../../hooks/useFilterSearchbar";
import { useSocket } from "../../hooks/useSocket";
import { SocketEvent } from "../../interfaces";
import { removeUserFromLastRoom } from "../../services/Auth";

export default function Rooms() {
  const { emitAsync } = useSocket();
  const loadRooms = async () => await emitAsync(SocketEvent.GET_ROOMS);

  const { isPending, data } = useQuery({
    queryKey: ["loadRooms"],
    queryFn: loadRooms,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { Searchbar, rooms } = useFilterSearchbar(isPending ? [] : data);

  useEffect(() => {
    removeUserFromLastRoom();
  }, []);

  const checkIfRooms = () => rooms && rooms.length > 0;
  const getRoomId = () =>
    checkIfRooms() && selectedRoom !== null ? rooms[selectedRoom].id : "";
  const getRoomName = () =>
    checkIfRooms() && selectedRoom !== null ? rooms[selectedRoom].name : "";

  return (
    <div className="flex flex-col items-center gap-8  text-white min-w-[640px]">
      <h1 className="text-3xl font-bold text-cyan-400">
        {checkIfRooms() ? "Escolha uma sala" : "Crie uma sala para começar!"}
      </h1>

      {checkIfRooms() && (
        <div className="w-full max-w-md">
          <Searchbar />
        </div>
      )}

      <div className="w-full max-w-md flex flex-col gap-2">
        {checkIfRooms() &&
          rooms.map((sala, index) => (
            <button
              key={sala.id}
              onClick={() => setSelectedRoom(index)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-md border transition-all ${
                selectedRoom === index
                  ? "border-cyan-500 bg-[#2a2a2a]"
                  : "border-[#333333] bg-[#1e1e1e]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>
                  {index + 1} - {sala.name}
                </span>
                {sala?.password && <FaLock />}
              </div>
              <span
                className={`text-sm font-medium ${
                  sala.users.length === sala.limit_of_users
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {sala.users.length}/{sala.limit_of_users}
              </span>
            </button>
          ))}
      </div>

      <div className="flex gap-4 mt-6">
        <CreateRoom />
        {checkIfRooms() && selectedRoom !== null && (
          <JoinRoom roomId={getRoomId()} roomName={getRoomName()} />
        )}
      </div>
    </div>
  );
}
