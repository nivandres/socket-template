import type { Server } from "socket.io";
import { handleSocketConnection } from "./socket";

export { io } from "./server";

export function handleServer(io: Server) {
  io.on("connection", handleSocketConnection);
  return io;
}
