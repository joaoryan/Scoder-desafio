// lib/socket.ts
import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

let socket: Socket | null = null;

export const getSocket = () => {
    if (!socket) {
        socket = io(API_URL, {
            transports: ['websocket'],
        });
    }
    return socket;
};
