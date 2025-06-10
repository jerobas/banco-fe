import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { EmitEvents, ResponseEvents } from "../interfaces";

export const socket = io(import.meta.env.VITE_SOCKET_API_AWS);

export const useSocket = () => {
  const socketRef = useRef<Socket>(socket);

  const emitAsync = async <T extends keyof EmitEvents>(
    event: T,
    ...args: EmitEvents[T] extends void ? [] : [EmitEvents[T]]
  ): Promise<ResponseEvents[T]> => {
    return new Promise((resolve, reject) => {
      const callback = (response: ResponseEvents[T]) => resolve(response);
      
      const payload = [...(args?.length ? args : [{}]), callback];

      socketRef.current.emit(event, ...payload);
    });
  };

  return { emitAsync, socket: socketRef.current };
};
