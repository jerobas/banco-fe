import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client'
import { EmitEvents, ResponseEvents } from '../interfaces'

export const socket = io(import.meta.env.VITE_SOCKET_API_AWS);

export const useSocket = () => {
    const socketRef = useRef<Socket>(socket);

    useEffect(() => {
        return () => {
            socketRef.current.disconnect();
        }
    }, []);

    const emitAsync = async <T extends keyof EmitEvents>(
        event: T,
        ...args: EmitEvents[T] extends void ? [] : [EmitEvents[T]]
    ): Promise<ResponseEvents[T]> => {
        return new Promise((resolve, reject) => {
            socketRef.current.emit(event, ...(args as any), (response: ResponseEvents[T]) => {
                resolve(response);
            });
        });
    };

    return { emitAsync, socket: socketRef.current };
}