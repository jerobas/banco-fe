import React, { useCallback, useLayoutEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { EmitEvents, ResponseEvents } from "../interfaces";

export const socket = io(
  `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/`,
  {
    withCredentials: true,
  }
);

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

  const handle = useCallback(
    <T extends keyof ResponseEvents>(
      event: T,
      callback: (data: ResponseEvents[T]) => void
    ) => {
      socketRef.current.on(
        event as string,
        callback as (...args: any[]) => void
      );
    },
    []
  );

  const onEvent = <T extends keyof ResponseEvents>(
    event: T,
    callback: (data: ResponseEvents[T]) => void,
    ref?: React.ForwardedRef<HTMLCanvasElement>
  ) => {
    useLayoutEffect(() => {
      handle(event, callback);

      return () => {
        socketRef.current.off(
          event as string,
          callback as (...args: any[]) => void
        );
      };
    }, [event, callback, onEvent, socket, ref]);
  };

  return { emitAsync, socket: socketRef.current, onEvent };
};
