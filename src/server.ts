import { cors } from "@/cors";
import { Server } from "socket.io";
import { adapter } from "./adapter";
import { handleServer } from "./io";

let io: Server;

export const config = { adapter, cors };

export function createServer() {
  io = new Server(config);
  handleServer(io);
  return io;
}

export { io };
